const url = 'http://localhost:3000/users';

const createWarning = function (warningMessage) {
    let errorWarning = document.createElement('p');
    errorWarning.classList.add('error-warning');
    errorWarning.innerText = warningMessage;
    setTimeout(() => {
        errorWarning.remove();
    }, 3000);
    return errorWarning;
};

const clearWarnings = function () {
    const existingWarnings = document.querySelectorAll('.error-warning');
    existingWarnings.forEach(warning => warning.remove());
};

const errorsWarningList = {
    "emptyFields": "Preencha todos os campos",
    "shortPassword": "A senha deve conter mais de 3 caracteres",
    "diferentPasswords": "As senhas não coincidem",
    "userExists": "Usuário já registrado",
    "invalidEmail": "O email deve conter '@' e um domínio válido"
};

const validateEmail = function (emailValue) {
    // Expressão regular para validar o formato do email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailValue);
};

const validateFields = function (username, email, password, confirmPassword) {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    if (usernameValue === '' || emailValue === '' || passwordValue === '' || confirmPasswordValue === '') {
        return Promise.resolve(errorsWarningList.emptyFields);
    } else if (passwordValue.length <= 3) {
        return Promise.resolve(errorsWarningList.shortPassword);
    } else if (passwordValue !== confirmPasswordValue) {
        return Promise.resolve(errorsWarningList.diferentPasswords);
    } else if (!validateEmail(emailValue)) {
        return Promise.resolve(errorsWarningList.invalidEmail); 
    }

    return checkUserExists(username, email).then(exist => {
        if (exist) {
            return errorsWarningList.userExists;
        } else {
            return null;
        }
    });
};

const checkUserExists = function (username, email) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            return users.some(user => user.user === username || user.email === email);
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
};

const addUser = function (username, email, password) {
    checkUserExists(username, email).then(exists => {
        if (exists) {
            const errorMessage = createWarning(errorsWarningList.userExists);
            document.querySelector('form').insertAdjacentElement('afterbegin', errorMessage);
            return;
        } else {
            const newUser = {
                user: username,
                email: email,
                password: password,
                statement: false
            };

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
                .catch(error => {
                    console.error('Error:', error);
                    const errorMessage = createWarning("Erro ao processar o cadastro.");
                    document.querySelector('form').insertAdjacentElement('afterbegin', errorMessage);
                });
        }
    });
};

export default {
    createWarning,
    clearWarnings,
    errorsWarningList,
    validateFields,
    addUser
};

