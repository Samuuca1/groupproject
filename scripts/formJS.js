const form = document.querySelector("form");
const success = document.querySelector(".success");
const nameInput = document.querySelector('input[name="inputFName"]');
const inputEmail = document.querySelector('input[name="inputEmail"]');
const inputHeight = document.querySelector("#inputHeight");
const inputWeight = document.querySelector("#inputWeight");


const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const loopInput = (element) => {
    element.classList.remove("invalid");
    element.nextElementSibling.classList.add("hidden");
};

const refuseInput = (element) => {
    element.classList.add("invalid");
    element.nextElementSibling.classList.remove("hidden");
};

let isThisValid = false;

const validateInput = () => {
    isThisValid = true;
    loopInput(nameInput);
    loopInput(inputEmail);
    loopInput(inputHeight);
    loopInput(inputWeight);

    if (!nameInput.value) {
        isThisValid = false;
        refuseInput(nameInput);
    }
    if (!isValidEmail(inputEmail.value)) {
        isThisValid = false;
        refuseInput(inputEmail);
    }
    if (!isValidHeight(inputHeight.value)) {
        isThisValid = false;
        refuseInput(inputHeight);
    }
    if (!inputWeight.value) {
        isThisValid = false;
        refuseInput(inputWeight);
    }
};


nameInput.addEventListener("input", () => {
    validateInput();
});

inputEmail.addEventListener("input", () => {
    validateInput();
});

inputHeight.addEventListener("input", () => {
    validateInput();
});

inputWeight.addEventListener("input", () => {
    validateInput();
});


const isValidHeight = (height) => {
    // Match 3'0" to 8'11"
    const re = /^([3-8])'([0-9]|1[0-1])("?|''?)$/;
    return re.test(String(height).trim());
}



// Calculating BMI
function calculateBMI() {
    let heightInput = document.getElementById("inputHeight").value.trim();
    let weight = parseFloat(document.getElementById("inputWeight").value);
    let resultElement = document.getElementById("result");

    // Validate inputs
    if (!isValidHeight(heightInput)) {
        resultElement.innerText = "Please enter height in format like 5'10\".";
        return;
    }
    if (isNaN(weight) || weight <= 0) {
        resultElement.innerText = "Please enter a valid positive weight.";
        return;
    }

    // Extract feet and inches
    let match = heightInput.match(/^([3-8])'([0-9]|1[0-1])/);
    let feet = parseInt(match[1]);
    let inches = parseInt(match[2]);

    // Convert total inches to meters
    let totalInches = feet * 12 + inches;
    let heightMeters = totalInches * 0.0254; // 1 inch = 0.0254 m

    // Convert weight lbs to kg
    let weightKg = weight * 0.453592;

    // Calculate BMI
    let bmi = weightKg / (heightMeters * heightMeters);
    bmi = bmi.toFixed(1);

    let message = "";

    // Categorize using switch(true)
    switch (true) {
        case (bmi < 18.5):
            message = `Your BMI is ${bmi} - Underweight.`;
            break;
        case (bmi >= 18.5 && bmi < 25):
            message = `Your BMI is ${bmi} - Normal weight.`;
            break;
        case (bmi >= 25 && bmi < 30):
            message = `Your BMI is ${bmi} - Overweight.`;
            break;
        default:
            message = `Your BMI is ${bmi} - Obese.`;
    }

    // Display result on screen
    document.getElementById("result").innerText = message;
}

function submitForm() {
    validateInput();
    if (isThisValid) {
        calculateBMI();
    }
}
