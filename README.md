# 🏎️ Mario Kart.JS

> Simulador de corrida Mario Kart desenvolvido em Node.js puro — Desafio de Projeto da **Formação Node.js** na [DIO](https://dio.me).

---

## 📋 Sobre o Projeto

Este projeto simula uma corrida de Mario Kart no terminal, com lógica baseada em dados, atributos de personagens e blocos de pista aleatórios. Foi desenvolvido como melhoria do [projeto original do Felipão](https://github.com/digitalinnovationone/formacao-nodejs/tree/main/03-projeto-mario-kart), adicionando:

- 🎮 Visual aprimorado com emojis e barras de atributo
- 🔄 Loop de jogo (opção de jogar novamente)
- 📊 Placar atualizado a cada rodada
- 💤 Delay entre rodadas para sensação de ritmo
- 🧹 Código modular e legível

---

## 🎮 Personagens

| Personagem | ⚡ Velocidade | 🌀 Manobrabilidade | 💪 Poder |
|---|---|---|---|
| 🔴 Mario | 4 | 3 | 3 |
| 👸 Peach | 3 | 4 | 2 |
| 🦖 Yoshi | 2 | 4 | 3 |
| 🐢 Bowser | 5 | 2 | 5 |
| 💚 Luigi | 3 | 4 | 4 |
| 🦍 Donkey Kong | 2 | 2 | 5 |

---

## 🕹️ Regras & Mecânicas

A corrida tem **5 rodadas**. A cada rodada, um bloco de pista é sorteado:

| Bloco | Atributo usado | Resultado |
|---|---|---|
| ⚡ **RETA** | Velocidade | Quem tiver maior `dado + velocidade` ganha 1 ponto |
| 🌀 **CURVA** | Manobrabilidade | Quem tiver maior `dado + manobrabilidade` ganha 1 ponto |
| 💥 **CONFRONTO** | Poder | Quem tiver menor `dado + poder` **perde 1 ponto** (mínimo 0) |

Vence quem tiver mais pontos ao fim das 5 rodadas.

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/mario-kart-js.git

# Entre na pasta
cd mario-kart-js

# Execute
npm start
```

---

## 📁 Estrutura do Projeto

```
mario-kart-js/
├── src/
│   └── index.js       # Lógica principal do jogo
├── package.json
└── README.md
```

---

## 🧠 O que Aprendi / Pratiquei

- Funções assíncronas com `async/await`
- Uso do módulo nativo `readline` para input interativo
- Lógica de jogo com aleatoriedade controlada
- Organização do código em funções pequenas e responsáveis
- Uso de `process.exit()` e loops de jogo no terminal

---

## 🔗 Referências

- [Repositório original — DIO](https://github.com/digitalinnovationone/formacao-nodejs/tree/main/03-projeto-mario-kart)
- [Formação Node.js — DIO](https://dio.me)
- [Documentação Node.js](https://nodejs.org/docs)

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
