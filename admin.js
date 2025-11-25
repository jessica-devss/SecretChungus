// admin.js

// TROCA ESSA SENHA AQUI:
const ADMIN_PASSWORD = "chungus2024";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// gera um ciclo perfeito: cada pessoa dá para a próxima e a última dá para a primeira
function gerarCicloPerfeito(n) {
  // cria ordem aleatória de índices
  const ordem = shuffle([...Array(n).keys()]);

  // perm[i] = índice de quem i tirou
  const perm = Array(n).fill(null);

  for (let i = 0; i < n; i++) {
    const atual = ordem[i];
    const proximo = ordem[(i + 1) % n]; // fecha o ciclo
    perm[atual] = proximo;
  }

  return perm;
}

document.addEventListener("DOMContentLoaded", () => {
  // --- CHECAGEM DE SENHA ---
  const authed = sessionStorage.getItem("secretChungusAdminOK");
  if (!authed) {
    const pwd = prompt("Enter admin password:");
    if (pwd !== ADMIN_PASSWORD) {
      document.body.innerHTML = "<h2 style='color:white;text-align:center;margin-top:40px;'>Not authorized.</h2>";
      return;
    }
    sessionStorage.setItem("secretChungusAdminOK", "1");
  }
  // --- FIM CHECAGEM DE SENHA ---

  const btnSortear = document.getElementById("btn-sortear");
  const tbody = document.getElementById("links-body");

  btnSortear.addEventListener("click", () => {
    const n = PARTICIPANTS.length;
    if (n < 2) {
      alert("Precisa de pelo menos 2 participantes.");
      return;
    }

    // agora usa o ciclo perfeito em vez do derangement genérico
    const perm = gerarCicloPerfeito(n);
    tbody.innerHTML = "";

    for (let i = 0; i < n; i++) {
      const giver = PARTICIPANTS[i];
      const receiver = PARTICIPANTS[perm[i]];

      const payload = {
        giverId: giver.id,
        receiverId: receiver.id
      };

      const participantUrl = new URL("participant.html", window.location.href);
      const link = `${participantUrl.toString()}?data=${encodeURIComponent(
        btoa(JSON.stringify(payload))
      )}`;

      const tr = document.createElement("tr");
      const tdNome = document.createElement("td");
      const tdLink = document.createElement("td");

      tdNome.textContent = giver.name;

      const input = document.createElement("input");
      input.type = "text";
      input.value = link;
      input.readOnly = true;

      tdLink.appendChild(input);
      tr.appendChild(tdNome);
      tr.appendChild(tdLink);
      tbody.appendChild(tr);
    }

    alert("Sorteio feito! Agora é só copiar os links e enviar para cada pessoa.");
  });
});
