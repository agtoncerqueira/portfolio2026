<template>
    <transition name="fade" mode="out-in">
    <article class="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden">
    <div>
      <img loading="lazy" class="product-image object-cover h-80 w-full pointer-events-auto cursor-pointer" :src="product.firstImage.data.thumb.url"
       :height="product.firstImage.data.thumb.height" :width="product.firstImage.data.thumb.width" :alt="product.name" @click="() => showImg(index)" />
      <VueEasyLightbox
          :visible="visibleRef"
          :imgs="product.firstImage.data.large.url"
          :index="indexRef"
          @hide="onHide"
        >
        <template v-slot:toolbar="{ toolbarMethods }">
          <button @click="toolbarMethods.zoomIn">zoom in</button>
          <button @click="toolbarMethods.zoomOut">zoom out</button>
        </template>
        </VueEasyLightbox>
    </div>

    <div class="flex flex-col gap-1 mt-4 px-4">
      <h2 class="product-name text-lg font-semibold text-gray-800 dark:text-gray-50">{{ product.name }}</h2>
    </div>

    <div class="flex gap-4 mt-4 px-4">
      <span class="sr-only">Categoria</span>
      <button type="type" role="button" class="badgetButton-product bg-light text-black text-xs font-medium me-2 px-2.5 py-0.5 rounded-full cursor-pointer" 
        @click="goCategory(product.categories.data[0].slug)"><span>{{ product.categories.data[0].name }}</span></button>
    </div>

    <div class="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
      <button type="button" @click="whatsappContact(product.name)"
        class="orcamentoButton w-full flex justify-center items-center font-bold cursor-pointer transition-all duration-300 hover:scale-105 text-gray-800 dark:text-gray-50">
        <span class="text-base bg-primary text-dark px-4 py-4 rounded-full hover:no-underline">Solicitar orçamento 
          <img loading="lazy" src="/assets/icons/whatsapp-logo.svg" width="30px" height="30px" alt="WhatsApp Button" class="inline ml-2"/>
        </span>
      </button>
    </div>
  </article>
  </transition>
</template>

<script setup>
  import { defineLazyHydrationComponent } from '#imports';

  const props = defineProps({ product: Object })
  const visibleRef = ref(false)
  const indexRef = ref(0)
  const router = useRouter()
  const runtimeConfig = useRuntimeConfig()
  const whassAppURL = runtimeConfig.public.whassAppURL

  const whatsappContact = (text) => {
    let redirectLink = whassAppURL + "?text=Oi, gostaria de um orçamento do item do site: *" + text + "*"
    window.location.href = redirectLink    
  }

  const goCategory = (slug) => {
    router.push({
      path: `/produtos/${slug}`,
    });
  }

  const showImg = (index) => {
    indexRef.value = index
    visibleRef.value = true
  }
  const onHide = () => (visibleRef.value = false)
</script>