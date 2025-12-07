# 🎅 Secret Chungus 🐰

Um sistema de amigo secreto (Secret Santa) temático e divertido com animações, easter eggs e uma experiência interativa única!

**✨ Agora Organizado e Otimizado** - Código modular, estrutura limpa, mesma funcionalidade incrível!

---

## 📖 O que é isso?

Secret Chungus é:

- 10% Secret Santa tradicional
- 90% piadas internas, caos controlado e escolhas de design questionáveis
- 100% HTML/CSS/JS estático e divertido

Você tem:

- Uma **página de admin** (`index.html`) que embaralha todos e gera links secretos
- Uma **página do participante** (`pages/participant.html`) que:
  - ✅ Confirma a identidade da pessoa
  - 🥁 Toca um vídeo dramático de suspense
  - 📜 Mostra uma história personalizada de Natal
  - 🎰 Roda uma slot machine com avatares
  - 🎊 Revela o "chungee" com confetes e UI hilária

---

## 📁 Estrutura do Projeto

```
SecretChungus/
├── index.html              # Página de administração (sorteio)
├── pages/
│   └── participant.html    # Página do participante
├── css/                    # 🎨 Estilos modularizados
│   ├── reset.css          # Reset CSS
│   ├── variables.css      # Variáveis CSS (cores, tamanhos, etc)
│   ├── components.css     # Componentes principais
│   ├── animations.css     # Todas as animações
│   ├── modals.css         # Modais e overlays
│   ├── slot-machine.css   # Slot machine de revelação
│   └── admin.css          # Estilos da página admin
├── js/                     # ⚙️ JavaScript modularizado (ES6 Modules)
│   ├── config.js          # ⚡ Configuração dos participantes
│   ├── admin.js           # Lógica do sorteio
│   ├── participant.js     # Script principal coordenador
│   ├── utils.js           # Funções utilitárias
│   ├── confetti.js        # 🎊 Animação de confete
│   ├── drumPlayer.js      # 🥁 Player do vídeo de suspense
│   ├── slotMachine.js     # 🎰 Slot machine de revelação
│   ├── storyReveal.js     # 📜 Revelação animada das histórias
│   ├── easterEggs.js      # 🥚 Easter eggs escondidos
│   └── backgroundMusic.js # 🎵 Música de fundo
├── assets/
│   ├── images/
│   │   ├── ui/            # Imagens de interface
│   │   ├── avatars/       # Avatares dos participantes
│   │   └── easter-eggs/   # Imagens dos easter eggs
│   └── audio/
│       └── chungusmassong.ogg  # Música natalina
└── README.md              # Este arquivo
```

---

## 🚀 Como Usar

### 1. Configurar Participantes

Edite `js/config.js` e adicione os participantes no array `PARTICIPANTS`:

```javascript
const PARTICIPANTS = [
  {
    id: "identificador-unico",              // ID único do participante
    name: "Nome do Participante",           // Nome exibido
    message: "Mensagem/desejo",             // Mensagem/wishlist
    story: "História temática...",          // História de Natal personalizada
    storyImage: "../assets/images/ui/...", // Imagem da história
    favoriteChungus: "Descrição",           // Chungus favorito
    favoriteChungusImage: "../assets/...", // Imagem do chungus favorito
    avatar: "../assets/images/avatars/..." // Avatar do participante
  },
  // ... adicione mais participantes
];
```

### 2. Fazer o Sorteio

1. Abra `index.html` no navegador
2. Insira a senha de administrador (padrão: `chungus2024`)
3. Clique em **"Sortear agora"**
4. Copie os links gerados e envie para cada participante

💡 **Dica**: O sorteio cria um círculo perfeito (A → B → C → ... → A) garantindo que todos deem E recebam presentes.

### 3. Experiência do Participante

Cada participante abre seu link único e passa por:

1. **Confirmação de Identidade** - "É você mesmo?"
   - ✅ Sim → Continua
   - ❌ Não → JUMPSCARE MORBIUS! 😱

2. **Drum Roll** - Vídeo de suspense do YouTube

3. **História de Natal** - História personalizada com revelação progressiva

4. **Slot Machine** - Animação de revelação do amigo secreto

5. **Detalhes do Chungee** - Avatar, mensagem, chungus favorito, confetes! 🎊

---

## 🎨 Características

✨ **Design Responsivo** - Funciona perfeitamente em desktop e mobile  
📦 **Código Modular** - JavaScript ES6 Modules para manutenção fácil  
🎭 **Animações Suaves** - Confetes, slot machine, revelação progressiva  
🥚 **Easter Eggs** - Segredos escondidos por todo o site  
🎵 **Música de Fundo** - Trilha sonora natalina temática  
📖 **Histórias Únicas** - Cada participante tem sua história personalizada  
🎯 **Cursor Customizado** - Cursor temático Big Chungus  
🎨 **CSS Variables** - Fácil customização de cores e estilos

---

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - CSS Variables, Flexbox, Animations
- **JavaScript ES6+** - Modules, Classes, Async/Await
- **YouTube IFrame API** - Para vídeo de suspense
- **Canvas API** - Para animação de confetes
- **IntersectionObserver API** - Para revelação progressiva

---

## ⚙️ Configuração Avançada

### Alterar Senha de Admin

Em `js/admin.js`:

```javascript
const ADMIN_PASSWORD = "sua-senha-aqui";
```

### Personalizar Cores e Estilos

Em `css/variables.css`:

```css
:root {
  --color-primary: #b0183c;     /* Cor primária */
  --color-bg-main: #12010a;     /* Fundo principal */
  --font-main: "Work Sans", sans-serif;
  /* ... mais variáveis */
}
```

### Adicionar Novas Imagens

Coloque as imagens nas pastas apropriadas:

- **Avatares**: `assets/images/avatars/`
- **Imagens de UI**: `assets/images/ui/`
- **Easter Eggs**: `assets/images/easter-eggs/`

---

## 🎯 Easter Eggs

🔍 **Descubra os segredos!**

- 🖼️ Clique no **banner superior** 3 vezes
- 👀 Clique nos **ícones de emoji** acima do banner
- 😎 Clique nos **emojis "cool"** na seção final
- 🎬 Veja a **animação especial** ao rejeitar sua identidade
- ❄️ Observe os **flocos de neve** caindo

---

## 📚 Estrutura de Código

### Módulos JavaScript

| Módulo | Responsabilidade |
|--------|-----------------|
| `config.js` | Dados dos participantes |
| `admin.js` | Lógica de sorteio |
| `participant.js` | Coordenador principal |
| `utils.js` | Funções auxiliares |
| `confetti.js` | Animação de confetes |
| `drumPlayer.js` | YouTube player |
| `slotMachine.js` | Slot machine |
| `storyReveal.js` | Revelação de histórias |
| `easterEggs.js` | Easter eggs |
| `backgroundMusic.js` | Áudio de fundo |

### Módulos CSS

| Módulo | Conteúdo |
|--------|----------|
| `reset.css` | Reset de estilos padrão |
| `variables.css` | Variáveis CSS globais |
| `components.css` | Componentes reutilizáveis |
| `animations.css` | Keyframes e animações |
| `modals.css` | Modais e overlays |
| `slot-machine.css` | Estilos da slot machine |
| `admin.css` | Estilos da página admin |

---

## 🐛 Troubleshooting

**O sorteio não funciona?**
- ✅ Verifique se inseriu a senha correta
- ✅ Verifique se há pelo menos 2 participantes em `config.js`

**As imagens não aparecem?**
- ✅ Verifique os caminhos relativos nos arquivos
- ✅ Confirme que as imagens estão nas pastas corretas em `assets/`

**A música não toca?**
- ✅ Alguns navegadores bloqueiam autoplay - clique na página primeiro
- ✅ Verifique se o arquivo `chungusmassong.ogg` está em `assets/audio/`

**O vídeo não carrega?**
- ✅ Verifique sua conexão com a internet
- ✅ O YouTube deve estar acessível

---

## 📝 Licença

Este é um projeto pessoal de amigo secreto. Use e modifique como quiser! 🎄

---

## 🎉 Créditos

Criado com amor (e muito café) para o **Secret Chungus 2024** 🐰✨

**Melhorias na Organização:**
- ✅ Código modularizado (ES6 Modules)
- ✅ CSS separado por responsabilidade
- ✅ Estrutura de pastas clara
- ✅ Assets organizados por tipo
- ✅ Zero funcionalidade perdida
- ✅ 100% mais manutenível!

---

🎅 **Feliz Natal e bom Secret Chungus!** 🐰🎄
