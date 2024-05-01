const RANDOM_ARRAY_LENGTH = 10;
const RANDOM_NUMBER_RANGE = 100;
const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Generates a unique random number within a specified range.
 * @returns {number} The generated random number.
 */
function generateUniqueRandomNumber() {
    return Math.floor(Math.random() * RANDOM_NUMBER_RANGE) + 1;
}

/**
 * Generates an array of unique random numbers.
 * @returns {number[]} The array of unique random numbers.
 */
function generateUniqueRandomArray() {
    let arr = [];
    while (arr.length < RANDOM_ARRAY_LENGTH) {
        let r = generateUniqueRandomNumber();
        if (!arr.includes(r)) arr.push(r);
    }
    return arr;
}

/**
 * Displays an array in the specified HTML element with a custom message.
 * @param {string} id - The ID of the HTML element where the array will be displayed.
 * @param {Array} array - The array to be displayed.
 * @param {string} message - The custom message to be displayed before the array.
 */
function displayArray(id, array, message) {
    document.getElementById(id).innerHTML = `${message}: ${array.join(", ")}`;
}

/**
 * An array of unique random numbers.
 * @type {Array<number>}
 */
let randomArray = generateUniqueRandomArray();
displayArray("randomArray", randomArray, "Osorterad");


/**
 * Represents an array that is sorted in ascending order.
 * @type {number[]}
 */
let sortedArray = [...randomArray].sort((a, b) => a - b);
displayArray("sortedArray", sortedArray, "Sorterad");



/**
 * Validates a form based on the provided validation functions.
 * @param {string} formId - The ID of the form element.
 * @param {string} errorId - The ID of the error element where error messages will be displayed.
 * @param {Array<Function>} validationFunctions - An array of validation functions to be executed.
 */
function validateForm(formId, errorId, validationFunctions) {
    document.getElementById(formId).addEventListener("submit", function (event) {
        event.preventDefault();
        document.getElementById(errorId).innerHTML = "";
        for (let validate of validationFunctions) {
            let errorMessage = validate();
            if (errorMessage) {
                document.getElementById(errorId).innerHTML = errorMessage;
                return;
            }
        }
        window.location.href = "thankyou.html";
    });
}


validateForm("jsForm", "jsFormError", [
    () => !document.getElementById("username").value && "Användarnamn är obligatoriskt.",
    () => !document.getElementById("password").value && "Lösenord är obligatoriskt.",
    () => document.getElementById("password").value.length < MIN_PASSWORD_LENGTH && "Lösenordet måste vara minst 6 tecken.",
    () => document.getElementById("password").value !== document.getElementById("confirmPassword").value && "Lösenorden matchar inte.",
    () => !document.getElementById("email").value && "E-post är obligatoriskt.",
    () => !EMAIL_REGEX.test(document.getElementById("email").value) && "Ogiltig e-postadress.",
    () => !document.getElementById("terms").checked && "Du måste acceptera villkoren."
]);


validateForm("htmlForm", "htmlFormError", [
    () => !document.getElementById("htmlUsername").value && "Användarnamn är obligatoriskt.",
    () => !document.getElementById("htmlPassword").value && "Lösenord är obligatoriskt.",
    () => document.getElementById("htmlPassword").value.length < MIN_PASSWORD_LENGTH && "Lösenordet måste vara minst 6 tecken.",
    () => !document.getElementById("htmlEmail").value && "E-post är obligatoriskt.",
    () => !EMAIL_REGEX.test(document.getElementById("htmlEmail").value) && "Ogiltig e-postadress.",
    () => !document.getElementById("htmlTerms").checked && "Du måste acceptera villkoren."
]);