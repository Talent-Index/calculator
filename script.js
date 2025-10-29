// Advanced Calculator with Tabs
class AdvancedCalculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.memory = 0;
        this.shouldResetScreen = false;
        this.dataSet = [];
        this.currentTab = 'basic';
        this.isDegreeMode = true; // true for degrees, false for radians
        
        this.calculationDisplay = document.getElementById('calculation');
        this.resultDisplay = document.getElementById('result');
        this.statsResults = document.getElementById('stats-results');
        this.dateResults = document.getElementById('date-results');
        this.dataValues = document.getElementById('data-values');
        
        this.initializeEventListeners();
        this.setInitialTheme();
        this.initializeTabs();
    }
    
    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.switchTab(e.target.getAttribute('data-tab'));
            });
        });
        
        // Basic calculator buttons (for both basic and scientific tabs)
        this.initializeCalculatorButtons('#basic-tab');
        this.initializeCalculatorButtons('#scientific-tab');
        
        // Scientific calculator buttons
        document.querySelectorAll('.scientific').forEach(button => {
            button.addEventListener('click', () => {
                this.handleScientificAction(button.getAttribute('data-action'));
                this.updateDisplay();
            });
        });
        
        // Statistics calculator buttons
        document.querySelectorAll('.stats').forEach(button => {
            button.addEventListener('click', () => {
                this.handleStatisticsAction(button.getAttribute('data-action'));
            });
        });
        
        // Date calculator buttons
        document.querySelectorAll('.date').forEach(button => {
            button.addEventListener('click', () => {
                this.handleDateAction(button.getAttribute('data-action'));
            });
        });
        
        // Keyboard support
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardInput(event);
        });
        
        // Theme switching
        const themeSwitch = document.getElementById('theme-switch');
        themeSwitch.addEventListener('change', () => {
            this.toggleTheme();
        });
        
        // Button press animations
        this.initializeButtonAnimations();
        
        // Set default dates
        this.setDefaultDates();
    }
    
    initializeCalculatorButtons(containerSelector) {
        const container = document.querySelector(containerSelector);
        
        // Number buttons
        container.querySelectorAll('.btn.number').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.getAttribute('data-value'));
                this.updateDisplay();
            });
        });
        
        // Operation buttons
        container.querySelectorAll('.btn.operator').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
                    this.chooseOperation(action);
                } else if (action === 'backspace') {
                    this.delete();
                }
                this.updateDisplay();
            });
        });
        
        // Other calculator buttons
        container.querySelectorAll('.btn').forEach(button => {
            const action = button.getAttribute('data-action');
            if (action && !['add', 'subtract', 'multiply', 'divide', 'backspace'].includes(action)) {
                if (['clear', 'clear-entry', 'decimal', 'calculate', 
                     'memory-clear', 'memory-recall', 'memory-add', 'memory-subtract'].includes(action)) {
                    button.addEventListener('click', () => {
                        this.handleBasicAction(action);
                        this.updateDisplay();
                    });
                }
            }
        });
    }
    
    initializeTabs() {
        this.switchTab('basic');
    }
    
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        this.currentTab = tabName;
    }
    
    // Basic Calculator Functions
    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        
        if (number === '0' && this.currentOperand === '0') return;
        if (number !== '0' && this.currentOperand === '0') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }
    
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.calculate();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }
    
    calculate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    this.showNotification('Cannot divide by zero!');
                    return;
                }
                computation = prev / current;
                break;
            case 'power':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        
        computation = Math.round(computation * 100000000) / 100000000;
        this.currentOperand = computation.toString();
        this.operation = null;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }
    
    handleBasicAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'clear-entry':
                this.clearEntry();
                break;
            case 'decimal':
                this.addDecimal();
                break;
            case 'calculate':
                this.calculate();
                break;
            case 'memory-clear':
                this.memoryClear();
                break;
            case 'memory-recall':
                this.memoryRecall();
                break;
            case 'memory-add':
                this.memoryAdd();
                break;
            case 'memory-subtract':
                this.memorySubtract();
                break;
        }
    }
    
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
    }
    
    clearEntry() {
        this.currentOperand = '0';
    }
    
    delete() {
        if (this.currentOperand.length === 1 || this.currentOperand === '0') {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }
    
    addDecimal() {
        if (this.shouldResetScreen) {
            this.currentOperand = '0';
            this.shouldResetScreen = false;
        }
        
        if (this.currentOperand.includes('.')) return;
        this.currentOperand += '.';
    }
    
    memoryClear() {
        this.memory = 0;
        this.showNotification('Memory cleared');
    }
    
    memoryRecall() {
        this.currentOperand = this.memory.toString();
        this.shouldResetScreen = true;
        this.showNotification('Memory recalled');
    }
    
    memoryAdd() {
        this.memory += parseFloat(this.currentOperand) || 0;
        this.showNotification('Added to memory');
    }
    
    memorySubtract() {
        this.memory -= parseFloat(this.currentOperand) || 0;
        this.showNotification('Subtracted from memory');
    }
    
    // Scientific Calculator Functions
    handleScientificAction(action) {
        const value = parseFloat(this.currentOperand) || 0;
        let result;
        
        switch (action) {
            case 'sin':
                result = this.isDegreeMode ? Math.sin(value * Math.PI / 180) : Math.sin(value);
                break;
            case 'cos':
                result = this.isDegreeMode ? Math.cos(value * Math.PI / 180) : Math.cos(value);
                break;
            case 'tan':
                result = this.isDegreeMode ? Math.tan(value * Math.PI / 180) : Math.tan(value);
                break;
            case 'sinh':
                result = Math.sinh(value);
                break;
            case 'cosh':
                result = Math.cosh(value);
                break;
            case 'tanh':
                result = Math.tanh(value);
                break;
            case 'log':
                result = value > 0 ? Math.log(value) : NaN;
                break;
            case 'log10':
                result = value > 0 ? Math.log10(value) : NaN;
                break;
            case 'ln':
                result = value > 0 ? Math.log(value) : NaN;
                break;
            case 'exp':
                result = Math.exp(value);
                break;
            case 'pi':
                result = Math.PI;
                break;
            case 'e':
                result = Math.E;
                break;
            case 'power':
                this.previousOperand = this.currentOperand;
                this.operation = 'power';
                this.shouldResetScreen = true;
                return;
            case 'sqrt':
                result = value >= 0 ? Math.sqrt(value) : NaN;
                break;
            case 'factorial':
                result = this.factorial(value);
                break;
            case 'abs':
                result = Math.abs(value);
                break;
            case 'floor':
                result = Math.floor(value);
                break;
            case 'ceil':
                result = Math.ceil(value);
                break;
            case 'round':
                result = Math.round(value);
                break;
            case 'rand':
                result = Math.random();
                break;
            case 'deg-rad':
                this.isDegreeMode = !this.isDegreeMode;
                this.showNotification(this.isDegreeMode ? 'Switched to Degree mode' : 'Switched to Radian mode');
                return;
        }
        
        if (isNaN(result)) {
            this.showNotification('Invalid operation');
            return;
        }
        
        result = Math.round(result * 100000000) / 100000000;
        this.currentOperand = result.toString();
        this.shouldResetScreen = true;
    }
    
    factorial(n) {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    // Statistics Calculator Functions
    handleStatisticsAction(action) {
        const input = document.getElementById('data-input');
        
        switch (action) {
            case 'add-data':
                this.addData(input.value);
                break;
            case 'mean':
                this.calculateMean();
                break;
            case 'median':
                this.calculateMedian();
                break;
            case 'mode':
                this.calculateMode();
                break;
            case 'std-dev':
                this.calculateStdDev();
                break;
            case 'variance':
                this.calculateVariance();
                break;
            case 'clear-data':
                this.clearData();
                break;
        }
    }
    
    addData(input) {
        const numbers = input.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
        this.dataSet = [...this.dataSet, ...numbers];
        this.updateDataSetDisplay();
        document.getElementById('data-input').value = '';
    }
    
    updateDataSetDisplay() {
        this.dataValues.textContent = this.dataSet.join(', ');
    }
    
    calculateMean() {
        if (this.dataSet.length === 0) {
            this.statsResults.textContent = 'No data available';
            return;
        }
        const mean = this.dataSet.reduce((a, b) => a + b, 0) / this.dataSet.length;
        this.statsResults.textContent = `Mean: ${mean.toFixed(4)}`;
    }
    
    calculateMedian() {
        if (this.dataSet.length === 0) {
            this.statsResults.textContent = 'No data available';
            return;
        }
        const sorted = [...this.dataSet].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
        this.statsResults.textContent = `Median: ${median.toFixed(4)}`;
    }
    
    calculateMode() {
        if (this.dataSet.length === 0) {
            this.statsResults.textContent = 'No data available';
            return;
        }
        const frequency = {};
        this.dataSet.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });
        
        let maxFreq = 0;
        let modes = [];
        
        for (const num in frequency) {
            if (frequency[num] > maxFreq) {
                maxFreq = frequency[num];
                modes = [parseFloat(num)];
            } else if (frequency[num] === maxFreq) {
                modes.push(parseFloat(num));
            }
        }
        
        this.statsResults.textContent = `Mode: ${modes.join(', ')} (Frequency: ${maxFreq})`;
    }
    
    calculateStdDev() {
        if (this.dataSet.length === 0) {
            this.statsResults.textContent = 'No data available';
            return;
        }
        const mean = this.dataSet.reduce((a, b) => a + b, 0) / this.dataSet.length;
        const variance = this.dataSet.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / this.dataSet.length;
        const stdDev = Math.sqrt(variance);
        this.statsResults.textContent = `Standard Deviation: ${stdDev.toFixed(4)}`;
    }
    
    calculateVariance() {
        if (this.dataSet.length === 0) {
            this.statsResults.textContent = 'No data available';
            return;
        }
        const mean = this.dataSet.reduce((a, b) => a + b, 0) / this.dataSet.length;
        const variance = this.dataSet.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / this.dataSet.length;
        this.statsResults.textContent = `Variance: ${variance.toFixed(4)}`;
    }
    
    clearData() {
        this.dataSet = [];
        this.updateDataSetDisplay();
        this.statsResults.textContent = 'Data cleared';
    }
    
    // Date Calculator Functions
    setDefaultDates() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        document.getElementById('start-date').value = this.formatDate(today);
        document.getElementById('end-date').value = this.formatDate(tomorrow);
    }
    
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    handleDateAction(action) {
        const startDate = new Date(document.getElementById('start-date').value);
        const endDate = new Date(document.getElementById('end-date').value);
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            this.dateResults.textContent = 'Please select valid dates';
            return;
        }
        
        switch (action) {
            case 'days-between':
                this.calculateDaysBetween(startDate, endDate);
                break;
            case 'add-days':
                this.addDays(startDate);
                break;
            case 'subtract-days':
                this.subtractDays(startDate);
                break;
            case 'day-of-week':
                this.getDayOfWeek(startDate);
                break;
            case 'week-number':
                this.getWeekNumber(startDate);
                break;
        }
    }
    
    calculateDaysBetween(start, end) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.dateResults.textContent = `Days between: ${diffDays} day(s)`;
    }
    
    addDays(date) {
        const days = parseInt(prompt('Enter number of days to add:') || '0');
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        this.dateResults.textContent = `New date: ${newDate.toDateString()}`;
    }
    
    subtractDays(date) {
        const days = parseInt(prompt('Enter number of days to subtract:') || '0');
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - days);
        this.dateResults.textContent = `New date: ${newDate.toDateString()}`;
    }
    
    getDayOfWeek(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.dateResults.textContent = `Day of week: ${days[date.getDay()]}`;
    }
    
    getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        this.dateResults.textContent = `Week number: ${weekNumber}`;
    }
    
    // Common Functions
    updateDisplay() {
        this.resultDisplay.textContent = this.formatDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            const operatorSymbols = {
                'add': '+',
                'subtract': '-',
                'multiply': '×',
                'divide': '÷',
                'power': '^'
            };
            this.calculationDisplay.textContent = 
                `${this.formatDisplayNumber(this.previousOperand)} ${operatorSymbols[this.operation]}`;
        } else {
            this.calculationDisplay.textContent = '';
        }
    }
    
    formatDisplayNumber(number) {
        const floatNumber = parseFloat(number);
        if (isNaN(floatNumber)) return '0';
        
        if (floatNumber > 999999999 || floatNumber < -999999999) {
            return floatNumber.toExponential(6);
        }
        
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 8
        }).format(floatNumber);
    }
    
    handleKeyboardInput(event) {
        if (this.currentTab !== 'basic' && this.currentTab !== 'scientific') return;
        
        if (event.key >= '0' && event.key <= '9') {
            this.appendNumber(event.key);
            this.updateDisplay();
        } else if (event.key === '.') {
            this.addDecimal();
            this.updateDisplay();
        } else if (event.key === '+' || event.key === '-') {
            this.chooseOperation(event.key === '+' ? 'add' : 'subtract');
            this.updateDisplay();
        } else if (event.key === '*' || event.key === 'x') {
            this.chooseOperation('multiply');
            this.updateDisplay();
        } else if (event.key === '/') {
            this.chooseOperation('divide');
            this.updateDisplay();
        } else if (event.key === 'Enter' || event.key === '=') {
            event.preventDefault();
            this.calculate();
            this.updateDisplay();
        } else if (event.key === 'Escape') {
            this.clear();
            this.updateDisplay();
        } else if (event.key === 'Backspace') {
            this.delete();
            this.updateDisplay();
        }
    }
    
    initializeButtonAnimations() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function() {
                this.classList.add('pressed');
                setTimeout(() => {
                    this.classList.remove('pressed');
                }, 200);
            });
        });
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 2000);
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('calculator-theme', newTheme);
    }
    
    setInitialTheme() {
        const savedTheme = localStorage.getItem('calculator-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.getElementById('theme-switch').checked = savedTheme === 'dark';
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedCalculator();
});