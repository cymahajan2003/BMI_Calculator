// DOM Elements
const metricBtn = document.getElementById('metricBtn');
const imperialBtn = document.getElementById('imperialBtn');
const metricSection = document.getElementById('metricSection');
const imperialSection = document.getElementById('imperialSection');
const calculateBtn = document.getElementById('calculateBtn');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');

// Input Elements
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const feetInput = document.getElementById('feet');
const inchesInput = document.getElementById('inches');
const poundsInput = document.getElementById('pounds');

// App State
const appState = {
    isMetric: true,
    currentBMI: null
};

// Initialize App
function initApp() {
    // Set default values
    heightInput.value = '170';
    weightInput.value = '70';
    feetInput.value = '5';
    inchesInput.value = '7';
    poundsInput.value = '154';
    
    // Set up event listeners
    setupEventListeners();
    
    // Reset result display
    resetResult();
}

// Set up event listeners
function setupEventListeners() {
    // System toggle
    metricBtn.addEventListener('click', () => switchSystem('metric'));
    imperialBtn.addEventListener('click', () => switchSystem('imperial'));
    
    // Calculate button
    calculateBtn.addEventListener('click', calculateBMI);
    
    // Keyboard support
    document.addEventListener('keydown', handleKeyDown);
}

// Handle keyboard events
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        calculateBMI();
    }
}

// Switch between metric and imperial systems
function switchSystem(system) {
    appState.isMetric = system === 'metric';
    
    // Update button states
    metricBtn.classList.toggle('active', appState.isMetric);
    imperialBtn.classList.toggle('active', !appState.isMetric);
    
    // Show/hide input sections
    metricSection.classList.toggle('hidden', !appState.isMetric);
    imperialSection.classList.toggle('hidden', appState.isMetric);
    
    // Reset results
    resetResult();
}

// Calculate BMI
function calculateBMI() {
    const bmi = appState.isMetric ? calculateMetricBMI() : calculateImperialBMI();
    
    if (bmi === null) {
        showError('Please check your inputs');
        return;
    }
    
    displayResult(bmi);
    appState.currentBMI = bmi;
}

// Calculate BMI for metric system
function calculateMetricBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    // Validate inputs
    if (!validateMetricInputs(height, weight)) {
        return null;
    }
    
    // Convert height to meters
    const heightInMeters = height / 100;
    
    // Calculate BMI
    return weight / (heightInMeters * heightInMeters);
}

// Calculate BMI for imperial system
function calculateImperialBMI() {
    const feet = parseFloat(feetInput.value);
    const inches = parseFloat(inchesInput.value);
    const pounds = parseFloat(poundsInput.value);
    
    // Validate inputs
    if (!validateImperialInputs(feet, inches, pounds)) {
        return null;
    }
    
    // Convert height to total inches
    const totalInches = (feet * 12) + inches;
    
    // Calculate BMI
    return (pounds / (totalInches * totalInches)) * 703;
}

// Validate metric inputs
function validateMetricInputs(height, weight) {
    if (isNaN(height) || isNaN(weight)) {
        return false;
    }
    
    if (height < 50 || height > 250) {
        return false;
    }
    
    if (weight < 20 || weight > 300) {
        return false;
    }
    
    return true;
}

// Validate imperial inputs
function validateImperialInputs(feet, inches, pounds) {
    if (isNaN(feet) || isNaN(inches) || isNaN(pounds)) {
        return false;
    }
    
    if (feet < 3 || feet > 8) {
        return false;
    }
    
    if (inches < 0 || inches > 11) {
        return false;
    }
    
    if (pounds < 50 || pounds > 660) {
        return false;
    }
    
    return true;
}

// Display result
function displayResult(bmi) {
    // Format BMI value
    const formattedBMI = formatBMI(bmi);
    bmiValue.textContent = formattedBMI;
    
    // Determine category
    const category = getBMICategory(bmi);
    
    // Update category display
    bmiCategory.textContent = category.name;
    bmiCategory.className = `category ${category.className}`;
}

// Format BMI to one decimal place
function formatBMI(bmi) {
    return Math.round(bmi * 10) / 10;
}

// Get BMI category
function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return { name: 'Underweight', className: 'underweight' };
    } else if (bmi < 25) {
        return { name: 'Normal Weight', className: 'normal' };
    } else if (bmi < 30) {
        return { name: 'Overweight', className: 'overweight' };
    } else {
        return { name: 'Obese', className: 'obese' };
    }
}

// Show error message
function showError(message) {
    bmiValue.textContent = '--';
    bmiCategory.textContent = message;
    bmiCategory.className = 'category';
    bmiCategory.style.color = '#6c757d';
}

// Reset result display
function resetResult() {
    bmiValue.textContent = '--';
    bmiCategory.textContent = 'Enter measurements';
    bmiCategory.className = 'category';
    bmiCategory.style.color = '';
    appState.currentBMI = null;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
