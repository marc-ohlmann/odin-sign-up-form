

// constants
const c_PasswordMinLength = 8;


// elements
const FormElement = document.querySelector("#signup-form");
const PasswordElement = document.querySelector("#password");
const PasswordRepeatElement = document.querySelector("#password-repeat");
const PasswordSyntaxElement = document.querySelector("#password-syntax-message");
const PasswordSyntaxLetterElement = document.querySelector("#password-syntax-letter");
const PasswordSyntaxCapitalElement = document.querySelector("#password-syntax-capital");
const PasswordSyntaxNumberElement = document.querySelector("#password-syntax-number");
const PasswordSyntaxLengthElement = document.querySelector("#password-syntax-length");
const BtnSubmit = document.querySelector("#btn-submit");


// events
FormElement.onsubmit = OnFormSubmitRequested;
PasswordElement.onfocus = OnPasswordFocused;
PasswordElement.onblur = OnPasswordBlur;
PasswordElement.onkeyup = OnPasswordKeyUp;
PasswordRepeatElement.onblur = OnPasswordRepeatBlur;
PasswordRepeatElement.onkeyup = OnPasswordRepeatKeyUp;
BtnSubmit.onclick = OnSubmitButtonClicked;


// when the user clicks inside of the password field
function OnPasswordFocused(event)
{
    PasswordSyntaxElement.style.display = "block";
}


// when the user clicks outside of the password field
function OnPasswordBlur(event)
{
    PasswordSyntaxElement.style.display = "none";

    CheckPasswordsMatch();
}


// when the user starts to type something inside the password field
function OnPasswordKeyUp(event)
{
    // validate lowercase
    if(DoesContainLowerCaseLetter(PasswordElement.value))
    {
        PasswordSyntaxLetterElement.classList.remove("password-invalid");
        PasswordSyntaxLetterElement.classList.add("password-valid");
    }
    else
    {
        PasswordSyntaxLetterElement.classList.remove("password-valid");
        PasswordSyntaxLetterElement.classList.add("password-invalid");
    }

    // validate uppercase
    if(DoesContainUpperCaseLetter(PasswordElement.value))
    {
        PasswordSyntaxCapitalElement.classList.remove("password-invalid");
        PasswordSyntaxCapitalElement.classList.add("password-valid");
    }
    else
    {
        PasswordSyntaxCapitalElement.classList.remove("password-valid");
        PasswordSyntaxCapitalElement.classList.add("password-invalid");
    }

    // validate numbers
    if(DoesContainNumber(PasswordElement.value))
    {
        PasswordSyntaxNumberElement.classList.remove("password-invalid");
        PasswordSyntaxNumberElement.classList.add("password-valid");
    }
    else
    {
        PasswordSyntaxNumberElement.classList.remove("password-valid");
        PasswordSyntaxNumberElement.classList.add("password-invalid");
    }

    // validate length
    if(IsMinimumLength(PasswordElement.value))
    {
        PasswordSyntaxLengthElement.classList.remove("password-invalid");
        PasswordSyntaxLengthElement.classList.add("password-valid");
    }
    else
    {
        PasswordSyntaxLengthElement.classList.remove("password-valid");
        PasswordSyntaxLengthElement.classList.add("password-invalid");
    }
}

// when the user clicks outside of the repeat-password field
function OnPasswordRepeatBlur(event)
{
    CheckPasswordsMatch();
}

// when the user types in the repeat-password field
function OnPasswordRepeatKeyUp(event)
{
    CheckPasswordsMatch();
}


// called when the submit button is pressed
function OnSubmitButtonClicked()
{
    CheckPasswordsMatch();
}


// called when the form is submitted
// returns true if the page form should be submitted
function OnFormSubmitRequested()
{
    return DoPasswordFieldsMatch();
}


function CheckPasswordsMatch()
{
    if(DoPasswordFieldsMatch())
    {
        PasswordRepeatElement.classList.remove("password-invalid");
        PasswordRepeatElement.classList.add("password-valid");
    }
    else
    {
        PasswordRepeatElement.classList.remove("password-valid");
        PasswordRepeatElement.classList.add("password-invalid");
    }
}


function DoPasswordFieldsMatch()
{
    return PasswordElement.value === PasswordRepeatElement.value
}


function DoesContainLowerCaseLetter(string)
{
    const lowerCaseLetters = /[a-z]/g;
    if(string.match(lowerCaseLetters))
    {
        return true;
    }
    

    return false;
}


function DoesContainUpperCaseLetter(string)
{
    const upperCaseLetters = /[A-Z]/g;
    if(string.match(upperCaseLetters))
    {
        return true;
    }
    

    return false;
}


function DoesContainNumber(string)
{
    const numbers = /[0-9]/g;
    if(string.match(numbers))
    {
        return true;
    }
    

    return false;
}


function IsMinimumLength(string)
{
    return string.length >= c_PasswordMinLength;
}


function IsPasswordValid(string)
{
    return  DoesContainLowerCaseLetter(string) &&
            DoesContainUpperCaseLetter(string) &&
            DoesContainNumber(string) &&
            IsMinimumLength(string);
}