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

document.querySelectorAll('.nav-mobile-menu .nav-link').forEach(link => { // Seleciona todos os links dentro do menu mobile com a classe 'nav-link'
    link.addEventListener('click', () => {  // Adiciona um ouvinte de evento 'click' a cada link
        let menuMobile = document.querySelector('.nav-mobile-menu');  // Seleciona o menu mobile
        let menuIcon = document.querySelector('.nav-mobile-icone-menu img'); // Seleciona o ícone do menu (imagem) no cabeçalho
        let button = document.querySelector('.nav-mobile-icone-menu button'); // Seleciona o botão que abre e fecha o menu

        menuMobile.classList.remove('open'); // Remove a classe 'open' do menu para fechá-lo
        menuIcon.src = "Assets/images/navbar/menu_white_36dp.svg"; // Troca o icone de aberto do menu para o icone normal
        button.setAttribute('aria-expanded', 'false'); // Define o atributo 'aria-expanded' do botão como 'false', indicando que o menu está fechado
    });
});

window.mostraMenu = mostraMenu; // Torna a função visivel no escopo global