Advanced Calculator

A comprehensive, multi-functional calculator web application with multiple calculation modes including basic arithmetic, scientific functions, complex calculations, statistics, and date operations.

     Features
Basic Calculator
· Standard arithmetic operations (+, -, ×, ÷)
· Memory functions (MC, MR, M+, M-)
· Clear and clear entry options
· Decimal point operations
· Keyboard support

Scientific Calculator
· Trigonometric Functions: sin, cos, tan, sinh, cosh, tanh
· Logarithmic Functions: log, ln, log₁₀
· Mathematical Constants: π, e
· Advanced Operations:
  · Power (x^y)
  · Square root (√)
  · Factorial (x!)
  · Absolute value (|x|)
· Rounding Functions: floor, ceil, round
· Random Number Generator
· Degree/Radian Mode Toggle
Calculus Operations
· Differentiation: Symbolic and numerical differentiation
· Derivative at Point: Evaluate derivatives at specific points
· Integration: Symbolic indefinite integration
· Definite Integrals: Numerical integration with limits
Polynomial Division
· Polynomial long division
· Quotient and remainder calculation
· Support for complex polynomial expressions
Complex Numbers
· Basic Operations: Addition, subtraction, multiplication, division
· Complex Conjugate
· Magnitude Calculation
· Real and imaginary part handling
 Statistics Calculator
· Data Set Management: Input comma-separated values
· Statistical Measures:
  · Mean (average)
  · Median
  · Mode
  · Standard Deviation
  · Variance
· Data set visualization and clearing
 Date Calculator
· Days Between Dates: Calculate duration between two dates
· Date Arithmetic: Add/subtract days from dates
· Day of Week: Determine weekday for any date
· Week Number: Calculate ISO week number
· Interactive date pickers
 User Interface Features
· Dark/Light Theme: Toggle between themes with persistent storage
· Responsive Design: Works on desktop, tablet, and mobile devices
· Tab-based Navigation: Easy switching between calculator modes
· Visual Feedback: Button animations and hover effects
· Accessibility: Keyboard navigation and focus indicators
· Clean Display: Separate calculation and result displays
Installation
1. Download the files:
   · index.html
   · styles.css
   · script.js
2. Organize in a directory:
   ```
   advanced-calculator/
   ├── index.html
   ├── styles.css
   └── script.js
   ```
3. Open in browser:
   · Double-click index.html or
   · Open with your preferred web browser
Usage
  Basic Operations
· Click number buttons or use keyboard (0-9)
· Use operator buttons (+, -, ×, ÷) or keyboard equivalents
· Press = or Enter to calculate
· Use C to clear all or CE to clear entry
· Press Escape to clear everything
· Use Backspace to delete last digit
Scientific Functions
· Switch to Scientific tab
· Use trigonometric, logarithmic, and advanced math functions
· Toggle between degree and radian modes using D/R button
Complex Calculations
Calculus:
1. Enter function in format: x^2 + 3*x + 2
2. Specify variable (default: x)
3. Use "Differentiate" for derivative or "Integrate" for antiderivative
4. For definite integrals, enter limits when prompted
Polynomial Division:
1. Enter numerator polynomial: x^3 + 2x^2 - x + 3
2. Enter denominator polynomial: x + 1
3. Click "Divide Polynomials" to see quotient and remainder
Complex Numbers:
1. Enter real and imaginary parts for both numbers
2. Choose operation (add, subtract, multiply, divide, conjugate, magnitude)
Statistics:
1. Enter numbers separated by commas: 1, 2, 3, 4, 5
2. Click "Add Data" to populate data set
3. Use statistical function buttons to calculate measures
Date Calculations:
1. Select start and end dates using date pickers
2. Choose date operation (days between, add days, etc.)
3. Follow prompts for additional input when needed
 Supported Input Formats
Mathematical Functions:
· Basic: x^2 + 3*x - 5
· Trigonometric: sin(x) + cos(2*x)
· Exponential: exp(x) + log(x)
· Mixed: 2*x^3 - sin(x) + log(x)
Polynomials:
· Standard: x^3 + 2x^2 - x + 3
· With coefficients: 3x^2 - 2x + 1
· Multiple terms: x^4 - 2x^3 + x - 5
Complex Numbers:
· Real part: any number
· Imaginary part: any number
🛠️ Technical Details
Built With:
· HTML5: Semantic structure and accessibility
· CSS3: Modern styling with CSS Grid and Flexbox
· JavaScript ES6+: Object-oriented programming with classes

Browser Compatibility:
· Chrome 60+
· Firefox 55+
· Safari 12+
· Edge 79+
Features:
· Local Storage: Theme preference persistence
· Responsive Design: Mobile-first approach
· Modular Code: Organized, maintainable JavaScript
· Error Handling: Comprehensive input validation
🔧 Customization

Themes:
The calculator supports custom themes through CSS variables. Modify the :root and [data-theme="dark"] sections in styles.css to create custom color schemes.

Adding Functions:
New mathematical functions can be added by extending the handleScientificAction method in the JavaScript code.

Known Limitations
· Symbolic differentiation and integration have limited function support
· Very large numbers may use scientific notation
· Complex polynomial parsing has some formatting restrictions
· Mobile view may have reduced button sizes on very small screens
License
This project is open source and available under the MIT License.
Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.
 Future Enhancements
· Matrix operations
· Graphing capabilities
· Unit conversions
· History tracking
· Export functionality
· Additional statistical tests
**Folder structure**
PerfectCalculator/
├── index.html          # Main HTML file
├── styles.css          # CSS styling file
├── script.js           # JavaScript functionality
└── READ_ME.txt         # This documentation file