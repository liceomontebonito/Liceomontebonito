/* ===== NAVIGATION.JS - SISTEMA DE NAVEGACIÓN ===== */

window.navigationSystem = {
    // Inicializar sistema de navegación
    init: function() {
        console.log('🧭 Sistema de navegación inicializado');
        
        this.setupMobileMenu();
        this.setupScrollProgress();
        this.updateActiveLinks();
        this.setupModuleNavigation();
    },

    // Configurar menú móvil
    setupMobileMenu: function() {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileBtn && navLinks) {
            mobileBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Cerrar menú al hacer clic en un enlace
            navLinks.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navLinks.classList.remove('active');
                }
            });

            // Cerrar menú al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!mobileBtn.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            });
        }
    },

    // Configurar barra de progreso de scroll
    setupScrollProgress: function() {
        const progressBar = document.querySelector('.progress-bar');
        const header = document.querySelector('.header');
        
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                
                progressBar.style.width = scrollPercent + '%';
                
                // Agregar clase 'scrolled' al header
                if (header) {
                    if (scrollTop > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                }
            });
        }
    },

    // Actualizar enlaces activos
    updateActiveLinks: function() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace('../', '').replace('./', ''))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    // Configurar navegación entre módulos
    setupModuleNavigation: function() {
        // Detectar módulo actual
        const currentPath = window.location.pathname;
        let currentModule = 0;
        
        if (currentPath.includes('dashboard')) {
            currentModule = 0;
        } else if (currentPath.includes('modulo1')) {
            currentModule = 1;
        } else if (currentPath.includes('modulo2')) {
            currentModule = 2;
        } else if (currentPath.includes('modulo3')) {
            currentModule = 3;
        } else if (currentPath.includes('modulo4')) {
            currentModule = 4;
        } else if (currentPath.includes('modulo5')) {
            currentModule = 5;
        }

        // Agregar navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.navigateToPreviousModule(currentModule);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.navigateToNextModule(currentModule);
                        break;
                    case 'h':
                    case 'H':
                        e.preventDefault();
                        this.navigateToHome();
                        break;
                }
            }
        });
    },

    // Navegar al módulo anterior
    navigateToPreviousModule: function(currentModule) {
        let targetUrl = '';
        
        switch(currentModule) {
            case 1:
                targetUrl = '../dashboard/index.html';
                break;
            case 2:
                targetUrl = '../modulo1/index.html';
                break;
            case 3:
                targetUrl = '../modulo2/index.html';
                break;
            case 4:
                targetUrl = '../modulo3/index.html';
                break;
            case 5:
                targetUrl = '../modulo4/index.html';
                break;
            default:
                return;
        }
        
        if (window.authSystem && window.authSystem.hasModuleAccess(currentModule - 1)) {
            window.location.href = targetUrl;
        }
    },

    // Navegar al siguiente módulo
    navigateToNextModule: function(currentModule) {
        let targetUrl = '';
        
        switch(currentModule) {
            case 0:
                targetUrl = '../modulo1/index.html';
                break;
            case 1:
                targetUrl = '../modulo2/index.html';
                break;
            case 2:
                targetUrl = '../modulo3/index.html';
                break;
            case 3:
                targetUrl = '../modulo4/index.html';
                break;
            case 4:
                targetUrl = '../modulo5/index.html';
                break;
            default:
                return;
        }
        
        if (window.authSystem && window.authSystem.hasModuleAccess(currentModule + 1)) {
            window.location.href = targetUrl;
        }
    },

    // Navegar al inicio
    navigateToHome: function() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/dashboard/') || currentPath.includes('/modulo')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    },

    // Generar breadcrumb
    generateBreadcrumb: function() {
        const currentPath = window.location.pathname;
        let breadcrumbHtml = '<a href="../index.html">Inicio</a>';
        
        if (currentPath.includes('dashboard')) {
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> Dashboard';
        } else if (currentPath.includes('modulo1')) {
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> <a href="../dashboard/index.html">Dashboard</a>';
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> Módulo 1';
        } else if (currentPath.includes('modulo2')) {
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> <a href="../dashboard/index.html">Dashboard</a>';
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> Módulo 2';
        } else if (currentPath.includes('modulo3')) {
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> <a href="../dashboard/index.html">Dashboard</a>';
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> Módulo 3';
        } else if (currentPath.includes('modulo4')) {
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> <a href="../dashboard/index.html">Dashboard</a>';
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> Módulo 4';
        } else if (currentPath.includes('modulo5')) {
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> <a href="../dashboard/index.html">Dashboard</a>';
            breadcrumbHtml += ' <span class="breadcrumb-separator">→</span> Módulo 5';
        }
        
        const breadcrumbElement = document.querySelector('.breadcrumb');
        if (breadcrumbElement) {
            breadcrumbElement.innerHTML = breadcrumbHtml;
        }
    },

    // Mostrar ayuda de navegación
    showNavigationHelp: function() {
        const helpText = `🧭 AYUDA DE NAVEGACIÓN:

⌨️ ATAJOS DE TECLADO:
• Ctrl + ← : Módulo anterior
• Ctrl + → : Siguiente módulo  
• Ctrl + H : Ir al inicio

🖱️ NAVEGACIÓN:
• Usa el menú superior para moverte entre secciones
• Los botones al final de cada módulo te llevan al siguiente
• El Dashboard muestra tu progreso general

📱 MÓVIL:
• Toca el botón ☰ para abrir el menú
• Desliza para hacer scroll
• Todos los módulos son responsive`;

        alert(helpText);
    }
};

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.navigationSystem.init();
    window.navigationSystem.generateBreadcrumb();
});

// Hacer funciones disponibles globalmente
window.showNavigationHelp = () => window.navigationSystem.showNavigationHelp();

console.log('✅ navigation.js cargado correctamente');
