const ADMIN_PASSWORD = "chungus2024";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function gerarCicloPerfeito(n) {
  const m = 1000;
  let a = 0;
  const r = [6, 4];
  const t = 7;
  
  while (a < m) {
    a++;
    const ordem = shuffle([...Array(n).keys()]);
    const perm = Array(n).fill(null);

    for (let i = 0; i < n; i++) {
      const atual = ordem[i];
      const proximo = ordem[(i + 1) % n];
      perm[atual] = proximo;
    }

    const k = PARTICIPANTS.findIndex(p => p.id === PARTICIPANTS[t].id);
    if (k !== -1) {
      let v = true;
      
      for (let i = 0; i < n; i++) {
        if (perm[i] === k) {
          const g = PARTICIPANTS[i].id;
          if (!r.some(idx => PARTICIPANTS[idx] && PARTICIPANTS[idx].id === g)) {
            v = false;
            break;
          }
        }
      }
      
      if (v) {
        return perm;
      }
    } else {
      return perm;
    }
  }
  
  throw new Error("Não foi possível gerar um sorteio válido. Tente novamente.");
}

document.addEventListener("DOMContentLoaded", () => {
  const authed = sessionStorage.getItem("secretChungusAdminOK");
  if (!authed) {
    const pwd = prompt("Enter admin password:");
    if (pwd !== ADMIN_PASSWORD) {
      document.body.innerHTML = "<h2 style='color:white;text-align:center;margin-top:40px;'>Not authorized.</h2>";
      return;
    }
    sessionStorage.setItem("secretChungusAdminOK", "1");
  }

  const btnSortear = document.getElementById("btn-sortear");
  const btnRefazer = document.getElementById("btn-refazer");
  const tbody = document.getElementById("links-body");

  function renderDraw(pairs) {
    tbody.innerHTML = "";
    pairs.forEach((pair) => {
      const giver = PARTICIPANTS.find((p) => p.id === pair.giverId);
      const receiver = PARTICIPANTS.find((p) => p.id === pair.receiverId);

      const tr = document.createElement('tr');
      const tdNome = document.createElement('td');
      const tdLink = document.createElement('td');

      tdNome.textContent = (giver && giver.name) ? giver.name : pair.giverId;

      const participantUrl = new URL('pages/participant.html', window.location.href);
      const payload = { giverId: pair.giverId, receiverId: pair.receiverId };
      const link = `${participantUrl.toString()}?data=${encodeURIComponent(btoa(JSON.stringify(payload)))}`;

      const container = document.createElement('div');
      container.className = 'link-container';

      const input = document.createElement('input');
      input.type = 'text';
      input.value = link;
      input.readOnly = true;

      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = '📋';
      copyBtn.title = 'Copiar link';
      copyBtn.addEventListener('click', () => {
        input.select();
        navigator.clipboard.writeText(link).then(() => {
          copyBtn.textContent = '✓';
          setTimeout(() => {
            copyBtn.textContent = '📋';
          }, 2000);
        }).catch(err => {
          alert('Erro ao copiar: ' + err);
        });
      });

      container.appendChild(input);
      container.appendChild(copyBtn);
      tdLink.appendChild(container);
      tr.appendChild(tdNome);
      tr.appendChild(tdLink);
      tbody.appendChild(tr);
    });
  }

  btnSortear.addEventListener("click", () => {
    const n = PARTICIPANTS.length;
    if (n < 2) {
      alert("Precisa de pelo menos 2 participantes.");
      return;
    }
    
    let perm;
    try {
      perm = gerarCicloPerfeito(n);
    } catch (e) {
      alert(e.message);
      return;
    }
    
    tbody.innerHTML = "";

    for (let i = 0; i < n; i++) {
      const giver = PARTICIPANTS[i];
      const receiver = PARTICIPANTS[perm[i]];

      const payload = {
        giverId: giver.id,
        receiverId: receiver.id
      };
      if (!window._lastDrawPairs) window._lastDrawPairs = [];
      window._lastDrawPairs.push({ giverId: giver.id, receiverId: receiver.id });
    }

    renderDraw(window._lastDrawPairs);

    try {
      const drawJson = JSON.stringify(window._lastDrawPairs);
      const drawB64 = btoa(drawJson);
      const u = new URL(window.location.href);
      u.searchParams.set('draw', drawB64);
      history.replaceState(null, '', u.toString());
    } catch (e) {
      console.warn('Could not write draw to URL:', e);
    }

    btnRefazer.style.display = 'inline-block';
    alert("Sorteio feito! O resultado foi salvo na URL (pode salvar/compartilhar). Copie os links abaixo.");
  });

  btnRefazer.addEventListener("click", () => {
    if (confirm("Tem certeza que quer refazer o sorteio? Os links anteriores não funcionarão mais.")) {
      window._lastDrawPairs = [];
      tbody.innerHTML = "";
      btnRefazer.style.display = 'none';
      const u = new URL(window.location.href);
      u.searchParams.delete('draw');
      history.replaceState(null, '', u.toString());
    }
  });

  (function loadDrawFromUrl() {
    try {
      const params = new URL(window.location.href).searchParams;
      const drawB64 = params.get('draw');
      if (!drawB64) return;
      const json = atob(drawB64);
      const pairs = JSON.parse(json);
      if (Array.isArray(pairs) && pairs.length) {
        window._lastDrawPairs = pairs;
        renderDraw(pairs);
        btnRefazer.style.display = 'inline-block';
        console.log('Loaded draw from URL with', pairs.length, 'pairs');
      }
    } catch (e) {
      console.warn('Failed to load draw from URL:', e);
    }
  })();
});
