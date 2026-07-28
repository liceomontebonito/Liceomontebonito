/* ===== Acceso por familia — Escuela de Padres Liceo Montebonito =====
   Barrera de acceso del lado del navegador (soft gate).
   AGREGAR familia:  "CODIGO": "Nombre de la familia",
   REVOCAR acceso:   borra la linea de esa familia.
   Los codigos NO distinguen mayusculas/minusculas ni espacios sobrantes.
*/
window.LICEO_ACCESO = {
  familias: {
    "LICEO-ADMIN": "Dirección del Liceo",
    "MB-DMTT-358": "Familia 01",
    "MB-VUSV-952": "Familia 02",
    "MB-WCDK-392": "Familia 03",
    "MB-YSYM-586": "Familia 04",
    "MB-NNPT-373": "Familia 05",
    "MB-UUKK-946": "Familia 06",
    "MB-AZNN-983": "Familia 07",
    "MB-PVUS-389": "Familia 08",
    "MB-PTJQ-925": "Familia 09",
    "MB-EBZT-389": "Familia 10",
    "MB-ESHD-996": "Familia 11",
    "MB-UPYK-988": "Familia 12",
    "MB-GKJA-249": "Familia 13",
    "MB-TSNG-699": "Familia 14",
    "MB-TSQU-267": "Familia 15",
    "MB-RDRZ-694": "Familia 16",
    "MB-QSCX-697": "Familia 17",
    "MB-DGQE-923": "Familia 18",
    "MB-ARVU-355": "Familia 19",
    "MB-DWBU-674": "Familia 20",
    "MB-AMYV-945": "Familia 21",
    "MB-SVEW-638": "Familia 22",
    "MB-YFEV-688": "Familia 23",
    "MB-ETGP-238": "Familia 24",
    "MB-CBNX-722": "Familia 25",
    "MB-TSMY-697": "Familia 26",
    "MB-DSRV-445": "Familia 27",
    "MB-QWMR-538": "Familia 28",
    "MB-BGXF-229": "Familia 29",
    "MB-XGSZ-245": "Familia 30",
    "MB-TEFY-486": "Familia 31",
    "MB-QUQC-864": "Familia 32",
    "MB-NFJR-986": "Familia 33",
    "MB-RFMT-993": "Familia 34",
    "MB-TTJD-552": "Familia 35",
    "MB-CRXM-842": "Familia 36",
    "MB-NFNU-536": "Familia 37",
    "MB-UVGV-664": "Familia 38",
    "MB-DJDQ-432": "Familia 39",
    "MB-NFXX-376": "Familia 40",
    "MB-VCKM-466": "Familia 41",
    "MB-CAQJ-822": "Familia 42",
    "MB-DHAK-337": "Familia 43",
    "MB-MRWX-287": "Familia 44",
    "MB-WGWR-837": "Familia 45",
    "MB-TYJP-672": "Familia 46",
    "MB-ZQAK-763": "Familia 47",
    "MB-KQMV-275": "Familia 48",
    "MB-UBDF-332": "Familia 49",
    "MB-ETNW-628": "Familia 50",
    "MB-VENQ-885": "Familia 51",
    "MB-QYHE-428": "Familia 52",
    "MB-JEHA-269": "Familia 53",
    "MB-QJME-342": "Familia 54",
    "MB-XTJM-722": "Familia 55",
    "MB-XHSB-548": "Familia 56",
    "MB-ZNHU-675": "Familia 57",
    "MB-NNRX-996": "Familia 58",
    "MB-GFXQ-492": "Familia 59",
    "MB-NTZQ-243": "Familia 60",
    "MB-KNUJ-432": "Familia 61",
    "MB-UGZV-628": "Familia 62",
    "MB-PUTX-433": "Familia 63",
    "MB-EPMU-662": "Familia 64",
    "MB-VYGF-666": "Familia 65",
    "MB-NEPG-298": "Familia 66",
    "MB-NUFT-247": "Familia 67",
    "MB-UEFA-327": "Familia 68",
    "MB-CNKG-454": "Familia 69",
    "MB-DMSD-386": "Familia 70"
  },
  gate: function () {
    try {
      var guardado = localStorage.getItem('ep_codigo');
      if (guardado && this.familias[guardado]) return; // autorizado y su código sigue vigente
      // código revocado o inexistente: limpiar y volver a pedir
      localStorage.removeItem('ep_familia'); localStorage.removeItem('ep_codigo');
    } catch (e) {}
    var self = this;
    var raiz = document.body || document.documentElement;
    var ov = document.createElement('div');
    ov.id = 'ep-gate';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:linear-gradient(135deg,#2c5530 0%,#1e3d23 100%);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Segoe UI,Tahoma,sans-serif';
    ov.innerHTML =
      '<div style="background:#fff;max-width:430px;width:100%;border-radius:20px;padding:34px 28px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.35)">' +
        '<div style="font-size:2.6rem;line-height:1">\U0001F393</div>' +
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

LICEO_ACCESO.gate();
