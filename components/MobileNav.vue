<script setup>
defineProps({
  mobileNavOpen: Boolean,
  headerNav: Object,
})
</script>

<template>
  <Transition name="slide">
    <nav
      v-if="mobileNavOpen"
      class="fixed top-0 z-[99] flex h-screen w-[calc(100%-120px)] min-w-[240px] max-w-[400px] flex-col justify-center bg-[#0B0F19] bg-opacity-80 p-8 shadow-lg backdrop-blur-lg"
    >
      <h2 class="mb-4 font-display text-2xl font-bold uppercase text-white">
        Navegação
      </h2>
      <ul v-if="headerNav" class="flex flex-col space-y-4 text-lg font-light">
        <li>
            <NuxtLink to="/" class="nav-item pointer-events-auto cursor-pointer transition-colors" :class="light ? 'text-dark' : 'text-white'" aria-label="Página Inicial">
              Home
            </NuxtLink>
          </li>
        <li v-for="item in headerNav" :key="item._uid">
          <NavItem class="nav-item text-white" :item="item"/>
        </li>
      </ul>
    </nav>
  </Transition>
</template>
