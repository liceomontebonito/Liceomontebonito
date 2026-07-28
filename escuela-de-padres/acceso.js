/* ===== Acceso por familia — Escuela de Padres Liceo Montebonito =====
   Barrera de acceso del lado del navegador (soft gate).
   Para AGREGAR una familia: añade una línea  "CODIGO": "Nombre de la familia",
   Para QUITAR (revocar) el acceso de una familia: borra su línea.
   Los códigos NO distinguen mayúsculas/minúsculas ni espacios sobrantes.
*/
window.LICEO_ACCESO = {
  familias: {
    // ---- Código maestro de la dirección ----
    "LICEO-ADMIN": "Dirección del Liceo",
    // ---- Ejemplos (puedes borrarlos cuando tengamos la lista real) ----
    "MB-DEMO-2026": "Familia Demo",
    "MB-GOMEZ-4821": "Familia Gómez",
    "MB-PEREZ-7530": "Familia Pérez",
    "MB-RIOS-1194": "Familia Ríos"
  },

  gate: function () {
    try {
      if (localStorage.getItem('ep_familia')) return; // ya autorizado en este dispositivo
    } catch (e) {}
    var self = this;
    var raiz = document.body || document.documentElement;
    var ov = document.createElement('div');
    ov.id = 'ep-gate';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:linear-gradient(135deg,#2c5530 0%,#1e3d23 100%);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Segoe UI,Tahoma,sans-serif';
    ov.innerHTML =
      '<div style="background:#fff;max-width:430px;width:100%;border-radius:20px;padding:34px 28px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.35)">' +
        '<div style="font-size:2.6rem;line-height:1">🎓</div>' +
        '<h2 style="color:#2c5530;margin:8px 0 4px;font-size:1.5rem">Escuela de Padres</h2>' +
        '<p style="color:#5a6b5e;margin:0 0 18px;font-size:.98rem">Contenido exclusivo para las familias del <strong>Liceo Psicopedagógico Montebonito</strong>. Ingresa el código de tu familia.</p>' +
        '<input id="ep-code" type="text" placeholder="Tu código de familia" autocomplete="off" style="width:100%;padding:13px;border:1.5px solid #cfe0c0;border-radius:10px;font-size:1rem;text-align:center;text-transform:uppercase;box-sizing:border-box">' +
        '<div id="ep-err" style="color:#c0392b;font-size:.88rem;margin:9px 0 0;display:none">Código incorrecto. Verifícalo con el liceo.</div>' +
        '<button id="ep-btn" style="margin-top:14px;width:100%;background:linear-gradient(135deg,#FF6B35,#ff8c42);color:#fff;border:none;padding:13px;border-radius:50px;font-weight:700;font-size:1.02rem;cursor:pointer">Entrar</button>' +
        '<a href="https://wa.me/573126540548?text=Hola%2C%20quiero%20el%20c%C3%B3digo%20de%20acceso%20a%20la%20Escuela%20de%20Padres" style="display:block;margin-top:14px;color:#2c5530;font-size:.82rem">¿No tienes código? Escríbenos por WhatsApp</a>' +
      '</div>';
    raiz.appendChild(ov);
    try { document.documentElement.style.overflow = 'hidden'; } catch (e) {}

    function intentar() {
      var code = (document.getElementById('ep-code').value || '').trim().toUpperCase();
      var nombre = self.familias[code];
      if (nombre) {
        try { localStorage.setItem('ep_familia', nombre); localStorage.setItem('ep_codigo', code); } catch (e) {}
        ov.parentNode && ov.parentNode.removeChild(ov);
        try { document.documentElement.style.overflow = ''; } catch (e) {}
      } else {
        document.getElementById('ep-err').style.display = 'block';
      }
    }
    document.getElementById('ep-btn').addEventListener('click', intentar);
    document.getElementById('ep-code').addEventListener('keydown', function (e) { if (e.key === 'Enter') intentar(); });
    document.getElementById('ep-code').focus();
  },

  salir: function () {
    try { localStorage.removeItem('ep_familia'); localStorage.removeItem('ep_codigo'); } catch (e) {}
    location.reload();
  }
};

// Auto-ejecución lo antes posible para evitar que se vea el contenido sin código
LICEO_ACCESO.gate();
