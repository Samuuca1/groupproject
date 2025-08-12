const form = document.querySelector("form");
const success = document.querySelector(".success");
const nameInput = document.querySelector('input[name="inputFName"]');
const inputEmail = document.querySelector('input[name="inputEmail"]');
const inputFeet = document.getElementById("inputFeet");
const inputInches = document.getElementById("inputInches");
const inputWeight = document.querySelector("#inputWeight");

const bmiHeader = document.querySelector('#bmi-header');

const tooltipBmi = document.querySelector('#tooltip-bmi');

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
    loopInput(inputFeet);
    loopInput(inputInches);
    loopInput(inputWeight);

    if (!nameInput.value) {
        isThisValid = false;
        refuseInput(nameInput);
    }
    if (!isValidEmail(inputEmail.value)) {
        isThisValid = false;
        refuseInput(inputEmail);
    }
    if (!(inputFeet.value >= 3 && inputFeet.value <= 8)) {
        isThisValid = false;
        refuseInput(inputFeet);
    }
    if (!(inputInches.value >= 0 && inputInches.value <= 11)) {
        isThisValid = false;
        refuseInput(inputInches);
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

inputInches.addEventListener("input", () => {
    validateInput();
});

inputFeet.addEventListener("input", () => {
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
    let feet = parseInt(inputFeet.value);
    let inches = parseInt(inputInches.value);
    let weight = parseFloat(inputWeight.value);
    let resultElement = document.getElementById("result");

    // Validate inputs
    if (!(feet >= 3 && feet <= 8) || !(inches >= 0 && inches <= 11)) {
        resultElement.innerText = "Please enter a valid height.";
        return;
    }
    if (isNaN(weight) || weight <= 0) {
        resultElement.innerText = "Please enter a valid positive weight.";
        return;
    }


    // Calculate total inches
    let totalInches = (feet * 12) + inches;


    // Calculate BMI
    let bmi = (weight * 703) / (totalInches * totalInches);
    bmi = bmi.toFixed(1);



    let message = "";

    // Categorize using switch(true)
    switch (true) {
        case (bmi < 18.5):
            message = `Your BMI is ${bmi} - Underweight. Click to start your change: <a href="underweight.html"> Here </a>`;
            break;
        case (bmi >= 18.5 && bmi < 25):
            message = `Your BMI is ${bmi} - Normal weight. Click to start your change: <a href="normal.html"> Here </a>`;
            break;
        case (bmi >= 25 && bmi < 40):
            message = `Your BMI is ${bmi} - Overweight. Click to start your change: <a href="overweight.html"> Here </a>`;
            break;
        default:
            message = `Your BMI is ${bmi} - Obese. 
            Click to start your change: <a href="obese.html"> Here </a>`;
    }

    // Display result on screen
    document.getElementById("result").innerHTML = message;
}

function submitForm() {
    validateInput();
    if (isThisValid) {
        calculateBMI();
    }
}

function setupTooltip(trigger, tooltip) {
    tooltip.style.display = 'none';
    let popperInstance = null;

    function show() {
        tooltip.style.display = 'block';
        popperInstance = Popper.createPopper(trigger, tooltip, {
            placement: 'top',
            modifiers: [
                { name: 'offset', options: { offset: [0, 8] } }
            ]
        });
    }

    function hide() {
        tooltip.style.display = 'none';
        if (popperInstance) {
            popperInstance.destroy();
            popperInstance = null;
        }
    }

    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', hide);
}

// Apply tooltips
setupTooltip(bmiHeader, tooltipBmi);