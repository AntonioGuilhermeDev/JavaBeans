const form = document.getElementById('sign-in-fields-form')
const user = document.getElementById('sign-in-user-field')
const password = document.getElementById('sign-in-password-field')

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    signInUser(user.value, password.value)
    alert('oi')
})

const signInUser = function (user, password) {
    return isUserLogedIn(user).then(isLoggedIn => {
        if (isLoggedIn) {
            window.location.href = 'index.html'
            alert('Usuário já está logado.');
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
                            window.location.href = 'index.html'
                            alert('Usuário logado');
                            return true
                        });
                } else {
                    alert('Senha incorreta');
                    return false; 
                }
            } else {
                alert('Usuário não encontrado');
                return false; 
            }
        });
    }).catch(error => {
        console.error('Error:', error);
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