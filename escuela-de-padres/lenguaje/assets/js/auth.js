/* ===== AUTH.JS - SISTEMA DE AUTENTICACIÓN ===== */

window.authSystem = {
    // Verificar si el usuario está logueado
    isLoggedIn: function() {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    // Verificar si el curso está comprado
    isPurchased: function() {
        return localStorage.getItem('isPurchased') === 'true';
    },

    // Hacer login
    login: function(username, password) {
        // Credenciales de prueba
        const validCredentials = [
            { username: 'admin@curso.com', password: 'admin123' },
            { username: 'demo@curso.com', password: 'demo123' },
            { username: 'test@curso.com', password: 'test123' },
            { username: 'usuario@curso.com', password: '123456' },
            // También mantener las versiones sin @ para compatibilidad
            { username: 'admin', password: 'admin123' },
            { username: 'demo', password: 'demo123' },
            { username: 'test', password: 'test123' },
            { username: 'usuario', password: '123456' }
        ];

        const isValid = validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );

        if (isValid) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            localStorage.setItem('loginTime', new Date().toISOString());
            return true;
        }
        return false;
    },

    // Hacer logout
    logout: function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loginTime');
        
        // Redirigir a la página principal
        if (window.location.pathname.includes('/dashboard/') || 
            window.location.pathname.includes('/modulo')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    },

    // Simular compra del curso
    purchaseCourse: function() {
        localStorage.setItem('isPurchased', 'true');
        localStorage.setItem('purchaseDate', new Date().toISOString());
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', 'comprador');
        return true;
    },

    // Obtener usuario actual
    getCurrentUser: function() {
        return localStorage.getItem('currentUser') || 'Usuario';
    },

    // Verificar acceso a módulos
    hasModuleAccess: function(moduleNumber) {
        if (!this.isLoggedIn() || !this.isPurchased()) {
            return false;
        }
        
        // Todos los módulos están disponibles si está comprado
        return moduleNumber >= 1 && moduleNumber <= 5;
    },

    // Proteger página (redirigir si no tiene acceso)
    protectPage: function() {
        // MODO PRUEBAS: Siempre permitir acceso
        const testMode = true; // Cambiar a false para activar protección real
        
        if (testMode) {
            // En modo pruebas, simular que está logueado y comprado
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isPurchased', 'true');
            localStorage.setItem('currentUser', 'usuario-prueba');
            console.log('🧪 MODO PRUEBAS: Acceso automático concedido');
            return true;
        }
        
        if (!this.isLoggedIn() || !this.isPurchased()) {
            alert('Debes iniciar sesión y comprar el curso para acceder a este contenido.');
            window.location.href = '../index.html';
            return false;
        }
        return true;
    },

    // Inicializar sistema de auth en la página
    init: function() {
        console.log('🔐 Sistema de autenticación inicializado');
        console.log('- Logueado:', this.isLoggedIn());
        console.log('- Curso comprado:', this.isPurchased());
        console.log('- Usuario actual:', this.getCurrentUser());

        // Agregar evento de logout a elementos con clase 'logout-btn'
        document.addEventListener('DOMContentLoaded', () => {
            const logoutBtns = document.querySelectorAll('.logout-btn, [onclick*="logout"]');
            logoutBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                        this.logout();
                    }
                });
            });
        });
    }
};

// Auto-inicializar cuando se carga el script
window.authSystem.init();

console.log('✅ auth.js cargado correctamente');
