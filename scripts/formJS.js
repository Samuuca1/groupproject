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
  const re = /^(3-7)'(?:\s*(?:1[01]|0-9)(''|"))?$/;
  return re.test(String(height).toLowerCase());
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