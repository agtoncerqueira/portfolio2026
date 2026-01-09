<template>
    <div class="h-screen">
      
      <SiteConfig v-if="slug && slug[0] === 'site-config'"
      class="px-4 py-32" />
        <NuxtLayout>
          
            <NuxtPage />
          
        </NuxtLayout>
    </div>
</template>

<script setup>

const route = useRoute()
const slug = route.params.slug

const nuxtApp = useNuxtApp();
const loading = ref(false);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: grayscale(1);
}
</style>