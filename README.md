# Emagrecer Blog - Astro 5 + WordPress Headless + Tailwind CSS 4

Blog de emagrecimento, nutrição, treinos e bem-estar desenvolvido com **Astro 5**, **TypeScript**, **Tailwind CSS 4** e **WordPress Headless (WPGraphQL)**.

## 🚀 Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Astro** | 5.x | Framework principal (SSG) |
| **TypeScript** | 5.x | Tipagem estática |
| **Tailwind CSS** | 4.x | Estilização utilitária |
| **WordPress** | Headless | CMS via WPGraphQL |
| **Sharp** | 0.33+ | Otimização de imagens |
| **Pagefind** | 1.x | Busca local estática |
| **Vercel** | - | Deploy e hosting |

## 📋 Requisitos

- Node.js >= 20.0.0
- npm >= 10.0.0 (ou pnpm/yarn)
- WordPress com plugin **WPGraphQL** instalado e configurado

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/emagrecer-blog.git
cd emagrecer-blog

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais
```

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```env
# Site
PUBLIC_SITE_URL=https://emagrecer.xx.kg
PUBLIC_SITE_NAME=Emagrecer
PUBLIC_SITE_DESCRIPTION=Sua jornada saudável para emagrecimento, nutrição, treinos e bem-estar

# WordPress Headless CMS
WPGRAPHQL_URL=https://seu-wordpress.com/graphql
WP_REST_URL=https://seu-wordpress.com/wp-json

# Analytics (opcional)
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxx

# Newsletter (interface apenas - sem acoplamento)
PUBLIC_NEWSLETTER_ENDPOINT=https://api.seu-provedor.com/subscribe
PUBLIC_NEWSLETTER_API_KEY=sua-chave-api

# Build
BUILD_MODE=static
```

### WordPress (WPGraphQL)

Plugins necessários no WordPress:
- **WPGraphQL** (obrigatório)
- **WPGraphQL Yoast SEO** (para SEO)
- **WPGraphQL Custom Post Types** (se usar CPTs)
- **WPGraphQL Media Library** (para imagens)

Configuração recomendada:
1. Habilite GraphQL em: Settings → GraphQL
2. Configure CORS para permitir seu domínio Astro
3. Teste em: `https://seu-site.com/graphql`

## 🏃‍♂️ Desenvolvimento

```bash
# Inicia servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint

# Format
npm run format

# Type check
npm run typecheck

# Gerar busca local (após build)
npm run pagefind
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes base (Button, Image, Container)
│   ├── layout/          # Header, Footer, Breadcrumb
│   ├── article/         # ArticleCard, ArticleContent
│   ├── sidebar/         # ArticleSidebar
│   ├── newsletter/      # Newsletter form
│   ├── seo/             # SEO, JSON-LD
│   └── search/          # Search components
├── layouts/
│   ├── MainLayout.astro     # Layout base
│   └── ArticleLayout.astro  # Layout de artigo
├── pages/
│   ├── index.astro          # Home
│   ├── artigo/[slug].astro  # Artigo individual
│   ├── categoria/[slug].astro
│   ├── tag/[slug].astro
│   ├── autor/[slug].astro
│   ├── busca.astro
│   ├── pagina/[page].astro
│   ├── sobre.astro
│   ├── contato.astro
│   ├── politica-de-privacidade.astro
│   └── termos-de-uso.astro
├── lib/
│   ├── graphql.ts       # Cliente GraphQL
│   └── transformers.ts  # WP → Blog types
├── graphql/
│   ├── queries/         # Queries organizadas
│   └── fragments/       # Fragmentos reutilizáveis
├── services/
│   └── wp-graphql.ts    # Serviços WordPress
├── types/
│   ├── wordpress.ts     # Tipos WPGraphQL
│   ├── blog.ts          # Tipos do domínio
│   └── index.ts         # Exports principais
├── utils/
│   └── helpers.ts       # Funções utilitárias
├── styles/
│   └── global.css       # Design system + Tailwind
└── config/
    └── site.ts          # Configuração do site
```

## 🔧 Configuração do WordPress

### Schema GraphQL Necessário

O WordPress deve expor os seguintes tipos:

```graphql
type Post {
  id: ID!
  databaseId: Int!
  title: String!
  slug: String!
  uri: String!
  excerpt: String!
  content: String!
  date: String!
  modified: String!
  featuredImage: MediaItem
  author: User!
  categories: CategoryConnection!
  tags: TagConnection!
  seo: PostSEO
  readingTime: Int
}

type Category {
  id: ID!
  name: String!
  slug: String!
  description: String!
  count: Int!
  uri: String!
}

type Tag { ... }
type User { ... }
type MediaItem { ... }
type PostSEO { ... }
```

### Configuração de SEO (Yoast/RankMath)

Campos necessários no SEO do post:
- `title` (meta title)
- `metaDesc` (meta description)
- `canonical`
- `opengraphTitle`
- `opengraphDescription`
- `opengraphImage`
- `twitterTitle`
- `twitterDescription`
- `twitterImage`
- `metaRobotsNoindex`
- `metaRobotsNofollow`

## 🎨 Design System

### Cores (Vitality Editorial System)

```css
/* Primary */
--primary: #006E1C;           /* Deep Forest */
--primary-container: #4BAF4F; /* Primary Green */

/* Surface */
--surface: #FCF9F8;           /* Background */
--surface-container: #F0EDED; /* Cards */

/* Semantic */
--on-surface: #1C1B1B;        /* Texto principal */
--on-surface-variant: #3F4A3C; /* Texto secundário */
--outline-variant: #BECAB8;   /* Bordas */
```

### Tipografia (Inter)

| Estilo | Tamanho | Peso | Line-height |
|--------|---------|------|-------------|
| Display LG | 48px | 700 | 1.1 |
| Display LG Mobile | 36px | 700 | 1.2 |
| Headline MD | 32px | 600 | 1.3 |
| Headline SM | 24px | 600 | 1.4 |
| Body LG | 18px | 400 | 1.7 |
| Body MD | 16px | 400 | 1.6 |
| Label Caps | 12px | 600 | 1.2 |

### Espaçamento

- Unidade base: 8px
- Gap container: 24px
- Margin mobile: 20px
- Section gap: 80px
- Container max: 1200px
- Content max: 720px

## 🖼️ Otimização de Imagens

```astro
---
import Image from '@/components/ui/Image.astro';
---

<!-- Imagem local -->
<Image
  src={import('../assets/hero.jpg')}
  alt="Descrição"
  width={800}
  height={600}
  priority
/>

<!-- Imagem externa (WordPress) -->
<Image
  src="https://wp.com/wp-content/uploads/hero.jpg"
  alt="Descrição"
  width={800}
  height={600}
  loading="lazy"
/>
```

Formatos gerados automaticamente: **AVIF**, **WebP**, **JPEG** (fallback)

## 🔍 Busca Local (Pagefind)

```bash
# Após build de produção
npm run build
npm run pagefind
```

Inclui UI pronta em `/pagefind/` e indexa todo conteúdo estático.

## 📦 Deploy na Vercel

### Configuração Automática

1. Conecte repositório na Vercel
2. Configure variáveis de ambiente no painel
3. Deploy automático a cada push

### Vercel.json (opcional)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "regions": ["gru1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### Headers de Cache

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/images/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }]
    }
  ]
}
```

## ✅ Checklist de Produção

- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] WordPress acessível via GraphQL
- [ ] Imagens otimizadas (Sharp funcionando)
- [ ] Sitemap gerado (`/sitemap-index.xml`)
- [ ] RSS Feed funcionando (`/rss.xml`)
- [ ] Robots.txt presente (`/robots.txt`)
- [ ] Pagefind indexado (`npm run pagefind`)
- [ ] Lighthouse CI: Performance 100, SEO 100, A11y 100, BP 100
- [ ] View Transitions testadas
- [ ] Formulário de newsletter funcional
- [ ] 404 page personalizada
- [ ] Canonical URLs corretas
- [ ] Open Graph / Twitter Cards validados
- [ ] JSON-LD Schema validado

## 📝 Adicionando Conteúdo

### Novo Artigo (via WordPress)

1. Crie post no WordPress
2. Preencha SEO (Yoast/RankMath)
3. Defina categoria, tags, autor
4. Imagem destacada otimizada
5. Publique → Build automático (webhook) ou manual

### Nova Página Estática

```bash
# 1. Crie arquivo em src/pages/
touch src/pages/nova-pagina.astro

# 2. Use MainLayout
---
import MainLayout from '@/layouts/MainLayout.astro';
---
<MainLayout title="Nova Página" description="Descrição">
  <conteúdo />
</MainLayout>
```

### Novo Componente

```bash
# 1. Crie em src/components/ui/ ou categoria apropriada
# 2. Use TypeScript estrito
# 3. Exporte interface Props
# 4. Documente com JSDoc
```

## 🔒 Segurança

- CSP headers configurados
- Sanitização de HTML do WordPress
- Rate limiting em formulários (via edge functions)
- Headers de segurança: HSTS, X-Frame-Options, etc.
- Variáveis sensíveis apenas no servidor
- Dependências auditadas (`npm audit`)

## 📊 Performance

Metas Lighthouse:
- **Performance**: 100
- **SEO**: 100
- **Accessibility**: 100
- **Best Practices**: 100

Técnicas aplicadas:
- Zero JS por padrão (Astro Islands)
- Imagens AVIF/WebP + lazy loading
- Preload de fontes críticas
- Prefetch inteligente de links
- CSS crítico inline
- Compressão Brotli/Gzip (Vercel)
- Cache headers otimizados

## 🤝 Contribuição

```bash
# 1. Fork do projeto
# 2. Crie branch: git checkout -b feature/nova-funcionalidade
# 3. Commit: git commit -m 'feat: adiciona nova funcionalidade'
# 4. Push: git push origin feature/nova-funcionalidade
# 5. Abra Pull Request
```

Padrões de commit (Conventional Commits):
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` manutenção

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/emagrecer-blog/issues)
- **Email**: dev@emagrecer.xx.kg
- **Documentação WordPress**: [WPGraphQL Docs](https://www.wpgraphql.com/docs/)

---

Feito com ❤️ para uma vida mais saudável.