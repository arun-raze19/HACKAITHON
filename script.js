document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.9)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.8)';
    }
});

window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        element.style.backgroundPositionY = rate + 'px';
    });
});

function createGlitter() {
    const container = document.querySelector('body');
    for (let i = 0; i < 50; i++) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';
        glitter.style.left = Math.random() * 100 + 'vw';
        glitter.style.animationDelay = Math.random() * 5 + 's';
        glitter.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(glitter);
    }
}

createGlitter();

const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    createParticleTrail(e.clientX, e.clientY);
});

function createParticleTrail(x, y) {
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${Math.floor(Math.random() * 3) + 1}`;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

const backgroundParticles = document.createElement('div');
backgroundParticles.className = 'background-particles';
document.body.appendChild(backgroundParticles);

function createBackgroundParticles() {
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${Math.floor(Math.random() * 3) + 1}`;
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        backgroundParticles.appendChild(particle);
    }
}

createBackgroundParticles();

window.addEventListener('scroll', () => {
    const particles = document.querySelectorAll('.background-particles .particle');
    particles.forEach(particle => {
        const scrollY = window.scrollY;
        const speed = 0.5;
        particle.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.background-particles .particle');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - particleX;
        const distanceY = mouseY - particleY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 200) {
            const moveX = (distanceX / distance) * 10;
            const moveY = (distanceY / distance) * 10;
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

document.addEventListener('mousemove', (e) => {
    const content = document.querySelector('.content');
    const cards = document.querySelectorAll('.event-card');
    const aiElements = document.querySelectorAll('.ai-elements i');
    const headings = document.querySelectorAll('h1, h2, h3');
    
    const mouseX = (e.clientX - window.innerWidth / 2) / 50;
    const mouseY = (e.clientY - window.innerHeight / 2) / 50;
    
    content.style.transform = `translate(-50%, -50%) rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
    
    headings.forEach(heading => {
        const depth = heading.tagName === 'H1' ? 30 : heading.tagName === 'H2' ? 20 : 15;
        heading.style.transform = `translateZ(${depth}px) rotateX(${-mouseY/2}deg) rotateY(${mouseX/2}deg)`;
    });
    
    cards.forEach((card, index) => {
        const delay = index * 0.1;
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        const relativeX = (e.clientX - cardCenterX) / 50;
        const relativeY = (e.clientY - cardCenterY) / 50;
        
        card.style.transform = `
            rotateX(${-relativeY}deg) 
            rotateY(${relativeX}deg) 
            translateZ(${mouseY * 2}px)
        `;
        card.style.transition = `transform ${0.5 + delay}s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
        
        if (card.matches(':hover')) {
            createRippleEffect(card, e);
        }
    });
    
    aiElements.forEach((element, index) => {
        const delay = index * 0.1;
        element.style.transform = `
            rotateX(${-mouseY}deg) 
            rotateY(${mouseX}deg) 
            translateZ(${mouseY * 3}px)
            scale(${1 + Math.abs(mouseY) * 0.1})
        `;
        element.style.transition = `transform ${0.3 + delay}s ease-out`;
        
        element.style.textShadow = `
            0 0 ${10 + Math.abs(mouseY) * 5}px rgba(169, 196, 108, 0.5),
            0 0 ${20 + Math.abs(mouseY) * 10}px rgba(169, 196, 108, 0.3)
        `;
    });
});

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

document.querySelectorAll('.event-card, .ai-elements i, .nav-links li a').forEach(element => {
    element.addEventListener('click', (e) => {
        createRippleEffect(element, e);
        createParticleBurst(e.clientX, e.clientY);
    });
});

function createParticleBurst(x, y) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${Math.floor(Math.random() * 3) + 1}`;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const velocity = Math.random() * 5 + 2;
        const distance = Math.random() * 100 + 50;
        
        particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

document.addEventListener('mouseleave', () => {
    const content = document.querySelector('.content');
    const cards = document.querySelectorAll('.event-card');
    const aiElements = document.querySelectorAll('.ai-elements i');
    const headings = document.querySelectorAll('h1, h2, h3');
    
    content.style.transform = 'translate(-50%, -50%)';
    cards.forEach(card => {
        card.style.transform = 'none';
    });
    aiElements.forEach(element => {
        element.style.transform = 'none';
        element.style.textShadow = '0 0 15px rgba(169, 196, 108, 0.5)';
    });
    headings.forEach(heading => {
        heading.style.transform = 'none';
    });
});

function createParticles() {
    const floatingAi = document.querySelector('.floating-ai');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'ai-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.transform = `translateZ(${Math.random() * 50}px)`;
        
        particle.addEventListener('mousemove', (e) => {
            const rect = particle.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            particle.style.transform = `
                translateZ(50px) 
                scale(2) 
                rotateX(${y - rect.height/2}deg) 
                rotateY(${x - rect.width/2}deg)
            `;
            particle.style.boxShadow = `
                0 0 20px #A9C46C,
                0 0 40px rgba(169, 196, 108, 0.5)
            `;
            
            createParticleTrail(e.clientX, e.clientY);
        });
        
        particle.addEventListener('mouseleave', () => {
            particle.style.transform = `translateZ(${Math.random() * 50}px)`;
            particle.style.boxShadow = '0 0 10px #A9C46C';
        });
        
        floatingAi.appendChild(particle);
    }
}

createParticles();

const eventCards = document.querySelectorAll('.event-card');
eventCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const eventButtons = document.querySelectorAll('.event-btn');
    
    eventButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            const href = this.getAttribute('href');
            
            if (href) {
                window.location.href = href;
            }
        });
    });

    const closeButtons = document.querySelectorAll('.close-popup');
    console.log('Found close buttons:', closeButtons.length);
    
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', function(event) {
            console.log('Close button clicked');
            const popup = this.closest('.event-popup');
            if (popup) {
                popup.classList.remove('active');
                document.body.style.overflow = '';
                
                if (typeof createParticleBurst === 'function') {
                    createParticleBurst(
                        this.getBoundingClientRect().left + this.offsetWidth / 2,
                        this.getBoundingClientRect().top + this.offsetHeight / 2
                    );
                }
            }
        });
    });

    const popups = document.querySelectorAll('.event-popup');
    console.log('Found popups:', popups.length);
    
    popups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                console.log('Clicked outside popup');
                this.classList.remove('active');
                document.body.style.overflow = '';
                
                if (typeof createParticleBurst === 'function') {
                    createParticleBurst(e.clientX, e.clientY);
                }
            }
        });
    });
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});