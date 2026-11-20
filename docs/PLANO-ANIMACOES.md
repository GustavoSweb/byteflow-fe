# Plano de animações — ByteFlow

> Objetivo: transformar o site em uma experiência memorável, em que o próprio movimento
> conta a história da marca — **bytes** que se encaixam e um **fluxo** que conecta tudo —
> sem sacrificar performance, acessibilidade nem conversão. O site precisa provar, enquanto
> anima, a promessa de "performance em produção".

---

## 1. Conceito: "Bytes encaixam, o fluxo desliza"

A linguagem de movimento nasce do logo (um "B" de blocos com um byte lima saindo):

| Elemento | Como se move | Easing / ritmo | Onde aparece |
|---|---|---|---|
| **Byte** (blocos, cards, chips) | Movimentos curtos, discretos, que *encaixam* — às vezes em degraus, como pixels | `back.out(1.6)`, `steps(4)` em micro-detalhes · 0,2–0,5s | Entradas de cards, tags, ícones, contadores |
| **Flow** (linhas, scroll, transições) | Contínuo, fluido, sem cortes | `expo.out` / `power3.inOut` · 0,6–1,2s, ou atrelado ao scroll | Linha de fluxo, parallax, transições de página |
| **O Byte lima** (personagem) | O ponto lima do logo ganha vida e "viaja" pelo site | Segue path/scroll | Preloader → cursor → linha de fluxo → CTA |

**Regra de ouro:** cada seção tem *uma* ideia de movimento forte; o resto é discreto.
Movimento serve à leitura (guiar o olho, mostrar causa → efeito), nunca a atrasa.

---

## 2. Stack técnica

| Ferramenta | Para quê | Observação |
|---|---|---|
| **GSAP 3** + `@gsap/react` (`useGSAP`) | Timelines, ScrollTrigger, SplitText, ScrambleText, DrawSVG, MotionPath, Flip, Observer | Todos os plugins são gratuitos desde 2025. É a mesma base do portfólio pessoal — reaproveita conhecimento |
| **Lenis** | Scroll suave sincronizado com ScrollTrigger | Desligado em `prefers-reduced-motion` e em touch, se pesar |
| **View Transitions API** | Transição "card → página do case" (elemento compartilhado) | Fallback: transição de blocos com GSAP |
| CSS puro | Hovers simples, spotlight, estados de foco | Sem JS quando não precisa |

Carregamento: plugins importados só onde são usados; seções abaixo da dobra animam via
`ScrollTrigger` (lazy). Meta: **≤ 60 KB gzip** de JS extra no total.

### Arquitetura proposta

```
src/shared/motion/
  MotionProvider.tsx     # registra plugins, Lenis ↔ ScrollTrigger, flag reduced-motion, âncoras com offset do header
  tokens.ts              # durações, eases ("byte", "flow"), staggers
  useReducedMotion.ts
  primitives/
    Reveal.tsx           # fade/slide de entrada genérico
    SplitReveal.tsx      # títulos por palavra/letra (SplitText)
    Scramble.tsx         # texto "decodificando" (ScrambleText, glifos mono)
    Counter.tsx          # odômetro de números (5+, 25+, 10x)
    Magnetic.tsx         # botões/links atraídos pelo cursor
    Tilt.tsx             # inclinação 3D com mouse
    Spotlight.tsx        # luz que segue o cursor em cards
    ByteCursor.tsx       # cursor personalizado (desktop)
    FlowPath.tsx         # linha SVG que se desenha com o scroll + byte viajante
```

---

## 3. Momentos de assinatura (o que torna o site "inesquecível")

### 3.1 Preloader — o logo se monta (≤ 1,2s, só na 1ª visita)
1. A haste do "B" sobe do chão (`scaleY` 0 → 1, `steps(6)` = efeito pixel).
2. Os dois módulos deslizam e **encaixam** com um leve overshoot.
3. O byte lima "pinga" para fora, quica uma vez e **voa** até o canto do header, virando o logo fixo.
4. O fundo petróleo se abre em blocos (wipe em grade 6×4) revelando o hero.
- Pular com clique/tecla; não reexibir na sessão (`sessionStorage`); nunca bloquear o LCP — o hero já está renderizado por baixo.

### 3.2 O Byte vira o cursor (desktop)
- Ponto lima de 10px com `mix-blend-mode: difference`, seguindo o mouse com atraso suave (`quickTo`).
- Sobre links/botões: cresce e vira anel; sobre cards de projeto: vira uma pílula **"ver case →"**; sobre imagens: lupa.
- Cursor nativo continua disponível (o custom é decorativo, `pointer-events: none`). Desligado em touch e reduced-motion.

### 3.3 A linha de fluxo atravessa a página
- Um path SVG fino (esmeralda, 1px) desce do hero, contorna as seções e termina no botão do CTA final.
- Desenha-se conforme o scroll (`DrawSVG` + `scrub`), e o **byte lima viaja na ponta** (`MotionPath`).
- Ao passar por um marco (etapa do processo, número, card), o marco "acende" — o fluxo literalmente conecta Serviços → Processo → Projetos → Contato.
- No mobile vira uma linha vertical simples na lateral.

### 3.4 Transição card → case (elemento compartilhado)
- Clicar em um projeto: a capa do card **cresce e se transforma** na janela de navegador do topo do case (View Transitions com `view-transition-name` por slug).
- Fallback: grade de blocos petróleo cobre a tela (bytes), troca a rota, e os blocos saem revelando o case.

---

## 4. Seção por seção

### Header
- Esconde ao rolar para baixo, reaparece ao subir (com blur crescendo).
- **Indicador ativo**: pílula esmeralda desliza entre os links conforme a seção visível (`Flip`).
- Seletor PT/EN: a pílula ativa desliza; ao trocar, os textos do header fazem um *scramble* rápido antes do reload.

### Hero
- **Título "decodifica"**: cada palavra entra como glifos mono aleatórios (`#$%01`) e se resolve no texto final (ScrambleText) — 0,8s, uma vez. Texto real fica no HTML desde o início (SEO/LCP).
- **Eyebrow** `// estúdio de software` digita como terminal, com cursor `▍` piscando.
- **Mockup em 3D**: as janelas e o celular entram de baixo em profundidade (z) com stagger; depois respondem ao mouse com **parallax em camadas** (janela de trás move menos, celular mais) e leve `Tilt`.
- **Prints "rolando"**: dentro da janela da FutBuyNow o print desliza lentamente para baixo e volta — parece um site vivo.
- **Grid reativo**: os pontos da grade de fundo acendem perto do cursor (máscara radial seguindo o mouse, puro CSS + 1 variável).
- **Ticker**: velocidade e inclinação reagem à velocidade do scroll (`Observer`); ícones ficam coloridos e "pulam" (byte) no hover.
- Botões **magnéticos**.

### Frase de impacto (Benefits)
- **Leitura guiada pelo scroll**: palavras começam em 15% de opacidade e vão acendendo uma a uma conforme o scroll (`scrub`).
- Palavras-chave ("código limpo", "arquitetura escalável", "performance") recebem um **marca-texto lima** que se desenha da esquerda para a direita.

### Serviços
- Cards entram como bytes: caem e **encaixam** na grade com stagger em diagonal.
- **Spotlight** que segue o cursor dentro de cada card + borda que acende.
- **Ícone com micro-história no hover**:
  - Sites → o globo gira 30°; E-commerce → o carrinho dá um "rolê" e volta;
  - Mobile → o celular vibra; Sistemas → os blocos do dashboard se reorganizam;
  - Performance → o ponteiro do medidor varre até o verde; DevOps → a nuvem "sobe" uma seta de deploy;
  - Landing → o layout se monta em blocos; Vídeo → a claquete bate.

### Processo + números (WhyChooseUs)
- **Seção fixa (pin) com scroll horizontal no desktop**: as 4 etapas passam como um pipeline; a linha de fluxo conecta uma à outra e o byte lima viaja entre elas.
- Cada etapa, ao ficar ativa, mostra um mini **"log de terminal"** digitando: `✓ discovery — escopo definido`, `✓ build — 142 testes passando`…
- **Números em odômetro**: dígitos rolam em fonte mono até `5+`, `25+`, `10x`.
- O `10x` vem com uma **mini corrida de barras**: barra cinza "30s" vs. barra lima "2,8s" que dispara.
- Mobile: etapas empilhadas com reveal simples (sem pin).

### Projetos
- Carrossel com **inércia e inclinação proporcional à velocidade do arraste** (cards "deitam" levemente ao arrastar rápido).
- Hover na capa: o print **rola como se você estivesse navegando no site** + badges sobem em stagger.
- Cursor vira "ver case →"; clique dispara a transição 3.4.
- Ao entrar na viewport: cards chegam da direita em cascata, como dados chegando em stream.

### Comparativo (Desenvolvimento comum × ByteFlow)
- Coluna "comum": itens sofrem um **glitch** curto (deslocamento RGB) e ganham um risco animado.
- Coluna ByteFlow: os ✓ se **desenham** (DrawSVG) um a um, e o card ganha um brilho esmeralda que percorre a borda (gradiente cônico girando).

### Equipe
- Fotos entram com **revelação em blocos** (máscara em grade 4×4 abrindo em ordem aleatória — os bytes formam a pessoa).
- Hover: foto passa de duotone petróleo/esmeralda para cor real; selo ★ 4,87 faz um pulso.
- **Card do Edson (editor de vídeo)**: no hover toca um loop curto de vídeo/motion feito por ele — o card vira portfólio vivo. *(precisa de um MP4/WebM curto, < 1 MB)*
- Tags de habilidades caem em stagger; links magnéticos.

### FAQ
- Abrir/fechar com altura animada por spring (sem `max-height` fixo, que hoje corta respostas longas).
- O ícone vira de `+` para `−` em dois traços animados; a resposta entra palavra por palavra (rápido, 0,3s).

### CTA final
- A marca d'água do logo **se monta** igual ao preloader quando a seção entra.
- A linha de fluxo da página termina aqui: o byte lima pousa no botão "Fale com a gente", que pulsa uma vez.
- No hover do botão: **explosão de mini-bytes** (8–12 quadradinhos lima/esmeralda saindo e caindo com gravidade).

### Rodapé
- Wordmark gigante "ByteFlow" na base (outline), em que cada letra **reage ao cursor** (peso/escala variando por proximidade).
- Botão "voltar ao topo": o byte lima sobe a página inteira deixando um rastro.

### Páginas de case
- Topo: título com SplitReveal, janela de navegador entra em 3D; o print longo **rola sozinho** dentro da janela (ou com o mouse sobre ela).
- São João: os três celulares abrem em **leque** e flutuam em ritmos diferentes.
- Destaques: métricas antes → depois animam (`0,47 → 0,1` com a barra encolhendo).
- Narrativa: número da etapa (`01`, `02`, `03`) com scramble; linha vertical do fluxo liga as etapas; cada parágrafo revela por linha.
- "Outros projetos": hover com tilt e print rolando.

### Easter egg (opcional, divertido)
- Digitar `byte` em qualquer lugar abre um **mini terminal** no canto: `$ byteflow --about` lista a equipe, `--stack`, `--contact` (abre o e-mail). Mostra personalidade técnica para o público dev.

---

## 5. Princípios de performance e acessibilidade (inegociáveis)

- **Só `transform` e `opacity`** (e `clip-path` pontual); nada de animar `width/height/top`.
- **Nenhum conteúdo escondido sem JS**: estados iniciais aplicados via classe adicionada pelo JS; sem JS, tudo aparece.
- **LCP intocado**: título e mockup do hero renderizam imediatamente; animação de entrada começa após o paint.
- **CLS 0**: animações não deslocam layout (espaço reservado).
- **`prefers-reduced-motion`**: desliga Lenis, pin, parallax, cursor, preloader, scramble, linha de fluxo e loops; mantém só fades curtos (≤ 200ms).
- **Mobile/touch**: sem cursor, sem pin horizontal, sem tilt; reveals mais curtos; testar em Android intermediário.
- **Teclado**: foco visível sempre; nada que dependa de hover para revelar informação essencial; botão "pular" no preloader.
- **Âncoras + Lenis**: links `#services`, `#work` etc. passam por `lenis.scrollTo` com offset do header fixo.
- **Limpeza**: todo efeito criado dentro de `useGSAP` (revert automático na desmontagem/troca de rota).
- Metas: Lighthouse Performance ≥ 90 no mobile, INP < 200ms, 60fps no desktop.

---

## 6. Roadmap

| Fase | Entregas | Esforço |
|---|---|---|
| **A — Fundação** ✅ | Instalar GSAP, `@gsap/react`, Lenis · `MotionProvider` (plugins, Lenis↔ScrollTrigger, reduced-motion, âncoras) · tokens · `Reveal`, `SplitReveal`, `Counter`, `Magnetic` · aplicar reveals básicos em todas as seções | 1 dia |
| **B — Assinatura** ✅ | Preloader do logo · ByteCursor · Hero (scramble, mockup 3D + parallax, prints rolando, grid reativo, ticker por velocidade) · Header (esconde/mostra + indicador ativo) | 2 dias |
| **C — Fluxo** | `FlowPath` atravessando a página com o byte viajante · Processo em pin horizontal com logs · odômetros e corrida de barras · leitura guiada da frase de impacto | 2 dias |
| **D — Seções** | Ícones com micro-histórias e spotlight nos serviços · carrossel com inércia/tilt e print rolando · comparativo (glitch × check) · equipe (blocos + duotone + vídeo do Edson) · FAQ com spring · CTA com explosão de bytes · rodapé com wordmark reativo | 2–3 dias |
| **E — Cases e transições** | Transição card → case (View Transitions + fallback em blocos) · animações das páginas de case | 1–2 dias |
| **F — Polimento e QA** | Reduced-motion completo · mobile · Lighthouse/INP · ajuste fino de timings · easter egg (opcional) | 1 dia |

**Total estimado:** 9–11 dias de trabalho. As fases A e B já mudam a percepção do site sozinhas;
C é o diferencial de marca; D–F completam.

---

## 6.1 Status da implementação

**Fase A (feita):** `src/shared/motion/` com `MotionProvider` (Lenis ↔ ScrollTrigger, âncoras com offset, reduced-motion), `tokens.ts`, primitivas `Reveal`, `SplitReveal`, `Counter`, `Magnetic`; script inicial no `<html>` (`js-motion`/`intro`/`reduced`, com fallback de 4s). Reveals aplicados em todos os títulos de seção, grades de serviços, processo, projetos, comparativo, equipe, FAQ e CTA; números com odômetro.

**Fase B (feita):** `Preloader` (logo se monta, byte quica e voa até o header, tela abre em blocos — só na 1ª visita da sessão, pula com clique/tecla); `ByteCursor` (anel em links, pílula “ver case →” nos projetos); hero com eyebrow digitando, título decodificando, mockup 3D em camadas com parallax e tilt, print “vivo”, grade com lanterna no cursor, ticker que acelera/inclina com o scroll, botões magnéticos; header que esconde/reaparece com pílula da seção ativa.

Ainda não verificado: comportamento real com `prefers-reduced-motion` ativo no sistema (a lógica existe, mas não foi testada no navegador) e métricas Lighthouse.

## 7. Riscos e como evitar

| Risco | Mitigação |
|---|---|
| Excesso de animação cansa / parece template | Uma ideia forte por seção; revisar cada fase perguntando "isso ajuda a ler ou só enfeita?" |
| Enjoo de movimento | Reduced-motion completo; parallax de baixa amplitude; sem scroll-jacking fora do pin do processo |
| Performance ruim no mobile | Versão simplificada para touch; testar em aparelho real; orçamento de JS |
| Lenis quebrando âncoras, foco ou scroll dentro de modais | Tratar no `MotionProvider`; `data-lenis-prevent` em áreas com scroll próprio (carrossel) |
| Hidratação / flashes | Estados iniciais só após `useGSAP` montar; nada de esconder conteúdo no SSR |
| View Transitions sem suporte (Firefox/Safari antigos) | Fallback em blocos com GSAP |

---

## 8. Assets necessários

- **Vídeo curto do Edson** (5–8s, loop, sem áudio, ≤ 1 MB, WebM + MP4) para o card da equipe.
- (Opcional) Prints longos (página inteira) dos projetos para o efeito de "print rolando" — hoje os prints têm ~961px de altura; páginas inteiras deixam o efeito mais rico.
