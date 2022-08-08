

// constants
const c_PasswordMinLength = 8;
const c_FormElementClass_Valid = "form-valid";
const c_FormElementClass_Invalid = "form-invalid";

// elements
const FormElement = document.querySelector("#signup-form");
const PhoneNumberElement = document.querySelector("#phone-number");
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
PhoneNumberElement.onblur = OnPhoneNumberBlur;
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
        PasswordSyntaxLetterElement.classList.remove(c_FormElementClass_Invalid);
        PasswordSyntaxLetterElement.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        PasswordSyntaxLetterElement.classList.remove(c_FormElementClass_Valid);
        PasswordSyntaxLetterElement.classList.add(c_FormElementClass_Invalid);
    }

    // validate uppercase
    if(DoesContainUpperCaseLetter(PasswordElement.value))
    {
        PasswordSyntaxCapitalElement.classList.remove(c_FormElementClass_Invalid);
        PasswordSyntaxCapitalElement.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        PasswordSyntaxCapitalElement.classList.remove(c_FormElementClass_Valid);
        PasswordSyntaxCapitalElement.classList.add(c_FormElementClass_Invalid);
    }

    // validate numbers
    if(DoesContainNumber(PasswordElement.value))
    {
        PasswordSyntaxNumberElement.classList.remove(c_FormElementClass_Invalid);
        PasswordSyntaxNumberElement.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        PasswordSyntaxNumberElement.classList.remove(c_FormElementClass_Valid);
        PasswordSyntaxNumberElement.classList.add(c_FormElementClass_Invalid);
    }

    // validate length
    if(IsMinimumLength(PasswordElement.value))
    {
        PasswordSyntaxLengthElement.classList.remove(c_FormElementClass_Invalid);
        PasswordSyntaxLengthElement.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        PasswordSyntaxLengthElement.classList.remove(c_FormElementClass_Valid);
        PasswordSyntaxLengthElement.classList.add(c_FormElementClass_Invalid);
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


// when the user clicks outside of the phone-number field
function OnPhoneNumberBlur(event)
{
    CheckValidPhoneNumber();
}


function CheckPasswordsMatch()
{
    if(DoPasswordFieldsMatch())
    {
        PasswordRepeatElement.classList.remove(c_FormElementClass_Invalid);
        PasswordRepeatElement.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        PasswordRepeatElement.classList.remove(c_FormElementClass_Valid);
        PasswordRepeatElement.classList.add(c_FormElementClass_Invalid);
    }
}


function CheckValidPhoneNumber()
{
    if(IsPhoneNumberValid(PhoneNumberElement.value))
    {
        PhoneNumberElement.classList.remove(c_FormElementClass_Invalid);
        PhoneNumberElement.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        PhoneNumberElement.classList.remove(c_FormElementClass_Valid);
        PhoneNumberElement.classList.add(c_FormElementClass_Invalid);
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


function IsPhoneNumberValid(string)
{
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    
    return re.test(string);
}