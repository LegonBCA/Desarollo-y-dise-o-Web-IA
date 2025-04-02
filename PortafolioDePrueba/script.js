// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Optimizar el movimiento del cursor usando requestAnimationFrame
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

function updateCursor() {
    // Suavizar el movimiento del cursor principal
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Suavizar el movimiento del cursor seguidor
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

updateCursor();

// Efecto hover en elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .education-item, .contact-item');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Navbar scroll effect con debounce
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Efecto de escritura optimizado
const texts = [
    'Desarrollador Full Stack',
    'Ingeniero Informático',
    'Arquitecto de Software',
    'Especialista en Cloud'
];
let textIndex = 0;
let charIndex = 0;
const typingText = document.querySelector('.typing-text');
let typingTimeout;

function type() {
    if (charIndex < texts[textIndex].length) {
        typingText.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        typingTimeout = setTimeout(type, 100);
    } else {
        typingTimeout = setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        typingTimeout = setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        typingTimeout = setTimeout(type, 500);
    }
}

// Iniciar el efecto de escritura
type();

// Limpiar el timeout cuando la página se desmonta
window.addEventListener('beforeunload', () => {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
});

// Animación de barras de habilidades optimizada
const skillBars = document.querySelectorAll('.skill-progress');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
            observer.unobserve(progressBar);
        }
    });
}, observerOptions);

skillBars.forEach(bar => observer.observe(bar));

// Contador de estadísticas optimizado
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const increment = target / 50;
            
            const updateStat = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.round(current);
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateStat();
            statsObserver.unobserve(stat);
        }
    });
}, observerOptions);

stats.forEach(stat => statsObserver.observe(stat));

// Inicializar AOS (Animate On Scroll) con configuración optimizada
AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    disable: 'mobile',
    startEvent: 'load'
});

// Configuración de partículas optimizada
particlesJS('particles-js', {
    particles: {
        number: {
            value: 50, // Reducido para mejor rendimiento
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#8A2BE2'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#8A2BE2',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 4, // Reducido para mejor rendimiento
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Formulario de contacto con validación básica
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validación básica
    const formData = new FormData(contactForm);
    let isValid = true;
    
    for (const [key, value] of formData.entries()) {
        if (!value.trim()) {
            isValid = false;
            const input = contactForm.querySelector(`[name="${key}"]`);
            input.classList.add('error');
        }
    }
    
    if (isValid) {
        // Aquí puedes agregar la lógica para enviar el formulario
        alert('Mensaje enviado con éxito!');
        contactForm.reset();
    } else {
        alert('Por favor, complete todos los campos requeridos.');
    }
});

// Limpiar clases de error al escribir
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('error');
    });
});

// Cambio de tema optimizado
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
} 