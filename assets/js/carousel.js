// Variables para el carrusel
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;
const slidesContainer = document.querySelector('.carousel-slides');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const indicators = document.querySelectorAll('.indicator');

// Función para actualizar el carrusel
function updateCarousel() {
    // Actualizar posición de las diapositivas
    slidesContainer.style.transform = `translateX(-${currentSlide * 33.333}%)`;
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Función para ir a la siguiente diapositiva
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// Función para ir a la diapositiva anterior
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Event listeners para los botones
prevButton.addEventListener('click', () => {
    prevSlide();
    // Reiniciar la animación automática
    slidesContainer.style.animation = 'none';
    slidesContainer.offsetHeight; // Forzar reflow
    slidesContainer.style.animation = null;
});

nextButton.addEventListener('click', () => {
    nextSlide();
    // Reiniciar la animación automática
    slidesContainer.style.animation = 'none';
    slidesContainer.offsetHeight; // Forzar reflow
    slidesContainer.style.animation = null;
});

// Event listeners para los indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
        // Reiniciar la animación automática
        slidesContainer.style.animation = 'none';
        slidesContainer.offsetHeight; // Forzar reflow
        slidesContainer.style.animation = null;
    });
});

// Pausar la animación automática al hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    slidesContainer.style.animationPlayState = 'paused';
});

carouselContainer.addEventListener('mouseleave', () => {
    slidesContainer.style.animationPlayState = 'running';
}); 