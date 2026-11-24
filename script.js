document.addEventListener('DOMContentLoaded', () => {
   
    const proyectosData = [
        {
            titulo: 'Aplicacion Web - Aguapal',
            descripcion: 'Desarrolle Backend para Sistema de facturación - Servicio público. Implementé solucion para liquidacion, generacion de facturas, impresion de facturas, administracion y manejo de clientes.',
            tecnologias: ['Git', 'Java', 'Spring Boot', 'PostgreSQL', 'MVC']
        },

    ];

    const colaboracionesData = [
        {
            titulo: 'Aplicativo Web gestion de nomina - KontAgro2.0',
            descripcion: 'Implementación de funcionalidades para la persistencia de datos de nómina y reportes en el sistema web para gestión agrícola.',
            tecnologias: ['Git', 'Java', 'Spring Boot', 'PostgreSQL', 'MVC']
        },
        {
            titulo: 'Ecommerce - Raices del valle',
            descripcion: 'Colaboración en el desarrollo de interfaz grafica de las secciones Catalogo, productos, carrito de compras y Navbar, funcionalidades para la gestión de  de productos y seguridad de la aplicacion con JWT.',
            tecnologias: ['Git', 'HTML', 'CSS', 'JavaScript', 'Java', 'Spring Boot', 'MySQL', 'MVC']
        },

    ];

    const trayectoriaData = [
        {
            periodo: '2026 - Actualidad',
            cargo: 'Proyectos de Software independientes',
            descripcion: 'Diseño y construcción de software web estructurados para soluciones a problemas específicos, aplicando buenas prácticas de desarrollo y metodologías ágiles para garantizar la calidad y eficiencia del producto final.'
        },
        {
            periodo: '2025 - 2026',
            cargo: 'Asistente de proyectos.',
            descripcion: '●	Participé activamente en la coordinación y requerimientos de los proyectos desarrollados por la compañía, ●	Gestioné la comunicación, seguimiento y requerimientos para más de 10 clientes activos del área de telecomunicaciones.'
        },

        {
            periodo: '2024 - 2025',
            cargo: 'Asistente de proyectos.',
            descripcion: '●	Participé activamente en la coordinación y requerimientos de los proyectos desarrollados por la compañía, ●	Gestioné la comunicación.'
        },
        {
            periodo: '2023 - 2024',
            cargo: 'Analista de proyecto.',
            descripcion: '● Lideré el levantamiento técnico de los proyectos de telecomunicaciones, logrando un 100% de aceptabilidad y confianza en los resultados.● Elaboré informes de seguimiento y ejecución para soportes administrativos y facturación.●	Coordiné las liquidaciones de proyectos para la facturación de OC.'

        }
    ];

   
    function renderCards(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = items.map(item => `
            <article class="project-card">
                <div>
                    <h3 class="mb-2">${item.titulo}</h3>
                    <p class="small text-muted mb-3">${item.descripcion}</p>
                </div>
                <div class="d-flex flex-wrap gap-1">
                    ${item.tecnologias.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
            </article>
        `).join('');
    }

    function renderTimeline(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = items.map(item => `
            <div class="timeline-item">
                <span class="timeline-year">${item.periodo}</span>
                <h4 class="h6 fw-bold text-dark mb-1">${item.cargo}</h4>
                <p class="small text-muted mb-0">${item.descripcion}</p>
            </div>
        `).join('');
    }

    renderCards('projects-track', proyectosData);
    renderCards('collabs-track', colaboracionesData);
    renderTimeline('timeline-track', trayectoriaData);


    // NAVEGACIÓN, SINCRONIZACIÓN Y AUTO-SCROLL
    const dialButtons = document.querySelectorAll('.dial-btn');
    const legendItems = document.querySelectorAll('.legend-item');
    const sections = document.querySelectorAll('.content-section');
    const windowTitle = document.getElementById('window-title');
    const windowIcon = document.getElementById('window-icon');
    const dialArrow = document.getElementById('dial-arrow');
    const contenedor5 = document.getElementById('contenedor-5');

    const windowIcons = {
        'view-quien-soy': 'bi-person-badge',
        'view-proyectos': 'bi-code-slash',
        'view-colaboraciones': 'bi-people',
        'view-trayectoria': 'bi-briefcase',
        'view-proyecto-vida': 'bi-compass',
        'view-contactame': 'bi-envelope'
    };

    let baseAngle = -120;
    let hoverSpin = 0;
    let hoverAnimationId = null;
    let lastHoverTime = null;
    const hoverSpinSpeedDegPerSec = 360; 

    if (dialArrow) {
        dialArrow.style.setProperty('--base-angle', `${baseAngle}deg`);
        dialArrow.style.setProperty('--hover-spin', '0deg');
    }

    function stepHoverSpin(now) {
        if (!dialArrow || lastHoverTime === null) return;
        const deltaSeconds = (now - lastHoverTime) / 1000;
        lastHoverTime = now;

        hoverSpin += hoverSpinSpeedDegPerSec * deltaSeconds;
        dialArrow.style.setProperty('--hover-spin', `${hoverSpin}deg`);

        hoverAnimationId = requestAnimationFrame(stepHoverSpin);
    }

    function startHoverSpin() {
        if (!dialArrow || hoverAnimationId !== null) return;
        dialArrow.classList.add('is-hovering');
        lastHoverTime = performance.now();
        hoverAnimationId = requestAnimationFrame(stepHoverSpin);
    }

    function stopHoverSpin() {
        if (!dialArrow) return;

        if (hoverAnimationId !== null) {
            cancelAnimationFrame(hoverAnimationId);
            hoverAnimationId = null;
        }
        lastHoverTime = null;
        dialArrow.classList.remove('is-hovering');

        
        hoverSpin = 0;
        dialArrow.style.setProperty('--hover-spin', '0deg');
    }

    if (dialArrow) {
        dialArrow.addEventListener('pointerenter', startHoverSpin);
        dialArrow.addEventListener('pointerleave', stopHoverSpin);
    }

    function activarSeccion(targetId, titleText, angleDeg, shouldScroll = true) {
        
        windowTitle.textContent = titleText;
        if (windowIcon && windowIcons[targetId]) {
            windowIcon.className = `bi ${windowIcons[targetId]} window-title-icon`;
        }

        
        baseAngle = Number(angleDeg);
        if (dialArrow) {
            dialArrow.style.setProperty('--base-angle', `${baseAngle}deg`);
        }

       
        dialButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.target === targetId);
        });

        
        legendItems.forEach(item => {
            item.classList.toggle('active', item.dataset.target === targetId);
        });

        sections.forEach(sec => {
            sec.classList.toggle('active', sec.id === targetId);
        });

        
        if (shouldScroll && contenedor5) {
            contenedor5.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Eventos para botones del círculo
    dialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activarSeccion(btn.dataset.target, btn.dataset.title, btn.dataset.angle, true);
        });
    });

   
    legendItems.forEach(item => {
        item.addEventListener('click', () => {
            activarSeccion(item.dataset.target, item.dataset.title, item.dataset.angle, true);
        });
    });


   
    function setupHorizontalScroll(prevBtnId, nextBtnId, trackId, scrollAmount) {
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const track = document.getElementById(trackId);

        if (prevBtn && nextBtn && track) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    }

    setupHorizontalScroll('prev-project', 'next-project', 'projects-track', 320);
    setupHorizontalScroll('prev-collab', 'next-collab', 'collabs-track', 320);
    setupHorizontalScroll('prev-timeline', 'next-timeline', 'timeline-track', 280);

    
    // FORMULARIO DE CONTACTO    
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('sender-email').value.trim();
            const message = document.getElementById('sender-message').value.trim();

            if (email && message) {
                
                formFeedback.textContent = '¡Mensaje preparado correctamente! Gracias por contactar.';
                contactForm.reset();

                setTimeout(() => {
                    formFeedback.textContent = '';
                }, 4000);
            }
        });
    }
});