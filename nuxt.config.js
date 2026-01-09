export default defineNuxtConfig({
  compatibilityDate: '2025-10-17',
  mode: 'universal',
  ssr: true,
  site: {
    url: process.env.APP_URL,
    name: process.env.APP_TITLE,
  },
  // loading: '~/components/loading.vue',
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'pt-BR'
      },
      viewport:
        'width=device-width, initial-scale=1.0',
      title: process.env.APP_TITLE,
      titleTemplate: `%s - Graphic Designer adn Web Developer`,
      link: [
        { 
          rel: 'canonical', 
          href: `${process.env.APP_URL}`
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {rel: 'dns-prefetch', href: 'https://api.storyblok.com'},
      ],
      meta: [
        {
          name: 'description',
          content:
            "My journey is driven by the intersection of art and logic. With over 15 years of experience, I began my career in the demanding fashion industry, where I refined my eye for aesthetics, composition, and detail as a graphic and textile designer. This solid visual foundation evolved organically into the digital realm. For the past 7 years, I have dived deep into web development, specializing in modern ecosystems like Nuxt.js and Laravel to build robust, high-performance solutions. As a self-taught motion designer and video editor, I don’t just build a website’s structure—I bring a brand’s visual narrative to life. I am a designer who writes code and a developer who values pixel-perfection.",
        },
        {
          name: 'keywords',
          content:
            'My journey is driven by the intersection of art and logic. With over 15 years of experience, I began my career in the demanding fashion industry, where I refined my eye for aesthetics, composition, and detail as a graphic and textile designer. This solid visual foundation evolved organically into the digital realm. For the past 7 years, I have dived deep into web development, specializing in modern ecosystems like Nuxt.js and Laravel to build robust, high-performance solutions. As a self-taught motion designer and video editor, I don’t just build a website’s structure—I bring a brand’s visual narrative to life. I am a designer who writes code and a developer who values pixel-perfection.',
        },
        { name: 'robots', content: '' },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=EmulateIE8',
        },
  
        {
          hid: 'og:title',
          property: 'og:title',
          content: process.env.APP_TITLE,
        },
        { hid: 'og:url', property: 'og:url', content: `${process.env.APP_URL}` },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
          'My journey is driven by the intersection of art and logic. With over 15 years of experience, I began my career in the demanding fashion industry, where I refined my eye for aesthetics, composition, and detail as a graphic and textile designer. This solid visual foundation evolved organically into the digital realm. For the past 7 years, I have dived deep into web development, specializing in modern ecosystems like Nuxt.js and Laravel to build robust, high-performance solutions. As a self-taught motion designer and video editor, I don’t just build a website’s structure—I bring a brand’s visual narrative to life. I am a designer who writes code and a developer who values pixel-perfection.',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            '/cover-aghi-portfolio.jpg',
        },
  
        // twitter card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: process.env.APP_TITLE,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `${process.env.APP_URL}`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'A Lambertiny não apenas produzir eventos; nós materializamos sonhos. Entendemos que um evento público bem executado movimenta a economia, gera turismo e traz orgulho para a população. Atuamos no mercado cenográfico com foco total em transformar o imaginário em realidade. Seja em eventos de grande, médio ou pequeno porte, nossa missão é a excelência estética e a precisão na entrega.',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content:
            '/cover-aghi-portfolio.jpg',
        },
      ],
    }
  },
  css: ['@/assets/css/roboto.css'],
  modules: [[
    '@storyblok/nuxt',
    {
      accessToken: `${process.env.STORYBLOK_KEY}`,
      apiOptions: {
        region: '' // Set 'US" if your space is created in US region (EU default)
      }
    },
  ], '@nuxtjs/tailwindcss', 'nuxt-easy-lightbox', '@vueuse/motion/nuxt', '@nuxtjs/critters', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  sitemap: {
    sources: ["/api/__sitemap__/urls"]
  },
  runtimeConfig: {
      yampiToken: process.env.YAMPI_USER_TOKEN,
      yampiSecretKey: process.env.YAMPI_USER_SECRET_KEY,

    public: {
      storyblokToken: process.env.STORYBLOK_KEY,
      gtmId: process.env.PUBLIC_GTM_CONTAINER_ID,
      storyblokVersion: process.env.STORYBLOK_VERSION,
      yampiAlias: process.env.NUXT_PUBLIC_YAMPI_ALIAS,
      yampiAPI: process.env.NUXT_PUBLIC_YAMPI_API,
      appURL: process.env.APP_URL,
      whassAppURL: process.env.NUXT_PUBLIC_WHATSAPP_URL,
    },
  },
})