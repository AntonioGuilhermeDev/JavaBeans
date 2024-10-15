function mostraMenu () {
    let menuMobile = document.querySelector('.nav-mobile-menu'); // Seleciona a classe .nav-mobile-menu e atribui a menuMobile
    
    if (menuMobile.classList.contains('open')) { // Se a classe estiver com ".open" ( menu aberto) quando for clicada
        menuMobile.classList.remove('open');  // Remove open (fecha o menu)
        document.querySelector('.nav-mobile-icone-menu img').src = "Assets/images/navbar/menu_white_36dp.svg";
    } else { // Se não estiver aberto
        menuMobile.classList.add('open'); // Adiciona ".open" (abre o menu)
        document.querySelector('.nav-mobile-icone-menu img').src = "Assets/images/navbar/close_white_36dp.svg";
    }
}

window.mostraMenu = mostraMenu; // Torna a função visivel no escopo global