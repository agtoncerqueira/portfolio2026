<script setup>

const { fetchCategories } = useYampiCatalog();  
const { data: categories, pending, error } = fetchCategories();

const defaultColors = {
  '--primary': '#04fe75',
  '--secondary': '#00c052',
  '--light': '#edfff5',
  '--medium': '#afffd3',
  '--dark': '#00c052',
}
const theme = reactive({ ...defaultColors })

const runtimeConfig = useRuntimeConfig();
const storyblokVersion = runtimeConfig.public.storyblokVersion;
const story = ref()
const storyblokApi = useStoryblokApi()

const { data } = await storyblokApi.get('cdn/stories/site-config', {
  version: storyblokVersion,
  resolve_links: 'url',
})

story.value = data.story
const route = useRoute()
const slug = route.params.slug

const blok = {
    height: 300,
    images : [
      {
        banner: { 
          filename: "https://a.storyblok.com/f/286299136854790/1920x768/904076fcbd/formandos-nono-ano.jpg" 
        }
      }
    ]
}

watch(categories, (newValue) => {
  
}, { immediate: true });


  onMounted(() => {
    if (slug && slug[0] !== undefined && slug[0] === 'site-config') {
      useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
        disableClicks: true,
      })
    }
  })

  const cssVariables = computed(() => {
    theme['--primary'] = story.value.content.primary.color
    theme['--secondary'] = story.value.content.secondary.color
    theme['--light'] = story.value.content.light.color
    theme['--medium'] = story.value.content.medium.color
    theme['--dark'] = story.value.content.dark.color
    return theme
  })
</script>

<template>
 <div class="bg-white" :style="cssVariables">
  <Header v-if="story"
        :logo="story.content.header_logo"
        :disable_transparency="story.content.header_disable_transparency"
        :nav="story.content.header_nav"
        :buttons="story.content.header_buttons"
        :light="story.content.header_light"
      />
  <CarouselSection :blok="blok"/>

      <div>
        <main class="mx-auto max-w-8xl px-4 sm:px-6 lg:px-6">

          <div class="flex space-x-4 text-center justify-center border-b border-gray-200 pt-8 pb-2">
            <form class="">
                <h3 class="text-md font-extrabold mb-2">Categorias:</h3>
                <div v-if="pending">Carregando categorias...</div>
                <div v-else-if="error">Erro ao carregar categorias: {{ error.message }}</div>
                <ul v-if="categories?.data && categories?.data.length > 0" role="list" class="space-y-4 pb-6 text-sm font-medium text-gray-900">
                  <li class="inline-block">
                    <NuxtLink to="/produtos" class="mr-4 bg-light text-black text-md font-medium me-2 px-2.5 py-2 rounded-full cursor-pointer 
                    transition-all delay-150 duration-200 ease-in-out hover:bg-medium hover:text-white" activeClass="categories-active-link"
                    exactActiveClass="categories-exact-active-link">
                      Todas Categorias
                    </NuxtLink></li>
                  <li v-for="category in categories?.data" :key="category.id" class="inline-block">
                    <NuxtLink :to="`/produtos/${category.slug}`" class="mr-4 bg-light text-black text-md font-medium me-2 px-2.5 py-2
                    rounded-full cursor-pointer hover:bg-medium transition-all delay-150 duration-200 ease-in-out hover:bg-medium hover:text-white" 
                    activeClass="categories-active-link" exactActiveClass="categories-exact-active-link">
                      {{ category.name  }}
                    </NuxtLink>
                  </li>
                </ul>
                <div v-else>Nenhuma categoria encontrada.</div>
              </form>
          </div>
  
          <section aria-labelledby="products-heading" class="pt-6 pb-24">
            <h2 id="products-heading" class="sr-only">Produtos</h2>
            
            <div class="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3">
              <!-- Product grid -->
              <div class="lg:col-span-3">
                <slot />
              </div>
            </div>
          </section>
        </main>
      </div>
      <LazyFooter v-if="story" hydrate-on-visible
        :logo="story.content.footer_logo"
        :tiktok="story.content.tiktok"
        :pinterest="story.content.pinterest"
        :instagram="story.content.instagram"
        :youtube="story.content.youtube"
      />
    </div>
</template>

<style scoped>

.categories-exact-active-link {
  border-bottom: 2px solid var(--primary);
}

.categories-active-link {
  background-color: var(--medium);
  color: #ffffff;
}
.categories-exact-active-link:hover {
  opacity: 85%;
}
</style>
