<script setup>
const props = defineProps({ blok: Object, index: Number })

const height = computed(() => {
  if (props.blok.full_height) {
    return props.index > 0 ? 'min-h-[calc(100vh-128px)]' : 'h-full'
  } else {
    return 'min-h-[500px] md:min-h-[600px]'
  }
})
const textColor = computed(() => {
    if (props.blok.text_color === 'light') {
        return 'text-light'
    } else if (props.blok.text_color === 'dark') {
        return 'text-dark'
    } else if (props.blok.text_color === 'primary') {
        return 'text-primary'
    } else if (props.blok.text_color === 'secondary') {
        return 'text-secondary'
    } else if (props.blok.text_color === 'white') {
        return 'text-white'
    } else if (props.blok.text_color === 'medium') {
        return 'text-medium'
    } else {
        return 'text-black'
  }
})

const textShadow = computed(() => {
  if (props.blok.text_color === 'md') {
    return 'drop-shadow-md'
  } else if (props.blok.text_color === 'lg') {
    return 'drop-shadow-lg'
  } else {
    return 'drop-shadow-xl'
  }
})

const horizontalAlignment = computed(() => {
  return 'text-' + props.blok.text_alignment
})

const boxAlignment = computed(() => {
    let boxAlignment = 'flex-col'
    if(props.blok.box_alignment !== '' ) {
        boxAlignment += ' md:flex-' + props.blok.box_alignment
    }
    return  boxAlignment
})

const verticalAlignment = computed(() => {
  return 'items-' + props.blok.vertical_alignment
})

const optimizedImage = computed(() =>
  getOptimizedImage(props.blok.background_image, 2000),
)

const showVideo = computed(() => {
  if (
    props.blok.background_image?.filename &&
    !props.blok.background_video?.filename
  ) {
    return false
  } else if (props.blok.background_video.filename) {
    return true
  }
})
</script>

<template>
     <section
    class="hero-section relative flex min-h-screen overflow-hidden py-32 px-12"
    :class="[
      height,
      verticalAlignment,
      { '-mt-32': index == 0 },
      blok.overlay !== 'no-overlay' ? blok.overlay : '',
    ]"
    v-editable="blok"
     >
    <div class="relative z-40">
        <div class="flex items-center" :class="boxAlignment">
            <div class="md:w-2/3 mb-8 px-4 md:mb-0 md:px-0">
                <h1 class="mb-4 text-4xl font-black leading-tight md:text-5xl md:leading-tight lg:text-7xl lg:leading-tight"
                    :class="[textColor, textShadow, horizontalAlignment]" v-motion-slide-visible-left>
                    {{ blok.headline }} 
                </h1>
            
                <h2 class="font-display text-xl md:text-1xl lg:text-2xl"
                    :class="[textColor, horizontalAlignment]" v-motion-slide-visible-left>
                    {{ blok.lead }}
                </h2>

                <div
                    class="mx-auto mt-12 flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0"
                    :class="
                    props.blok.text_alignment === 'left'
                        ? 'items-start md:justify-start'
                        : 'items-center md:justify-center'
                    "
                >
                    <Button
                    v-for="button in blok.buttons"
                    :key="button._uid"
                    :button="button"
                    v-motion-slide-visible-left
                    />
                </div>
            </div>
        </div>
  </div>
  
    <!-- <iframe v-if="showVideo" :src="`https://www.youtube-nocookie.com/embed/${blok.background_video.filename}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;" allowfullscreen class="absolute left-0 top-0 z-0 h-full w-full object-cover aspect-video"></iframe> -->
    <!-- <video
      v-if="showVideo"
      loading="lazy"
      :src="blok.background_video.filename"
      :alt="blok.background_video.alt"
      class="absolute left-0 top-0 z-0 h-full w-full object-cover"
      autoplay
      muted
      loop
    ></video> -->
    <img
      v-if="!showVideo && blok.background_image.filename"
      loading="lazy"
      :src="optimizedImage"
      :alt="blok.background_image.alt"
      class="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover"
    />
  </section>
</template>