const form = document.getElementById('sign-in-fields-form');
const user = document.getElementById('sign-in-user-field');
const password = document.getElementById('sign-in-password-field');

// Função para criar e exibir uma mensagem de erro
const createWarning = function (warningMessage) {
    let errorWarning = document.createElement('p');
    errorWarning.classList.add('error-warning'); // Adicione uma classe para estilo
    errorWarning.innerText = warningMessage;
    setTimeout(() => {
        errorWarning.remove(); // Remover após 3 segundos
    }, 3000);
    return errorWarning;
}

// Função para validar se os campos estão preenchidos
const validateFields = function(user, password) {
    if (user.trim() === '') {
        return 'O campo de usuário não pode estar vazio.';
    }
    if (password.trim() === '') {
        return 'O campo de senha não pode estar vazio.';
    }
    return null; // Nenhum erro
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Limpa mensagens de erro existentes
    const existingWarnings = document.querySelectorAll('.error-warning');
    existingWarnings.forEach(warning => warning.remove());

    // Validar campos antes de prosseguir
    const validationError = validateFields(user.value, password.value);
    if (validationError) {
        const errorMessage = createWarning(validationError); // Cria a mensagem de erro
        form.insertAdjacentElement('afterbegin', errorMessage); // Insere a mensagem no formulário
        return; // Interromper a execução se houver erro
    }

    // Prosseguir com a tentativa de login
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
                        alert('Usuário logado');
                        localStorage.setItem("loggedIn", 'true');
                        window.location.href = 'index.html';
                        return true;
                    });
                } else {
                    const errorMessage = createWarning('Senha incorreta'); // Usar a nova função
                    form.insertAdjacentElement('afterbegin', errorMessage); // Insere a mensagem no formulário
                    return false; 
                }
            } else {
                const errorMessage = createWarning('Usuário não encontrado'); // Usar a nova função
                form.insertAdjacentElement('afterbegin', errorMessage); // Insere a mensagem no formulário
                return false; 
            }
        });
    }).catch(error => {
        console.error('Error:', error);
        const errorMessage = createWarning('Erro ao verificar o usuário'); // Usar a nova função
        form.insertAdjacentElement('afterbegin', errorMessage); // Insere a mensagem no formulário
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