function mostraMenu () {
    let menuMobile = document.querySelector('.nav-mobile-menu'); 
    
    if (menuMobile.classList.contains('open')) { // Se a classe estiver com ".open" ( menu aberto) quando for clicada
        menuMobile.classList.remove('open');  
        document.querySelector('.nav-mobile-icone-menu img').src = "Assets/images/navbar/menu_white_36dp.svg";
    } else { // Se não estiver aberto
        menuMobile.classList.add('open'); 
        document.querySelector('.nav-mobile-icone-menu img').src = "Assets/images/navbar/close_white_36dp.svg";
    }
}

document.querySelectorAll('.nav-mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {  
        let menuMobile = document.querySelector('.nav-mobile-menu');  
        let menuIcon = document.querySelector('.nav-mobile-icone-menu img'); 
        let button = document.querySelector('.nav-mobile-icone-menu button');

        menuMobile.classList.remove('open'); 
        menuIcon.src = "Assets/images/navbar/menu_white_36dp.svg"; 
        button.setAttribute('aria-expanded', 'false'); // Define o atributo 'aria-expanded' do botão como 'false', indicando que o menu está fechado
    });
});

window.mostraMenu = mostraMenu; // Torna a função visivel no escopo global

// Função para mostrar/ocultar o dropdown
function toggleDropdown() {
    document.getElementById("loginDropdown").classList.toggle("show");
}

// Verificar se o usuário está logado
function checkLoginStatus() {
    let loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === 'true') { //Quando estiver logado
        document.getElementById("loginLink").style.display = "none";
        document.getElementById("registerLink").style.display = "none";
        document.getElementById("welcomeMessage").style.display = "block";
        document.getElementById("logoutLink").style.display = "block";
        document.getElementById("registerMessage").style.display = "none";
        document.getElementById("loginMessage").style.display = "none";
        document.getElementById("reservaLink").style.display = "block";
    } else { // Quando não estiver logado
        document.getElementById("loginLink").style.display = "block";
        document.getElementById("registerLink").style.display = "block";
        document.getElementById("welcomeMessage").style.display = "none";
        document.getElementById("logoutLink").style.display = "none";
        document.getElementById("registerMessage").style.display = "block";
        document.getElementById("loginMessage").style.display = "block";
        document.getElementById("reservaLink").style.display = "none";
    }
}

// Função para simular login
function login() {
    localStorage.setItem("loggedIn", 'true');
    checkLoginStatus();
}

// Função para logout
function logout() {
    localStorage.setItem("loggedIn", 'false');
    checkLoginStatus();
}

// Inicializar o estado de login ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    checkLoginStatus();
});

window.toggleDropdown = toggleDropdown;
window.checkLoginStatus = checkLoginStatus;
window.login = login;
window.logout = logout;
