<script setup>
const props = defineProps({
  logo: Object,
  disable_transparency: Boolean,
  nav: Object,
  buttons: Object,
  light: Boolean,
})

const mobileNavOpen = ref(false)

const toggleMobileNav = () => {
  mobileNavOpen.value = !mobileNavOpen.value
}

const route = useRoute()
watch(route, () => {
  mobileNavOpen.value = false
})

const headerClasses = ref('h-24')
const logoScale = ref('scale-100')

const headerBg = computed(() => {
  return props.light ? 'bg-white' : 'bg-neutral-900'
})

const headerTransparency = computed(() => {
  return props.disable_transparency ? '' : 'bg-opacity-80 backdrop-blur-lg'
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      headerClasses.value = ' shadow-md h-20'
      logoScale.value = 'scale-75'
    } else {
      headerClasses.value = 'h-24'
      logoScale.value = 'scale-100'
    }
  })
})
</script>

<template>
  <header
    class="fixed left-0 top-0 z-[99] w-full transition-all duration-700"
    :class="[headerClasses, headerBg, headerTransparency]"
  >
    <div
      class="mx-auto flex h-full w-full max-w-[1536px] items-center justify-between px-4 lg:justify-start lg:px-8"
    >
      <NuxtLink to="/" class="flex shrink-0">
        <img
          :src="logo.filename"
          :alt="logo.alt"
          :width="logo.filename.width"
          :height="logo.filename.height"
          class="pointer-events-none max-h-[80px] w-full max-w-[180px] origin-left object-contain transition-transform duration-700 xl:max-w-[250px]"
          :class="logoScale"
          aria-label="Voltar à Página Inicial da Aghi Sports"
        />
      </NuxtLink>
      <nav class="main-nav invisible mx-auto hidden lg:visible lg:block">
        <ul v-if="nav">
          <li>
            <NuxtLink to="/" class="nav-item pointer-events-auto cursor-pointer transition-colors" :class="light ? 'text-dark' : 'text-white'" aria-label="Página Inicial">
              Início
            </NuxtLink>
          </li>
          <li v-for="item in nav" :key="item._uid">
            <LazyNavItem hydrate-on-media-query="(min-width: 1023px)"
              class="nav-item"
              :class="light ? 'text-dark' : 'text-white'"
              :item="item"
            />
          </li>
        </ul>
      </nav>
      <nav
        class="invisible ml-auto hidden md:visible md:mr-8 md:block lg:ml-0 lg:mr-0"
      >
        <ul class="flex items-center space-x-4 xl:space-x-8">
          <li v-for="button in buttons" :key="button._uid">
            <Button :button="button" />
          </li>
        </ul>
      </nav>
      <LazyMobileNavToggle hydrate-on-media-query="(max-width: 1023px)"
        @click="toggleMobileNav"
        :color="light ? 'bg-dark' : 'bg-light'"
      />
    </div>
  </header>
  <LazyMobileNav hydrate-on-interaction="click"
    :mobileNavOpen="mobileNavOpen"
    :headerNav="nav"
  />
</template>

<style scoped>
header nav.main-nav a.router-link-active {
  @apply underline decoration-primary decoration-4 underline-offset-4;
}

header nav.main-nav ul {
  @apply flex space-x-4 xl:space-x-8;
}

header nav.main-nav ul li .nav-item {
  @apply relative text-sm xl:text-base;
}
header nav.main-nav ul li .nav-item::after {
  content: '';
  @apply absolute -bottom-1 left-0 h-[1px] w-0 bg-white opacity-0 transition-all duration-500;
}

header nav.main-nav ul li .nav-item:hover::after {
  @apply w-full opacity-100;
}
</style>
