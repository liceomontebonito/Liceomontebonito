/* ===== Motor del Curso de Orientación Vocacional ===== */
window.CURSO = {
  total: 6,
  titulos: {1:"¿Quién soy?",2:"Mis intereses (RIASEC)",3:"Aptitudes y confianza",4:"El mundo de las profesiones",5:"Tomar la decisión",6:"Mi plan de acción"},
  k: function(n){ return 'ovoc_m'+n+'_done'; },
  isDone: function(n){ return localStorage.getItem(this.k(n))==='true'; },
  isUnlocked: function(n){ return n===1 || this.isDone(n-1); },
  complete: function(n){ localStorage.setItem(this.k(n),'true'); },
  save: function(key,val){ try{ localStorage.setItem('ovoc_'+key, val); }catch(e){} },
  load: function(key){ try{ return localStorage.getItem('ovoc_'+key); }catch(e){ return null; } },

  // Candado de módulo: llamar en el <head> de cada módulo N
  guard: function(n){
    if(n>1 && !this.isDone(n-1)){
      alert('🔒 Debes completar el Módulo '+(n-1)+' — "'+this.titulos[n-1]+'" — antes de entrar al Módulo '+n+'.');
      location.replace('../index.html');
    }
  },

  // Habilita el botón "Completar módulo"
  setupComplete: function(n, btnId, nextHref){
    var self=this, btn=document.getElementById(btnId);
    if(!btn) return;
    function done(){
      self.complete(n);
      btn.disabled=true;
      btn.textContent='✓ Módulo '+n+' completado';
      var nx=document.getElementById('nextLink');
      if(nx){ nx.style.display='inline-block'; }
      alert('🎉 ¡Completaste el Módulo '+n+'! '+(n<self.total?('Se desbloqueó el Módulo '+(n+1)+'.'):'¡Terminaste el curso!'));
    }
    if(this.isDone(n)){ btn.disabled=true; btn.textContent='✓ Módulo '+n+' completado'; var nx=document.getElementById('nextLink'); if(nx) nx.style.display='inline-block'; }
    btn.addEventListener('click', function(){ if(!btn.disabled) done(); });
  },

  // Quiz genérico. preguntas=[{q, opts:[], correct, fb}]  onPass callback al aprobar
  quiz: function(containerId, preguntas, onPass, minPct){
    var cont=document.getElementById(containerId); if(!cont) return;
    minPct = minPct||70;
    var sel={};
    preguntas.forEach(function(p,i){
      var qd=document.createElement('div'); qd.className='q';
      var en=document.createElement('p'); en.className='enunciado'; en.textContent=(i+1)+'. '+p.q; qd.appendChild(en);
      p.opts.forEach(function(o,j){
        var op=document.createElement('div'); op.className='opt'; op.textContent=o;
        op.addEventListener('click', function(){
          if(qd.dataset.locked) return;
          Array.prototype.forEach.call(qd.querySelectorAll('.opt'),function(x){x.classList.remove('sel');});
          op.classList.add('sel'); sel[i]=j;
        });
        qd.appendChild(op);
      });
      var fb=document.createElement('div'); fb.className='fb'; qd.appendChild(fb);
      cont.appendChild(qd);
    });
    var btn=document.createElement('button'); btn.className='btn btn-verde'; btn.textContent='Verificar respuestas'; btn.style.marginTop='6px';
    var res=document.createElement('div'); res.style.marginTop='12px'; res.style.fontWeight='700';
    cont.appendChild(btn); cont.appendChild(res);
    btn.addEventListener('click', function(){
      var ok=0;
      preguntas.forEach(function(p,i){
        var qd=cont.children[i]; qd.dataset.locked='1';
        var opts=qd.querySelectorAll('.opt'); var fb=qd.querySelector('.fb');
        opts.forEach && null;
        Array.prototype.forEach.call(opts,function(x,j){
          x.classList.remove('sel');
          if(j===p.correct) x.classList.add('ok');
          if(sel[i]===j && j!==p.correct) x.classList.add('bad');
        });
        if(sel[i]===p.correct){ ok++; fb.className='fb show ok'; fb.textContent='✓ Correcto. '+(p.fb||''); }
        else { fb.className='fb show bad'; fb.textContent='✗ La respuesta correcta está marcada en verde. '+(p.fb||''); }
      });
      var pct=Math.round(ok/preguntas.length*100);
      if(pct>=minPct){ res.style.color='#1e7a32'; res.textContent='Resultado: '+ok+'/'+preguntas.length+' ('+pct+'%). ¡Aprobado! Ya puedes completar el módulo.'; if(onPass) onPass(); }
      else { res.style.color='#a5302c'; res.textContent='Resultado: '+ok+'/'+preguntas.length+' ('+pct+'%). Repasa el contenido e intenta de nuevo.';
        Array.prototype.forEach.call(cont.querySelectorAll('.q'),function(qd){ qd.dataset.locked=''; var fb=qd.querySelector('.fb'); }); }
    });
  },

  // Render del índice (landing)
  renderLanding: function(){
    for(var i=1;i<=this.total;i++){ (function(i,self){
      var btn=document.getElementById('m'+i+'-btn');
      var card=document.getElementById('m'+i+'-card');
      if(!btn) return;
      if(!self.isUnlocked(i)){
        btn.outerHTML='<span class="btn btn-gris" style="cursor:not-allowed">🔒 Completa el módulo '+(i-1)+'</span>';
        if(card) card.style.opacity='0.6';
      } else if(self.isDone(i)){
        btn.textContent='Repasar módulo →';
        var b=document.getElementById('m'+i+'-badge'); if(b) b.style.display='inline-block';
      }
    })(i,this); }
    // progreso global
    var done=0; for(var j=1;j<=this.total;j++) if(this.isDone(j)) done++;
    var g=document.getElementById('globalProg'); if(g) g.style.width=(done/this.total*100)+'%';
    var gt=document.getElementById('globalProgTxt'); if(gt) gt.textContent=done+' de '+this.total+' módulos completados';
  }
};
