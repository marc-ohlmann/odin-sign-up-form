

// constants
const c_PasswordMinLength = 8;
const c_FormElementClass_Valid = "form-valid";
const c_FormElementClass_Invalid = "form-invalid";
const c_SpecialCharacters = "!@#$%^&*";

// elements
const FormElement = document.querySelector("#signup-form");
const NameElement_First = document.querySelector("#name-first");
const NameElement_Last = document.querySelector("#name-last");
const EmailElement = document.querySelector("#email");
const PhoneNumberElement = document.querySelector("#phone-number");
const PasswordElement = document.querySelector("#password");
const PasswordRepeatElement = document.querySelector("#password-repeat");
const PasswordSyntaxElement = document.querySelector("#password-syntax-message");
const PasswordSyntaxLetterElement = document.querySelector("#password-syntax-letter");
const PasswordSyntaxCapitalElement = document.querySelector("#password-syntax-capital");
const PasswordSyntaxSpecialElement = document.querySelector("#password-syntax-special");
const PasswordSyntaxNumberElement = document.querySelector("#password-syntax-number");
const PasswordSyntaxLengthElement = document.querySelector("#password-syntax-length");
const BtnSubmit = document.querySelector("#btn-submit");

PasswordElement.setAttribute('title', "Must contain at least one number, one uppercase letter, one lowercase, and at least "
    + String(c_PasswordMinLength) + " or more characters");
PasswordElement.setAttribute('pattern', "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{" + String(c_PasswordMinLength) + ",}");
PasswordSyntaxLengthElement.innerHTML = "A minimum of <b>" + String(c_PasswordMinLength) + " characters</b>"
PasswordSyntaxSpecialElement.innerHTML = "A special (<b>" + c_SpecialCharacters + "</b>) character"

// events
FormElement.onsubmit = OnFormSubmitRequested;
NameElement_First.onblur = OnFirstNameBlur;
NameElement_Last.onblur = OnLastNameBlur;
EmailElement.onblur = OnEmailBlur;
PasswordElement.onfocus = OnPasswordFocused;
PasswordElement.onblur = OnPasswordBlur;
PasswordElement.onkeyup = OnPasswordKeyUp;
PasswordRepeatElement.onblur = OnPasswordRepeatBlur;
PasswordRepeatElement.onkeyup = OnPasswordRepeatKeyUp;
PhoneNumberElement.onblur = OnPhoneNumberBlur;
BtnSubmit.onclick = OnSubmitButtonClicked;


// when the user clicks outside of the first name field
function OnFirstNameBlur(event)
{
    if(NameElement_First.classList.contains(c_FormElementClass_Invalid))
    {
        CheckFirstNameValid();
    }
}


// when the user clicks outside of the last name field
function OnLastNameBlur(event)
{
    if(NameElement_Last.classList.contains(c_FormElementClass_Invalid))
    {
        CheckLastNameValid();
    }
}


// when the user clicks outside of the email field
function OnEmailBlur(event)
{
    CheckEmailValid();
}


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
    CheckPasswordValid();
}


// when the user starts to type something inside the password field
function OnPasswordKeyUp(event)
{
    CheckPasswordValid();
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
    CheckFirstNameValid();
    CheckLastNameValid();
    CheckEmailValid();
    CheckPhoneNumberValid();
    CheckPasswordValid();
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
    CheckPhoneNumberValid();
}


function CheckFirstNameValid()
{
    if(IsNameValid(NameElement_First.value))
    {
        NameElement_First.classList.remove(c_FormElementClass_Invalid);
        NameElement_First.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        NameElement_First.classList.remove(c_FormElementClass_Valid);
        NameElement_First.classList.add(c_FormElementClass_Invalid);
    }
}


function CheckLastNameValid()
{
    if(IsNameValid(NameElement_Last.value))
    {
        NameElement_Last.classList.remove(c_FormElementClass_Invalid);
        NameElement_Last.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        NameElement_Last.classList.remove(c_FormElementClass_Valid);
        NameElement_Last.classList.add(c_FormElementClass_Invalid);
    }
}


function CheckEmailValid()
{
    if(IsEmailValid(EmailElement.value))
    {
        EmailElement.classList.remove(c_FormElementClass_Invalid);
        EmailElement.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        EmailElement.classList.remove(c_FormElementClass_Valid);
        EmailElement.classList.add(c_FormElementClass_Invalid);
    }
}


function CheckPasswordValid()
{
    // password entry box
    if(IsPasswordValid(PasswordElement.value))
    {
        PasswordElement.classList.remove(c_FormElementClass_Invalid);
        PasswordElement.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        PasswordElement.classList.remove(c_FormElementClass_Valid);
        PasswordElement.classList.add(c_FormElementClass_Invalid);
    }

    // password syntax popup element:

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

    // validate special character
    if(DoesContainSpecialCharacter(PasswordElement.value))
    {
        PasswordSyntaxSpecialElement.classList.remove(c_FormElementClass_Invalid);
        PasswordSyntaxSpecialElement.classList.add(c_FormElementClass_Valid);
    }
    else
    {
        PasswordSyntaxSpecialElement.classList.remove(c_FormElementClass_Valid);
        PasswordSyntaxSpecialElement.classList.add(c_FormElementClass_Invalid);
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


function CheckPhoneNumberValid()
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


function DoesContainSpecialCharacter(string)
{
    const result = c_SpecialCharacters.split('').some(specialChar => {
        if (string.includes(specialChar)) {
          return true;
        }
    
        return false;
      });


    return result;
}


function IsMinimumLength(string)
{
    return string.length >= c_PasswordMinLength;
}


function IsNotEmpty(string)
{
    return string != null && string.trim().length;
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


function IsNameValid(string)
{
    return IsNotEmpty(string);
}


function IsEmailValid(string)
{
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


    return re.test(string);
}