# Plano de ajuste de identidade visual — ByteFlow

> Objetivo: transformar o site atual (um template de agência de **marketing**) na presença
> digital de um **estúdio de desenvolvimento de software** — sites, e-commerces, apps e
> sistemas — usando projetos e informações reais do portfólio de Gustavo Rodrigues
> (https://portifolio-fe-six.vercel.app/pt-BR).

---

## 1. Diagnóstico do estado atual

| Área | Problema | Impacto |
|---|---|---|
| Posicionamento | Toda a copy fala de marketing digital, ROI, leads, campanhas | Não comunica o que a ByteFlow realmente faz |
| Credibilidade | Números inventados ("2k+ histórias", "$250K+", "+65% ROI") e depoimentos fictícios com avatares do pravatar.cc | Risco de reputação; cliente técnico percebe na hora |
| Projetos | 4 cases fictícios (Growth360, PureGlow, UrbanFit, ChronoLux) | Portfólio real não aparece |
| Marca | 3 símbolos diferentes: header (cruz branca), footer (cruz verde), Pricing (estrela) | Logo inconsistente |
| Créditos | Rodapé "Criado por Khurram", copyright 2024 | Herança do template |
| Tokens | `--color-primary`/`--color-dark` existem no `globals.css`, mas os componentes usam hex fixo (`#002329`, `#50c878`, `#0d0d0d`, `#f5f5f5`) | Difícil evoluir a paleta |
| Tipografia | Só Inter, sem fonte de display | Visual genérico de template |
| Imagens | Foto de banco ("Business professional"), logos de marcas fictícias, thumb de vídeo de reunião | Não mostra produto/código |
| i18n | Header e Footer com texto PT fixo — aparecem em português em `/en` | Versão EN quebrada |
| Bugs | `{children};` no layout renderiza um `;` na página; CTA aponta para `/contact` (404); newsletter sem backend | Detalhes de acabamento |
| Faltando | Favicon, Open Graph image, `metadata` por idioma | SEO/compartilhamento fraco |

---

## 2. Posicionamento e voz

**Quem é a ByteFlow:** estúdio de desenvolvimento que entrega produto digital de ponta a ponta —
do design ao deploy — para empresas e também como **parceiro white-label para agências**.

**Promessa:** software sob medida, rápido e pronto para escalar.

**Pilares de mensagem**
1. **Engenharia de verdade** — Next.js, TypeScript, Node.js, Docker, CI/CD.
2. **Performance mensurável** — Core Web Vitals, SEO técnico, tempo de resposta (ex.: sitemap 30s → 2,8s; CLS 0,47 → 0,1 na FutBuyNow).
3. **Comunicação direta** — quem conversa com o cliente é quem desenvolve.
4. **Produto completo** — checkout, pagamentos (PIX/Stripe), frete, i18n, analytics, painel admin.

**Tom de voz:** técnico sem jargão excessivo, direto, confiante, em primeira pessoa do plural.
Nada de números que não possam ser comprovados.

---

## 3. Sistema visual proposto

### 3.1 Paleta (evolução, não ruptura)

Mantém o petróleo + esmeralda que já são da ByteFlow e adiciona um acento de "código"
para destaques pontuais — conversa com o portfólio pessoal (verde profundo + lima) sem copiá-lo.

| Token | Valor | Uso |
|---|---|---|
| `--color-ink` | `#002329` | Fundos escuros, header/footer, texto forte |
| `--color-ink-2` | `#013A3F` | Cards sobre fundo escuro, hovers |
| `--color-primary` | `#50C878` | CTA, ícones, foco |
| `--color-primary-hover` | `#3DB862` | Hover de CTA |
| `--color-accent` | `#D4F534` | Destaques mínimos: métricas, badge "novo", seleção de texto |
| `--color-surface` | `#FFFFFF` | Fundo claro |
| `--color-surface-2` | `#F4F7F6` | Cards claros (substitui `#f5f5f5`, levemente esverdeado) |
| `--color-text` | `#0D0D0D` | Texto em fundo claro |
| `--color-muted` | `rgb(13 13 13 / 0.65)` | Texto secundário |

Regra: **um** CTA verde por dobra; acento lima só em números/métricas.
Checar contraste AA (esmeralda sobre `#002329` passa; texto branco sobre esmeralda **não** — manter texto escuro no botão).

### 3.2 Tipografia

| Papel | Fonte | Observação |
|---|---|---|
| Display (h1/h2) | **Space Grotesk** 600/700 | Geométrica com cara de tech, via `next/font/google` |
| Texto | **Inter** 400/500 | Já em uso |
| Rótulos/tags/métricas | **JetBrains Mono** 500 | Reforça o "estúdio de código" (tags de stack, eyebrows tipo `// projetos`) |

Escala sugerida (clamp): h1 `clamp(40px,6vw,64px)` · h2 `clamp(30px,4.5vw,44px)` · h3 `20–22px` · body `16–17px` · label `12–13px` uppercase tracking `0.12em`.

### 3.3 Logo ✅

**Símbolo:** um "B" construído com blocos — uma haste e dois módulos arredondados (os *bytes*) — com um byte lima saindo do módulo inferior (o *flow*). Grade 32×32, legível até 16px.

- Cores: corpo esmeralda `#50C878` + byte lima `#D4F534` sobre petróleo `#002329`. Versões: colorida, petróleo (fundo claro) e branca (`public/brand/`).
- Wordmark: "ByteFlow" em Space Grotesk 700, tracking −0,02em, ao lado do símbolo (gap 10px).
- Código: `src/shared/ui/Logo.tsx` (`Logo`, `LogoSymbol`, `LOGO_BODY_PATH`, `LOGO_BYTE_PATH`) — usado no header, footer, comparativo, marca d'água do CTA, favicon (`src/app/icon.svg`), apple-icon e imagem OG.
- Alternativas avaliadas: `docs/brand/opcoes-de-logo.html` (A — B de blocos, B — blocos + byte ✔, C — B em linha, D — fluxo >>).

### 3.4 Imagens e elementos gráficos

- **Hero:** trocar a foto de banco por um mockup composto de projetos reais (FutCustom, FutBuyNow, TeflyClass) em frames de browser/celular.
- **Ticker de logos:** substituir marcas fictícias pela stack (Next.js, React, Node.js, TypeScript, Docker, AWS) — *feito nesta etapa em versão texto*; próxima etapa: ícones SVG monocromáticos.
- **Vídeo "Por dentro do nosso processo":** trocar a thumb de reunião por gravação de tela do fluxo (Figma → código → deploy) ou remover o botão de play até haver vídeo.
- Grid de fundo (`bg-grid.png`) pode virar padrão de pontos/linhas de código em SVG — mais leve e on-brand.
- Ícones: manter `lucide-react` com stroke 1.75 consistente.

### 3.5 Componentes base (design system mínimo)

Criar em `src/shared/ui/`:
- `Button` — variantes `primary` (esmeralda), `ghost` (vidro), `outline`; tamanhos `md`/`lg`.
- `SectionHeader` — eyebrow mono + título display + subtítulo; hoje repetido em 7 seções.
- `Tag` — chip de stack (mono, borda sutil).
- `Card` — raio 24px, `surface-2` no claro, `ink-2` no escuro.
- Escala de raio: 12 / 20 / 24 / 40 px. Espaçamento vertical de seção: 96px mobile / 128px desktop.

---

## 4. Conteúdo (fonte: portfólio)

| Seção | Antes | Depois |
|---|---|---|
| Hero | Marketing / ROI | Software sob medida, do design ao deploy |
| Serviços | Marketing, consultoria, leads… | Web, E-commerce & pagamentos, Apps mobile, Sistemas & dashboards, Performance & SEO técnico, DevOps & Cloud |
| Diferenciais | Métricas fictícias | 5+ anos, 25+ projetos concluídos, 10x (sitemap FutBuyNow) |
| Projetos | 4 cases fictícios | FutBuyNow, FutCustom, TeflyClass, São João Arcoverde, Ecommerce Book, Frontend News, Biomedicina em Ação, Startup Design — com stack e links |
| Equipe | — | Seção com Gustavo Rodrigues (fundador) e Edson Luis (Dev Full Stack & Editor de Vídeo), habilidades e links |
| Comparativo | "Outras agências" de marketing | Desenvolvimento comum × ByteFlow |
| Depoimentos | 6 fictícios | **Removidos da home** até haver depoimentos reais (componente mantido) |
| FAQ | Marketing | Tipos de projeto, stack, prazo, manutenção, white-label, como começar |
| CTA / Rodapé | `/contact` (404), newsletter sem backend, "Criado por Khurram" | E-mail/LinkedIn/GitHub reais, crédito correto, ano dinâmico |

---

## 5. Roadmap de execução

### Fase 1 — Conteúdo e credibilidade ✅ (feito nesta etapa)
- [x] Copy reposicionada (PT-BR e EN) para desenvolvimento de software
- [x] Projetos reais do portfólio com capa, stack, destaques e links
- [x] Seção "Sobre" com o fundador
- [x] Remoção de métricas e depoimentos fictícios; ticker com stack real
- [x] Header/Footer internacionalizados, âncoras de navegação funcionando
- [x] Contato real (`src/shared/config/contact.ts`) e crédito no rodapé
- [x] Correção do `;` solto no layout e do CTA para `/contact`

### Fase 2 — Fundação visual ✅ (feito)
- [x] Paleta da seção 3.1 em `@theme` (`ink`, `ink-2`, `primary`, `accent`, `fg`, `surface`, `surface-2`) — nenhum hex fixo restante nas classes
- [x] Space Grotesk (títulos) + Inter (texto) + JetBrains Mono (rótulos/tags/métricas) via `next/font`
- [x] `src/shared/ui`: `Logo`/`LogoSymbol`, `Button`, `SectionHeader`/`Eyebrow`, `Tag`, `Card` — seções refatoradas
- [x] `icon.svg`, `apple-icon` e `opengraph-image` gerados pelo App Router; `metadataBase` definido
- [x] Extras: header fixo com blur, eyebrows `// seção` em PT/EN, foco visível, seleção em lima, `prefers-reduced-motion`, correção da máscara do grid de fundo

### Fase 3 — Imagens e direção de arte ✅ (feito)
- [x] Hero com mockup de projetos reais (FutCustom + FutBuyNow em janelas de navegador, São João em celular) — `hero-image.png` removida
- [x] Ticker com ícones SVG da stack (`simple-icons`, CC0, cor única via `StackIcon`)
- [x] Vídeo fictício substituído pelas 4 etapas do processo (Descoberta → Design → Desenvolvimento → Deploy)
- [x] `GridBackdrop` em SVG (grade + pontos esmeralda) no lugar de `bg-grid.png` + `bg-mask.svg`; imagens antigas do template removidas
- [x] Páginas de case `/projetos/[slug]` (PT/EN) com Contexto → Stack & Decisões → Resultado, destaques, stack, links, outros projetos e metadata por case
- [x] Header/Footer com links que funcionam fora da home (`useLocalePaths`)
- [x] Correção: breakpoint `lg` em `rem` (em `px` ficava antes do `sm` e quebrava `lg:` em grids)

### Extra ✅
- [x] Logo próprio (seção 3.3)
- [x] Seletor de idioma PT/EN no header (desktop e mobile), mantendo a página atual e salvando a preferência

### Fase 4 — Polimento e conversão
- [ ] Animações — ver plano dedicado em `docs/PLANO-ANIMACOES.md`
- [ ] Formulário de contato real (Resend / Formspree) ou WhatsApp
- [ ] `generateMetadata` por idioma, `sitemap.ts`, `robots.ts`
- [ ] Depoimentos reais (FutCustom, FutBuyNow, ETEJCG) com autorização
- [ ] Lighthouse ≥ 95 em Performance/SEO/Acessibilidade — o próprio site vira prova da promessa de performance

---

## 6. Pontos para decidir

1. **E-mail comercial:** hoje o contato usa o e-mail pessoal. Criar `contato@byteflow…` e trocar em `src/shared/config/contact.ts`.
2. **Foto do fundador:** usei a foto do portfólio em `public/founder.png` (1,8 MB — vale exportar uma versão WebP menor).
3. **Logos de clientes:** pedir autorização a FutCustom/FutBuyNow para exibir as marcas.
4. **Domínio próprio** para a ByteFlow (hoje `byteflow-fe.vercel.app`).
