/* ===== MODULE-COMPLETION.JS - SISTEMA DE COMPLETITUD DE MÓDULOS ===== */

window.moduleCompletion = {
    // Marcar un módulo como completado
    markModuleCompleted: function(moduleNumber) {
        localStorage.setItem(`modulo${moduleNumber}_completed`, 'true');
        console.log(`✅ Módulo ${moduleNumber} marcado como completado`);
        
        // Mostrar notificación de éxito
        this.showCompletionNotification(moduleNumber);
        
        // Actualizar progreso en el dashboard si está disponible
        if (typeof updateUI === 'function') {
            updateUI();
        }
    },

    // Verificar si un módulo está completado
    isModuleCompleted: function(moduleNumber) {
        return localStorage.getItem(`modulo${moduleNumber}_completed`) === 'true';
    },

    // Mostrar notificación de completitud
    showCompletionNotification: function(moduleNumber) {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = 'completion-notification';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: completionPulse 0.6s ease;
            min-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
            <h3 style="margin-bottom: 1rem;">¡Módulo ${moduleNumber} Completado!</h3>
            <p>Tu progreso se ha guardado automáticamente.</p>
            <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">
                ${moduleNumber < 5 ? `Módulo ${moduleNumber + 1} desbloqueado` : '¡Curso terminado!'}
            </p>
        `;
        
        // Agregar estilos de animación si no existen
        if (!document.getElementById('completion-styles')) {
            const style = document.createElement('style');
            style.id = 'completion-styles';
            style.textContent = `
                @keyframes completionPulse {
                    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                    50% { transform: translate(-50%, -50%) scale(1.1); }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto-remover después de 4 segundos
        setTimeout(() => {
            notification.style.animation = 'completionPulse 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    },

    // Obtener progreso total del curso
    getCourseProgress: function() {
        const totalModules = 5;
        let completedCount = 0;
        
        for (let i = 1; i <= totalModules; i++) {
            if (this.isModuleCompleted(i)) {
                completedCount++;
            }
        }
        
        return {
            completed: completedCount,
            total: totalModules,
            percentage: Math.round((completedCount / totalModules) * 100)
        };
    },

    // Verificar si se puede acceder a un módulo
    canAccessModule: function(moduleNumber) {
        if (moduleNumber === 1) return true; // Módulo 1 siempre accesible
        
        // Verificar si el módulo anterior está completado
        return this.isModuleCompleted(moduleNumber - 1);
    },

    // Inicializar sistema en el módulo actual
    initForModule: function(moduleNumber) {
        console.log(`📚 Sistema de completitud inicializado para Módulo ${moduleNumber}`);
        
        // Agregar función global para marcar como completado
        window.completeCurrentModule = () => {
            this.markModuleCompleted(moduleNumber);
        };
        
        // Verificar si ya está completado
        if (this.isModuleCompleted(moduleNumber)) {
            console.log(`✅ Módulo ${moduleNumber} ya está completado`);
        }
        
        return {
            moduleNumber: moduleNumber,
            isCompleted: this.isModuleCompleted(moduleNumber),
            canAccess: this.canAccessModule(moduleNumber),
            courseProgress: this.getCourseProgress()
        };
    },

    // Función de utilidad para debugging
    debugInfo: function() {
        console.log('=== ESTADO DE COMPLETITUD ===');
        for (let i = 1; i <= 5; i++) {
            const completed = this.isModuleCompleted(i);
            const accessible = this.canAccessModule(i);
            console.log(`Módulo ${i}: ${completed ? '✅' : '❌'} ${accessible ? '🔓' : '🔒'}`);
        }
        console.log('Progreso total:', this.getCourseProgress());
    }
};

// Hacer disponible globalmente para debugging
window.debugModules = () => window.moduleCompletion.debugInfo();

console.log('✅ module-completion.js cargado correctamente');

