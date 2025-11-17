// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll Down - Hide navbar
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll Up - Show navbar
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== ACTIVE MENU LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== EMAILJS CONFIGURATION =====
(function() {
    emailjs.init("TU_PUBLIC_KEY"); // Reemplazar con tu clave pública
})();

// ===== FORM VALIDATION & EMAIL SENDING =====
const form = document.getElementById('contact-form');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Cambiar botón a estado de carga
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Enviar email usando EmailJS
        emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', form)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Mensaje de éxito
                submitBtn.textContent = '✓ Enviado';
                submitBtn.style.background = '#10b981';
                
                // Mostrar alerta de éxito
                alert('¡Mensaje enviado exitosamente! Te contactaré pronto.');
                
                // Resetear formulario
                form.reset();
                
                // Restaurar botón después de 3 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                }, 3000);
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // Mensaje de error
                submitBtn.textContent = '✗ Error';
                submitBtn.style.background = '#ef4444';
                
                alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo o contáctame directamente por email: cesardiazq10@gmail.com');
                
                // Restaurar botón después de 3 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                }, 3000);
            });
    });
}

// ===== ANIMATE ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que queremos animar
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.habilidad-card, .proyecto-card, .stat-item, .info-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== TYPING EFFECT FOR HERO =====
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Iniciar después de que cargue la página
    setTimeout(typeWriter, 1000);
}

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isPercentage = target > 90;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
    }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            // Solo animar si no tiene el atributo data-no-animate
            if (!h3.hasAttribute('data-no-animate')) {
                const value = parseInt(h3.textContent);
                if (!isNaN(value)) {
                    animateCounter(h3, value);
                }
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statObserver.observe(stat);
});

// ===== MOBILE MENU TOGGLE (preparado para futuro menú hamburguesa) =====
const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuButton) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-to-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.opacity = '1';
    } else {
        scrollButton.style.opacity = '0';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollButton.addEventListener('mouseenter', () => {
    scrollButton.style.transform = 'scale(1.1)';
});

scrollButton.addEventListener('mouseleave', () => {
    scrollButton.style.transform = 'scale(1)';
});

console.log('🚀 Portfolio cargado exitosamente');
