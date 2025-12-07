# 🧪 Como Testar o Secret Chungus

## ✅ Modo Correto de Testar

### 1. Fazer o Sorteio
```
1. Abra index.html no navegador
2. Digite a senha: chungus2024
3. Clique em "Sortear agora"
4. Copie um dos links gerados na tabela
```

### 2. Testar a Experiência do Participante
```
1. Cole o link copiado no navegador
2. A página participant.html abrirá com os dados corretos
3. Teste todo o fluxo interativo
```

## 🔧 Modo de Desenvolvimento

Se você abrir `pages/participant.html` diretamente SEM passar por index.html:

- ✅ **Funciona agora!** - Modo de desenvolvimento ativado
- 🎯 Usa automaticamente o primeiro participante do config.js
- 📝 Console mostra: "Development mode: Using first participant"

### Aviso no Console
Você verá no console do navegador:
```
⚠️ No 'data' parameter found in URL. Using development mode with first participant.
```

Isso é **NORMAL** quando você abre a página diretamente.

## 🐛 Debug e Troubleshooting

### Os nomes aparecem como [name]?

**Causa:** Página carregou mas não encontrou os participantes

**Soluções:**
1. Verifique se `js/config.js` está carregando antes do `participant.js`
2. Abra o console (F12) e veja se há erros
3. Verifique se PARTICIPANTS está definido: digite `PARTICIPANTS` no console

### Os botões não funcionam?

**Causa:** JavaScript com erro ou não carregou

**Soluções:**
1. Abra o console (F12) e veja se há erros
2. Verifique se todos os arquivos JS estão acessíveis
3. Teste se `document.getElementById('yesImButton')` retorna algo no console

### Como ver os logs de debug?

1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Você verá logs como:
   ```
   Payload: {giverId: "bornato", receiverId: "dubo"}
   Giver found: {id: "bornato", name: "lunoracle chungus", ...}
   Receiver found: {id: "dubo", name: "dubobe", ...}
   ```

## 📋 Checklist de Teste

- [ ] `index.html` abre e pede senha
- [ ] Sorteio gera links com `?data=...`
- [ ] Links abrem `participant.html` corretamente
- [ ] Nomes aparecem no lugar de `[name]`
- [ ] Botões "yes i'm" e "no im not" funcionam
- [ ] Vídeo do drum roll carrega
- [ ] Slot machine gira e revela o chungee
- [ ] Confetes aparecem
- [ ] Música toca (se permitido pelo navegador)

## 🎯 Fluxo Completo de Teste

```
┌─────────────────────────────────────────┐
│  1. Abrir index.html                    │
│     └─> Digite senha: chungus2024       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  2. Clicar "Sortear agora"              │
│     └─> Links aparecem na tabela        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  3. Copiar um link                      │
│     └─> Formato: .../participant.html? │
│         data=eyJnaXZlcklkIjoiLi4uIn0=   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  4. Abrir o link copiado                │
│     └─> Página carrega com dados reais │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  5. Testar toda experiência             │
│     ✓ Confirmar identidade              │
│     ✓ Ver drum roll                     │
│     ✓ Ler história                      │
│     ✓ Slot machine revela chungee       │
│     ✓ Ver confetes                      │
└─────────────────────────────────────────┘
```

## 💡 Dicas

- Use o **modo de desenvolvimento** para testar rapidamente a página
- Use o **fluxo completo** para testar o sorteio real
- Abra o **console** para ver logs detalhados
- Teste em **diferentes navegadores** (Chrome, Firefox, Edge)

---

✅ Agora você pode testar de qualquer forma!
