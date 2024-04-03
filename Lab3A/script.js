const RANDOM_ARRAY_LENGTH = 10;
const RANDOM_NUMBER_RANGE = 100;
const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateUniqueRandomNumber() {
    return Math.floor(Math.random() * RANDOM_NUMBER_RANGE) + 1;
}

function generateUniqueRandomArray() {
    let arr = [];
    while(arr.length < RANDOM_ARRAY_LENGTH){
        let r = generateUniqueRandomNumber();
        if(!arr.includes(r)) arr.push(r);
    }
    return arr;
}

function displayArray(id, array, message) {
    document.getElementById(id).innerHTML = `${message}: ${array.join(", ")}`;
}

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

let randomArray = generateUniqueRandomArray();
displayArray("randomArray", randomArray, "Unsorted");
let sortedArray = [...randomArray].sort((a, b) => a - b);
displayArray("sortedArray", sortedArray, "Sorted");

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
    () => !document.getElementById("htmlUsername").value && "Please fill out this field.",
    () => !document.getElementById("htmlPassword").value && "Please fill out this field.",
    () => document.getElementById("htmlPassword").value.length < MIN_PASSWORD_LENGTH && "Password has to be at least 6 characters.",
    () => !document.getElementById("htmlEmail").value && "Please fill out this field.",
    () => !EMAIL_REGEX.test(document.getElementById("htmlEmail").value) && "Please include an '@' in the email address.",
    () => !document.getElementById("htmlTerms").checked && "Please check this box if you want to proceed."
]);