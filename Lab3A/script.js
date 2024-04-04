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
    while(arr.length < RANDOM_ARRAY_LENGTH){
        let r = generateUniqueRandomNumber();
        if(!arr.includes(r)) arr.push(r);
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
 * Validates a form based on the provided validation functions.
 * @param {string} formId - The ID of the form element.
 * @param {string} errorId - The ID of the error element where error messages will be displayed.
 * @param {Array<Function>} validationFunctions - An array of validation functions to be executed.
 */
function validateForm(formId, errorId, validationFunctions) {
    document.getElementById(formId).addEventListener("submit", function(event){
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

/**
 * An array of unique random numbers.
 * @type {Array<number>}
 */
let randomArray = generateUniqueRandomArray();
displayArray("randomArray", randomArray, "Unsorted");
/**
 * Represents an array that is sorted in ascending order.
 * @type {number[]}
 */
let sortedArray = [...randomArray].sort((a, b) => a - b);
displayArray("sortedArray", sortedArray, "Sorted");

/**The selected code is calling the function twice, once for each form in your HTML document. The function takes three arguments: the ID of the form to validate, the ID of the element where error messages should be displayed, and an array of validation functions.

Each validation function is an arrow function that returns an error message if the validation fails. If the validation passes, the function returns `undefined` (because the logical AND (`&&`) operator returns `undefined` if the left-hand side is falsy).

The first call to validates the form with the ID "jsForm". The validation functions check that the username, password, and email fields are not empty, that the password is at least 6 characters long, that the password and confirmation match, that the email is valid, and that the terms are accepted. The error messages are in Swedish.

The second call to validates the form with the ID "htmlForm". The validation functions are similar to the first call, but the error messages are in English. */

validateForm("jsForm", "jsFormError", [
    () => !document.getElementById("username").value && "Användarnamn är obligatoriskt.",
    () => !document.getElementById("password").value && "Lösenord är obligatoriskt.",
    () => document.getElementById("password").value.length < MIN_PASSWORD_LENGTH && "Lösenordet måste vara minst 6 tecken.",
    () => document.getElementById("password").value !== document.getElementById("confirmPassword").value && "Lösenorden matchar inte.",
    () => !document.getElementById("email").value && "E-post är obligatoriskt.",
    () => !EMAIL_REGEX.test(document.getElementById("email").value) && "Ogiltig e-postadress.",
    () => !document.getElementById("terms").checked && "Du måste acceptera villkoren."
]);


/**The selected code is calling the function twice, once for each form in your HTML document.
Each validation function is an arrow function that returns an error message if the validation fails. If the validation passes, the function returns `undefined` (because the logical AND (`&&`) operator returns `undefined` if the left-hand side is falsy).

The first call to validates the form with the ID "jsForm". The validation functions check that the username, password, and email fields are not empty, that the password is at least 6 characters long, that the password and confirmation match, that the email is valid, and that the terms are accepted. The error messages are in Swedish.

The second call to validates the form with the ID "htmlForm". The validation functions are similar to the first call, but the error messages are in English. */
validateForm("htmlForm", "htmlFormError", [
    () => !document.getElementById("htmlUsername").value && "Please fill out this field.",
    () => !document.getElementById("htmlPassword").value && "Please fill out this field.",
    () => document.getElementById("htmlPassword").value.length < MIN_PASSWORD_LENGTH && "Password has to be at least 6 characters.",
    () => !document.getElementById("htmlEmail").value && "Please fill out this field.",
    () => !EMAIL_REGEX.test(document.getElementById("htmlEmail").value) && "Please include an '@' in the email address.",
    () => !document.getElementById("htmlTerms").checked && "Please check this box if you want to proceed."
]);