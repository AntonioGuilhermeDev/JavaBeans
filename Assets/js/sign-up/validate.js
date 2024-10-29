const url = 'http://localhost:3000/users'

const createWarning = function (warningMessage) {
    let errorWarning = document.createElement('p');
    errorWarning.classList.add('error-warning');
    errorWarning.innerText = warningMessage;
    setTimeout(() => {
        errorWarning.remove();
    }, 3000);
    return errorWarning;
}

const clearWarnings = function () {
    const existingWarnings = document.querySelectorAll('.error-warning');
    existingWarnings.forEach(warning => warning.remove());  
}

const errorsWarningList = {
    "emptyFields": "Preencha todos os campos",
    "shortPassword": "A senha deve conter mais de 3 caracteres",
    "diferentPasswords": "As senhas não coincidem"
}

const validateFields = function (username, email,password,confirmPassword) {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    if (usernameValue === '' || emailValue === '' || passwordValue === '' || confirmPasswordValue === '') {
        return errorsWarningList.emptyFields;
    } else if (passwordValue.length <= 3) {
        return errorsWarningList.shortPassword;
    } else if (passwordValue != confirmPasswordValue){
        return errorsWarningList.diferentPasswords;
    }
    return null;
}

const addUser = function (user, email, password) {
    const newUser = {
        user: user,
        email: email,
        password: password,
        statement: false
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
}

export default{
    createWarning,
    clearWarnings,
    errorsWarningList,
    validateFields,
    addUser
}
