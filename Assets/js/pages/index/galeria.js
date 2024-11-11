var swiper = new Swiper(".swiper", {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    keyboard: true,
    autoplay: {
        delay: 3000, // Tempo em milissegundos entre os slides (3 segundos neste caso)
        disableOnInteraction: false, // Continua a passagem automática mesmo após a interação
    },
});