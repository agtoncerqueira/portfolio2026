<template>
    <div class="p-8 bg-white shadow-xl rounded-xl " ref="productListRef">
      <span v-if="categorySlug" class="text-gray-800 capitalize mb-6">
        Produtos em: <b>"{{ SlugConverted }}"</b>
      </span>
      <span v-else class="text-gray-800 mb-6">
        (Todos)
      </span>
      <div v-if="pending" class="text-center py-10">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p class="mt-2 text-green-600">Carregando Produtos...</p>
      </div>
      <div v-else-if="error" class="text-red-500 p-4 bg-red-100 border border-red-400 rounded">Erro ao carregar produtos: {{ error.statusMessage }}</div>
      
      <div v-else-if="products && products.length > 0" class="grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
        <LazyProductCard hydrate-on-visible
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    
      <div v-else class="text-center py-8 text-gray-500">Nenhum produto encontrado.</div>

      <ClientOnly v-if="products">
      <LazyPagination hydrate-on-visible
        :current-page="pagination.currentPage"
        :total-pages="pagination.totalPages"
        :total-items="pagination.totalItems"
        :set-page="setPage"
        class="mt-8"
      />
      <template #fallback>
        <div class="h-10 w-full text-center text-sm text-gray-400 mt-8">
            Carregando paginação...
        </div>
      </template>
      </ClientOnly>
    </div>
  </template>
  
  <script setup>
  const route = useRoute()
  const config = useRuntimeConfig()
  const { fetchProducts } = useYampiCatalog()
  const productListRef = ref(null)
  const categorySlug = computed(() => route.params.slug);
  
  const { 
    products, 
    pagination, 
    pending, 
    error, 
    setPage // Pega a função 'setPage'
  } = fetchProducts({ 
    categorySlug: categorySlug 
  })
  
  const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
      return str; // Handle empty strings or non-string inputs
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  let SlugConverted = capitalizeFirstLetter(categorySlug.value)

  useHead({
     title: `${ SlugConverted || 'Todos os produtos' }`,
     meta: [
    { property: 'og:title', content: `${ SlugConverted || 'Todos os produtos' }` },
    { property: 'og:description', content: 'Vista-se com mais estilo, explore nosso coleção de camisetas para interclasse, terceirão, nono ano, cursos universitários , uniformes empresariais, camisetas polo, camiseta básica. Temos peças únicas e com um visual profissional, explorando designs exclusivos que vão além do comum.' },
    { property: 'og:url', content: `${config.public.appURL}produtos` },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: `${ SlugConverted || 'Todos os produtos' }` },
    { property: 'og:description', content: 'Vista-se com mais estilo, explore nosso coleção de camisetas para interclasse, terceirão, nono ano, cursos universitários , uniformes empresariais, camisetas polo, camiseta básica. Temos peças únicas e com um visual profissional, explorando designs exclusivos que vão além do comum.' },
    { property: 'og:url', content: `${config.public.appURL}produtos` },
    { property: 'og:type', content: 'website' },
    // twitter card
    {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${ SlugConverted || 'Todos os produtos' }`,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `${process.env.APP_URL}`,
        },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Vista-se com mais estilo, explore nosso coleção de camisetas para interclasse, terceirão, nono ano, cursos universitários , uniformes empresariais, camisetas polo, camiseta básica. Temos peças únicas e com um visual profissional, explorando designs exclusivos que vão além do comum.',
        },
        {
          hid: 'twitter:image', name: 'twitter:image', content: '/formandos-nono-ano.jpg',
        },
  ],
})

  const scrollToTop = () => {
    if (productListRef.value) {
      productListRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }


  watch([pagination.value?.currentPage, categorySlug], ([newPage, newSlug], [oldPage, oldSlug]) => {
    // Se a página mudou OU o slug mudou
    if (newPage !== oldPage || newSlug !== oldSlug) {
        scrollToTop();
    }
  }, { immediate: true });

  </script>