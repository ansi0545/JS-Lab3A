// Function to generate a unique random number array
function generateUniqueRandomArray() {
    let arr = [];
    while(arr.length < 10){
        let r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

// Generate the array and display it
let randomArray = generateUniqueRandomArray();
document.getElementById("randomArray").innerHTML = "Unsorted: " + randomArray.join(", ");

// Sort and display the array
let sortedArray = randomArray.slice().sort((a, b) => a - b);
document.getElementById("sortedArray").innerHTML = "Sorted: " + sortedArray.join(", ");

// Function to validate JavaScript form
document.getElementById("jsForm").addEventListener("submit", function(event){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = document.getElementById("email").value;
    const terms = document.getElementById("terms").checked;
    
    // Clear previous error message
    document.getElementById("jsFormError").innerHTML = "";

    if (!username) {
        document.getElementById("jsFormError").innerHTML = "Användarnamn är obligatoriskt.";
        return;
    }
    if (!password) {
        document.getElementById("jsFormError").innerHTML = "Lösenord är obligatoriskt.";
        return;
    }
    if (password.length < 6) {
        document.getElementById("jsFormError").innerHTML = "Lösenordet måste vara minst 6 tecken.";
        return;
    }
    if (password !== confirmPassword) {
        document.getElementById("jsFormError").innerHTML = "Lösenorden matchar inte.";
        return;
    }
    if (!email) {
        document.getElementById("jsFormError").innerHTML = "E-post är obligatoriskt.";
        return;
    }
    // Use a regular expression to validate the email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("jsFormError").innerHTML = "Ogiltig e-postadress.";
        return;
    }
    if (!terms) {
        document.getElementById("jsFormError").innerHTML = "Du måste acceptera villkoren.";
        return;
    }
    window.location.href = "thankyou.html";
});

// Function to validate HTML5 form with custom error messages
document.getElementById("htmlForm").addEventListener("submit", function(event){
    // Clear previous error messages
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.textContent = '';
    });

    // Check validity of each input
    const inputs = this.querySelectorAll('input[required]');
    let isValid = true;
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            const errorMessage = input.validationMessage;
            const errorFieldId = input.id + "Error";
            document.getElementById(errorFieldId).textContent = errorMessage;
            isValid = false;
        }
    });

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if any field is invalid
    } else {
        event.preventDefault();
        const username = document.getElementById("htmlUsername").value;
        const password = document.getElementById("htmlPassword").value;
        const email = document.getElementById("htmlEmail").value;
        const terms = document.getElementById("htmlTerms").checked;

        if (!username) {
            document.getElementById("htmlUsernameError").textContent = "Please fill out this field.";
            return;
        }
        if (!password) {
            document.getElementById("htmlPasswordError").textContent = "Please fill out this field.";
            return;
        }
        if (password.length < 6) {
            document.getElementById("htmlPasswordError").textContent = "Password has to be at least 6 characters.";
            return;
        }
        if (!email) {
            document.getElementById("htmlEmailError").textContent = "Please fill out this field.";
            return;
        }
        // Use a regular expression to validate the email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById("htmlEmailError").textContent = "Please include an '@' in the email address.";
            return;
        }
        if (!terms) {
            document.getElementById("htmlTermsError").textContent = "Please check this box if you want to proceed.";
            return;
        }
        window.location.href = "thankyou.html";
    }
});