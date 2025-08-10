const form = document.querySelector("form");
const success = document.querySelector(".success");
const nameInput = document.querySelector('input[name="inputFName"]');
const inputEmail = document.querySelector('input[name="inputEmail"]');
const inputHeight = document.querySelector('input[name="inputHeight"]');
const inputWeight = document.querySelector('input[name="inputWeight"]');
const inputGoal = document.querySelector('textarea[name="inputGoal"]');


const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
const isValidHeight = (height) => {
    const re = /^([3-8])'([0-9]|1[0-1])("?|''?)$/;
    return re.test(String(height).trim());
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
    loopInput(inputGoal);

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
    if (!inputGoal.value) {
        isThisValid = false;
        refuseInput(inputGoal);
    }


};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInput();
    if (isThisValid) {
        form.remove();
        success.classList.remove("hidden")
    }
});

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

inputGoal.addEventListener("textarea", () => {
    validateInput();
});

function calculate() {
    let height = parseFloat(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById("result").innerText = "Please enter valid positive numbers.";
        return;
    }

    // Calculating BMI
    let heightMeters = height / 100;
    let bmi = weight / (heightMeters * heightMeters);

    let message = "";

    // Different Cases of body types
    switch (true) {
        case (bmi < 18.5):
            message = `Your BMI is ${bmi.toFixed(1)} - Underweight.`;
            break;
        case (bmi >= 18.5 && bmi < 25):
            message = `Your BMI is ${bmi.toFixed(1)} - Normal weight.`;
            break;
        case (bmi >= 25 && bmi < 30):
            message = `Your BMI is ${bmi.toFixed(1)} - Overweight.`;
            break;
        default:
            message = `Your BMI is ${bmi.toFixed(1)} - Obese.`;
    }

    document.getElementById("result").innerText = message;
}

