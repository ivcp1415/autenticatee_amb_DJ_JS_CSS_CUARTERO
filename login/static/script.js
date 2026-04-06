/* CONSTANT DECLARATION */
const usrLog = document.getElementById('userLogin');
if (usrLog) {
    // element inputs
    const emailInput = usrLog.elements["email"];
    const passwordInput = usrLog.elements["password"];

    /* Event Listener */
    emailInput.addEventListener('blur', () =>{validateEmail(emailInput.value)});
    passwordInput.addEventListener('blur', ()=>{validatePassword(passwordInput.value)});

    // when user writes login, check for rules with .test()
// rules to add
    /*
        1. input contains text, @, domain and extension (hola@hola.cat)
        2. password: 8 <= characters <= 16, contains special character, at least an uppercase letter
        and a digit. (hola!Char12)
     */
    usrLog.addEventListener('submit', (event)=>{

        // element values to be used across blur
        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;

        // re-validate mail password
        const isEmailValid = validateEmail(emailValue);
        const isPswdValid = validatePassword(passwordValue);

        if (!(isPswdValid && isEmailValid)) {
            alert('Error: revisa el formulari');
            // prevent send to backend if some error appears
            event.preventDefault();
        }
    });

}

const usrPost = document.getElementById('userPost');
if (usrPost) {

    const emailPostInput = document.getElementById('id_email');
    const passwordPostInput = document.getElementById('id_password');
    // get also tlf, codi postal, DNI, data naixement
    const tlfInput = document.getElementById('id_tlf');
    const codiInput = document.getElementById('id_codi')
    const idInput = document.getElementById('id_dni');
    const birthInput = document.getElementById('id_data_naixement');

    emailPostInput.addEventListener('blur', () =>{validateEmail(emailPostInput.value)});
    passwordPostInput.addEventListener('blur', () =>{validatePassword(passwordPostInput.value)});
    tlfInput.addEventListener('blur', ()=>{validateTlf(tlfInput.value)});
    codiInput.addEventListener('blur', ()=>{validateCodi(codiInput.value)});
    idInput.addEventListener('blur', ()=>{validateID(idInput.value)});
    birthInput.addEventListener('blur', ()=>{validateBirthDate(birthInput.value)});

    // form post validation
    usrPost.addEventListener('submit', (event)=>{
        //
        const emailValue = emailPostInput.value;
        const passwordValue = passwordPostInput.value;
        const tlfValue = tlfInput.value;
        const codiValue = codiInput.value;
        const idValue = idInput.value;
        const birthValue = birthInput.value;

        const isEmailValid = validateEmail(emailValue);
        const isPswdValid = validatePassword(passwordValue);
        const isTlfValid = validateTlf(tlfValue);
        const isCodiValid = validateCodi(codiValue);
        const isIDValid = validateID(idValue);
        const isBirthdateValid = validateBirthDate(birthValue);

        if (!(isEmailValid && isPswdValid && isTlfValid
            && isCodiValid && isIDValid && isBirthdateValid)) {
            alert('Error: revisa el formulari');
            // prevent send to backend if some error appears
            event.preventDefault();
        }
    })
}

/*
    Rule: maximum 9 digits, and starts with 6,7,8 or 9
    /^[6-9]\d{8}$/
 */
const validateTlf = (value) => {
    const pattern = /^[6-9]\d{8}$/

    if (pattern.test(value)) {
        document.getElementById('id_tlf-error').textContent = '';
        return true;
    } else {
        document.getElementById('id_tlf-error').textContent = `El número de teléfon ha de començar per 6,7,8 o 9 i tenir com a màxim 9 dígits`;
        return false;
    }
}

/*
    Rule: 5 digits
    /^\d{5}$/
 */
const validateCodi = (value) => {
    const pattern = /^\d{5}$/

    if (pattern.test(value)) {
        document.getElementById('id_codi-error').textContent = '';
        return true;
    } else {
        document.getElementById('id_codi-error').textContent = `El codi postal ha de tenir 5 dígits`;
        return false;
    }
}

/*
    Rule:
        NIE? Starts with X or Z and is followed by 7 digits and a letter
        /^[XZ]\d{7}[A-Z]$/i
        DNI? 8 digits and last char is a letter
        /^\d{8}[A-Z]$/i
        Passport? 3 letters followed by 6 digits
        /^[A-Z]{3}\d{6}$/i
 */
const validateID = (value) => {
    const selectOption = document.getElementById('docType');
    let pattern;
    let msg;

    switch(selectOption.value) {
        case 'DNI':
            pattern =/^\d{8}[A-Z]$/i;
            msg = 'El DNI ha de tenir 8 números i 1 lletra final.';
            break;
        case 'NIE':
            pattern = /^[XZ]\d{7}[A-Z]$/i;
            msg = 'El NIE ha de començar per X o Z, 7 números i 1 lletra.';
            break;
        case 'Passport':
            pattern = /^[A-Z]{3}\d{6}$/i;
            msg = 'El Passaport ha de tenir 3 lletres i 6 números.';
            break;
    }

    if (pattern.test(value)) {
        document.getElementById('id_dni-error').textContent = '';
        return true;
    } else {
        document.getElementById('id_dni-error').textContent = msg;
        return false;
    }
}

/*
    Rule: format is dd/mm/yyyy
    /^([1-9]|0[1-9]|[12][0-9]|3[01])\/([1-9]|0[1-9]|1[0-2])\/(19|20)\d{2}$/
 */
const validateBirthDate = (value) => {
    const pattern = /^([1-9]|0[1-9]|[12][0-9]|3[01])\/([1-9]|0[1-9]|1[0-2])\/(19|20)\d{2}$/

    if (pattern.test(value)) {
        document.getElementById('id_data_naixement-error').textContent = '';
        return true;
    } else {
        document.getElementById('id_data_naixement-error').textContent = `El format és dd/mm/yyyy`;
        return false;
    }
}

function validateEmail(email) {
    // ^ and $ enclosing the expression ensures the whole string is an email and not just part of it
    // [a-zA-Z0-9._%+-]+ permit the use of characters a-z, A-Z, 0-9, '.', '_', '%', '+'... at least one time
    // [a-zA-Z0-9.-]+  the specified characters must be used at least one time
    // after the . [a-zA-Z] at least two times (interval of apparitions)
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (pattern.test(email)) {
        // here goes the span in which errors are displayed
        document.getElementById('id_email-error').textContent = '';
        return true;
    } else {
        document.getElementById('id_email-error').textContent = `
            Ha de contenir al menys un '@', un domini i una extensió separats per '.' 
        `;
        return false;
    }
}

function validatePassword(password) {
    /*
    *  must contain at least 8 characters and a maximum of 16. It must contain at least a special
    *  character, such as ('!', '?', '%'...) and at least an uppercase letter and a digit
     */
    // ?.= lookahead for a pattern. if present skip, if not reject the whole string. instead of consuming
    // the pattern in a specified order, check if present notwithstanding the order.
    // .* skip over zero or more characters until you find an apparition inside the range
    // [A-Z], \d (digits), and special characters
    // .{8,16} make the string between 8 and 16 characters long.
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

    console.log(password);

    if (pattern.test(password)) {
        // here goes the span in which errors are displayed
        document.getElementById('id_password-error').textContent = '';
        return true;
    } else {
        document.getElementById('id_password-error').textContent = `
            Has d'introduir una contrasenya amb entre 8 i 16 caràcters 
            i que contingui algún caràcter especial, almenys una lletra majúscula i un digit 
        `;
        return false;
    }
}


