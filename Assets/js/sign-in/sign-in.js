const form = document.getElementById('sign-in-fields-form');
const user = document.getElementById('sign-in-user-field');
const password = document.getElementById('sign-in-password-field');

const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');


function openModal() {
    modal.style.display = 'flex'; 
}

function closeModal() {
    modal.style.display = 'none'; 
}

const createWarning = function (warningMessage) {
    let errorWarning = document.createElement('p');
    errorWarning.classList.add('error-warning'); 
    errorWarning.innerText = warningMessage;
    setTimeout(() => {
        errorWarning.remove(); 
    }, 3000);
    return errorWarning;
}

const validateFields = function(user, password) {
    if (user.trim() === '') {
        return 'O campo de usuário não pode estar vazio.';
    }
    if (password.trim() === '') {
        return 'O campo de senha não pode estar vazio.';
    }
    return null; 
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const existingWarnings = document.querySelectorAll('.error-warning');
    existingWarnings.forEach(warning => warning.remove());

    const validationError = validateFields(user.value, password.value);
    if (validationError) {
        const errorMessage = createWarning(validationError); 
        form.insertAdjacentElement('afterbegin', errorMessage); 
        return; 
    }

    signInUser(user.value, password.value);
});

const signInUser = function(user, password) {
    return isUserLogedIn(user).then(isLoggedIn => {
        if (isLoggedIn) {
            alert('Usuário já está logado.');
            window.location.href = 'index.html';
            return true; 
        }

        return getUserData(user).then(userData => {
            if (userData) {
                if (userData.password === password) { 
                    userData.statement = true; 

                    return fetch(`http://localhost:3000/users/${userData.id}`, { 
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userData)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao atualizar o usuário');
                        }
                        return response.json(); 
                    })
                    .then(updatedUser => {
                        openModal();
                        localStorage.setItem("loggedIn", 'true');
                        return true;
                    });
                } else {
                    const errorMessage = createWarning('Senha incorreta'); 
                    form.insertAdjacentElement('afterbegin', errorMessage); 
                    return false; 
                }
            } else {
                const errorMessage = createWarning('Usuário não encontrado'); 
                form.insertAdjacentElement('afterbegin', errorMessage); 
                return false; 
            }
        });
    }).catch(error => {
        console.error('Error:', error);
        const errorMessage = createWarning('Erro ao verificar o usuário'); 
        form.insertAdjacentElement('afterbegin', errorMessage); 
        return false; 
    });
}

const getUserData = function (user) {
    return fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            const userData = users.find(u => u.user === user);
            return userData || false; 
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
}

const isUserLogedIn = function (user) {
    return fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            const foundUser = users.find(u => u.user === user);
            return foundUser ? foundUser.statement : false;
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        });
}

function login() {
    localStorage.setItem("loggedIn", 'true');
    checkLoginStatus();
}

closeModalButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});