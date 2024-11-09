import signUpValidate from './validate.js';
import { signUpForm, username, email, password, confirmPassword, modal, confimButton } from './selectors.js';

modal.addEventListener('cancel', (event) => {
    event.preventDefault();
});

signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    signUpValidate.clearWarnings();

    signUpValidate.validateFields(username, email, password, confirmPassword)
        .then((error) => {
            if (error) {
                const errorMessage = signUpValidate.createWarning(error);
                signUpForm.insertAdjacentElement('afterbegin', errorMessage);
            } else {
                signUpValidate.addUser(username.value, email.value, password.value);
                modal.showModal();
            }
        })
        .catch(error => {
            console.error('Erro durante a validação:', error);
            const errorMessage = signUpValidate.createWarning("Erro ao processar o cadastro.");
            signUpForm.insertAdjacentElement('afterbegin', errorMessage);
        });
});

confimButton.onclick = function(){
    modal.close()
    window.location.href = "index.html";
}