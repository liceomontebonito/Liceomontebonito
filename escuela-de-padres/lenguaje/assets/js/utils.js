/* ===== UTILS.JS - FUNCIONES UTILITARIAS ===== */

window.utils = {
    // Mostrar/ocultar elementos
    show: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = 'block';
            element.classList.remove('hidden');
        }
    },

    hide: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = 'none';
            element.classList.add('hidden');
        }
    },

    toggle: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            if (element.style.display === 'none' || element.classList.contains('hidden')) {
                this.show(elementId);
            } else {
                this.hide(elementId);
            }
        }
    },

    // Scroll suave
    scrollTo: function(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (element) {
            const top = element.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    },

    // Formatear fecha
    formatDate: function(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Formatear tiempo
    formatTime: function(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Generar ID único
    generateId: function() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    },

    // Validar email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Guardar en localStorage
    saveData: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error guardando datos:', e);
            return false;
        }
    },

    // Cargar de localStorage
    loadData: function(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Error cargando datos:', e);
            return defaultValue;
        }
    },

    // Debounce para optimizar eventos
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Mostrar notificación
    showNotification: function(message, type = 'info', duration = 3000) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:1rem;">×</button>
        `;

        // Estilos inline
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;

        // Colores según tipo
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        notification.style.background = colors[type] || colors.info;

        // Agregar al DOM
        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-remover
        if (duration > 0) {
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }, duration);
        }
    },

    // Copiar al portapapeles
    copyToClipboard: function(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Copiado al portapapeles', 'success', 2000);
            });
        } else {
            // Fallback para navegadores antiguos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Copiado al portapapeles', 'success', 2000);
        }
    },

    // Confirmar acción
    confirm: function(message, callback) {
        if (confirm(message)) {
            if (typeof callback === 'function') {
                callback();
            }
            return true;
        }
        return false;
    },

    // Cargar script dinámicamente
    loadScript: function(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    },

    // Detectar dispositivo móvil
    isMobile: function() {
        return window.innerWidth <= 768;
    },

    // Inicializar utilidades
    init: function() {
        console.log('🛠️ Utilidades inicializadas');

        // Agregar clase para dispositivos móviles
        if (this.isMobile()) {
            document.body.classList.add('mobile');
        }

        // Manejar redimensionado de ventana
        window.addEventListener('resize', this.debounce(() => {
            if (this.isMobile()) {
                document.body.classList.add('mobile');
            } else {
                document.body.classList.remove('mobile');
            }
        }, 250));

        // Agregar indicador de carga
        window.addEventListener('beforeunload', () => {
            this.showNotification('Cargando...', 'info', 0);
        });
    }
};

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    window.utils.init();
});

console.log('✅ utils.js cargado correctamente');
