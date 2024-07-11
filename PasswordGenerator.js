const passwordBox = document.getElementById("password");
const generateButton = document.getElementById("generate-password");
const showPasswordBtn = document.getElementById("show-password");
var passStrength = document.getElementById("pass-strength");


generateButton.addEventListener("click", function () {

    var strong = false;
    var medium = false;
    var weak = true;
    var numberOfChecked = 0;
    const passLength = parseInt(document.getElementById("pass-length").value, 10)
    const upperCase = document.getElementById("upper-case").checked;
    if (upperCase) {
        numberOfChecked++;
    }

    const lowerCase = document.getElementById("lower-case").checked;
    if (lowerCase) {
        numberOfChecked++;
    }

    const number = document.getElementById("include-numbers").checked;
    if (number) {
        numberOfChecked++;
    }

    const specials = document.getElementById("include-specials").checked;
    if (specials) {
        numberOfChecked++;
    }

    if (passLength >= 7 || numberOfChecked >= 2) {
        if (passLength >= 15 || numberOfChecked >= 3) {
            strong = true;
            weak = false;
        }
        else {
            medium = true;
            weak = false;
        }
    }

    if (strong) {
        passStrength.textContent = "Strong Password";
        passStrength.classList.remove("weak", "medium");
        passStrength.classList.add("strong");
    }
    else if (medium) {
        passStrength.textContent = "Medium Password";
        passStrength.classList.remove("weak", "strong");
        passStrength.classList.add("medium");
    }
    else if (weak) {
        passStrength.textContent = "Weak Password";
        passStrength.classList.remove("strong", "medium");
        passStrength.classList.add("weak");
    }

    passwordBox.value = generatePassword(passLength, upperCase, lowerCase, number, specials);
    passwordBox.type = "password";
})

showPasswordBtn.addEventListener("click", function () {
    passwordBox.type = "text";
})



function generatePassword(length, includeUpperCase, includeLowerCase, includeNumbers, includeSymbols) {

    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const specialSymbols = "!@#$%^&*()+-=-_*/";

    let allowedChars = "";
    let password = "";

    allowedChars += includeLowerCase ? lowerCaseChars : "";
    allowedChars += includeUpperCase ? upperCaseChars : "";
    allowedChars += includeNumbers ? numberChars : "";
    allowedChars += includeSymbols ? specialSymbols : "";

    if (length <= 0) {
        return "(Password length must be at least 1)";
    }

    if (allowedChars.length == 0) {
        return "(At least one set of characters need to be selected)";
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);   //getting index of a random element of the long collection of allowed chars
        password += allowedChars[randomIndex];
    }

    return password;



}

