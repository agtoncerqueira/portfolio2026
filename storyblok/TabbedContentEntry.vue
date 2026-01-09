<script setup>
const props = defineProps({ blok: Object })

const optimizedImage = computed(() =>
  getOptimizedImage(props.blok.image, 800, 450),
)
</script>
<template>
  <section class="grid gap-6 pb-6 text-black md:grid-cols-2" v-editable="blok">
    <img
      v-if="blok?.image?.filename"
      :src="optimizedImage"
      :alt="blok.image?.alt"
      loading="lazy"
      class="rounded-lg md:order-1" v-motion-fade-visible
    />
    <div class="md:order-0">
      
      <RichText :text="blok.description" v-motion-fade-visible/>
      <Button
        v-for="button in blok.button"
        class="mt-6"
        :key="button._uid"
        :button="button"
        v-motion-fade-visible
      />
    </div>
  </section>
</template>
