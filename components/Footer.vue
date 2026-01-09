<script setup>
defineProps({
  logo: Object,
  tiktok: Object,
  pinterest: Object,
  instagram: Object,
  youtube: Object,
})
const today = new Date()
const currentYear = ref('')

onMounted(() => {
  currentYear.value = today.getFullYear()
})
</script>

<template>
  <footer class="relative w-full bg-gradient-to-r from-dark via-black to-dark" >
    <div
      class="container-full grid cols py-16"
    >
      <div class="sm:col-span-2 md:col-span-3 lg:col-span-2 flex items-center justify-center mx-auto">
        <div>
          <NuxtLink to="/" class="flex mb-8" aria-label="Voltar à Página Inicial da Aghi Sports">
            <img
              loading="lazy"
              :src="logo.filename"
              :alt="logo.alt"
              class="w-[180px] sm:w-[250px] transition-transform origin-left duration-700 pointer-events-none"
            />
          </NuxtLink>
          <!-- <RichText
            :text="about"
            class="text-primary mb-8 text-sm lg:text-base"
          /> -->
          <SocialIcons
            :tiktok="tiktok"
            :pinterest="pinterest"
            :instagram="instagram"
            :youtube="youtube"
          />
        </div>
      </div>
      <!-- <div v-for="index in 3" :key="index">
        <h3 class="text-white font-black text-xl xl:text-2xl mb-5">
          {{ navs['nav_' + index + '_headline'] }}
        </h3>
        <nav>
          <ul class="flex flex-col space-y-3 text-lg">
            <li v-for="item in navs['nav_' + index]" :key="item._uid">
              <NavItem class="text-white hover:text-primary" :item="item" />
            </li>
          </ul>
        </nav>
      </div> -->
    </div>
    <div class="bg-black">
      <div
        class="h-[1px] w-full bg-gradient-to-r from-dark via-secondary to-dark"
      ></div>
      <span class="block mx-auto  pointer-events-none text-center text-secondary">
        aghi.cerqueira@gmail.com
      </span>
      <span class="block mx-auto py-9 pointer-events-none text-center text-light">Aghi Cerqueira @{{ currentYear }}. All rights reserveds.</span>
    </div>
  </footer>
</template>