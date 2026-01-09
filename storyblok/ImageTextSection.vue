<script setup>
const props = defineProps({ blok: Object })

const fixedHeightImages = computed(() => {
  if (props.blok.image_layout !== 'fixed-height') return false
  return {
    mobile: getOptimizedImage(props.blok.image, 600, 300),
    tablet: getOptimizedImage(props.blok.image, 1000, 500),
    desktop: getOptimizedImage(props.blok.image, 1000, 1250),
  }
})

const optimizedImage = computed(() => getOptimizedImage(props.blok.image, 1000))
const optimizedBgImage = computed(() =>
  getOptimizedImage(props.blok.background_image, 1000),
)

const textColor = computed(() => {
  return 'text-' + props.blok.text_color
})
</script>

<template>
  <section
    v-editable="blok"
    class="page-section image-text-section"
    :class="'bg-' + blok.background_color"
    style="
      background-size: cover;
      background-position: left;
      background-repeat: no-repeat;
    "
    :style="{ 'background-image': 'url(' + optimizedBgImage + ')' }"
  >
    <div
      class="container grid items-center gap-6 sm:gap-10 md:gap-12 lg:grid-cols-2 px-12 mx-auto py-16">
      <div
        class="order-last text-left"
        :class="[blok.reverse_layout ? '' : 'lg:order-first', textColor]"
      >
        <Headline v-if="blok.headline" size="medium" class="mb-2 font-extrabold" v-motion-slide-visible-right>
          {{ blok.headline }}
        </Headline>
        <RichText v-if="blok.text" :text="blok.text" :class="textColor" class="text-xl" v-motion-slide-visible-right/>
        
        
          <Button
            v-for="button in blok.button"
            :key="button._uid"
            :button="button"
          />
        
      </div>
      <div>
        <div v-if="blok.image.filename" v-motion-fade-visible>
          <img
            v-if="!fixedHeightImages"
            loading="lazy"
            :src="optimizedImage"
            :alt="blok.image.alt"
            class="pointer-events-none rounded-lg shadow-2xl"
          />
          <img
            v-if="fixedHeightImages"
            loading="lazy"
            :src="fixedHeightImages.mobile"
            :alt="blok.image.alt"
            class="pointer-events-none rounded-lg shadow-2xl md:invisible md:hidden"
          />
          <img
            v-if="fixedHeightImages"
            loading="lazy"
            :src="fixedHeightImages.tablet"
            :alt="blok.image.alt"
            class="pointer-events-none invisible hidden rounded-lg shadow-2xl md:visible md:block lg:invisible lg:hidden"
          />
          <img
            v-if="fixedHeightImages"
            loading="lazy"
            :src="fixedHeightImages.desktop"
            :alt="blok.image.alt"
            class="pointer-events-none invisible hidden rounded-lg shadow-2xl lg:visible lg:block"
          />
        </div>
      </div>
    </div>
  </section>
</template>
