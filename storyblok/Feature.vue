<template>
<div v-editable="blok" class="w-full">
  
  <div class="group flex relative overflow-hidden rounded-xl shadow-2xl transform" v-motion-fade-visible>
    <div
      class="flex flex-col h-[608px] w-full bg-cover bg-center rounded-xl p-8 justify-end text-white bg-gray-200 bg-blend-multiply transition-all duration-300 pointer-events-auto"
      >
      <img
          :src="optimizedImage"
          loading="lazy"
          class="absolute top-0 left-0 z-0 w-full h-full object-cover pointer-events-none hover:scale-[1.02]"
        />
        
      <div class="relative z-10 mx-auto">
        
        <h3 class="text-2xl font-semibold leading-snug">
          {{ blok.headline }}
        </h3>
        <Button
          v-for="button in blok.buttons"
          :key="button._uid"
          :button="button"
          class="mt-auto"
        />
      </div>
      <div class="absolute inset-0 bg-dark opacity-10 rounded-xl transition-opacity duration-300 group-hover:opacity-40" @click="showImg(index)"></div>
    </div>
  </div>
  <VueEasyLightbox
          :visible="visibleRef"
          :imgs="optimizedImage"
          :index="indexRef"
          @hide="onHide"
        >
        <template v-slot:toolbar="{ toolbarMethods }">
          <button @click="toolbarMethods.zoomIn">zoom in</button>
          <button @click="toolbarMethods.zoomOut">zoom out</button>
        </template>
        </VueEasyLightbox>
</div>
</template>

<script setup>
const props = defineProps({ blok: Object, height: Number });

const visibleRef = ref(false)
const indexRef = ref(0)

const optimizedImage = computed(() =>
  getOptimizedImage(props.blok.image, 600),
)
const showImg = (index) => {
    indexRef.value = index
    visibleRef.value = true
  }
const onHide = () => (visibleRef.value = false)
  
</script>
