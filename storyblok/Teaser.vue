<template>
  <section v-editable="blok" class="relative" :class="background_color">
    <div class="py-6 px-4 mx-auto max-w-screen-xl z-40 sm:py-16 lg:px-4">
      <div class="relative z-40 mx-auto text-center" :class="maxWidth">
        <h2 class="mb-4 tracking-tight font-extrabold leading-tight" :class="[classes, textColor]" v-motion-fade-visible>{{ blok.headline }}</h2>
        <p class="text-xl md:text-2xl mb-8" :class="textColor" v-motion-fade-visible>{{ blok.lead }}</p>
        <Button
          v-for="button in blok.buttons"
          :key="button._uid"
          :button="button"
          v-motion-fade-visible
        />
      </div>
      <img
        v-if="blok.background_image.filename"
        loading="lazy"
        :src="optimizedImage"
        :alt="blok.headline"
        class="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover"
      />
    </div>
</section>
</template>

<script setup>

const props = defineProps({ blok: Object})

const classes = computed(() => {
  let classes =
    'py-2 mb-2 md:mb-3'

  if (props.blok.size === 'small') {
    classes += ' text-2xl sm:text-4xl lg:text-5xl'
   } else if (props.blok.size === 'big') {
    classes += ' text-5xl sm:text-6xl lg:text-7xl'
  } else {
    classes += ' text-4xl sm:text-5xl lg:text-6xl'
  }
  return classes
})

const maxWidth = computed(() => {
  let maxWidth = 'max-w-none'

  if (props.blok.grid_width !== '') {
    maxWidth = props.blok.grid_width
  } 
  
  return maxWidth
})

const background_color = computed(() => {
  let background_color = 'bg-white'

  if (props.blok.backgroundColor !== '') {
    background_color = 'bg-' + props.blok.backgroundColor
  } 
  return background_color
})

const optimizedImage = computed(() =>
  getOptimizedImage(props.blok.background_image, 900),
)
const textColor = computed(() => {
  let textColor =
    ' '
  if (props.blok.color === 'white') {
     textColor += ' text-white'    
  } else if (props.blok.color === 'dark') {
     textColor += ' text-dark'
  } else if (props.blok.color === 'secondary') {
     textColor += ' text-secondary'
     console.log("texto dark")
  } else if (props.blok.color === 'primary') {
     textColor += ' text-primary'
  } else if (props.blok.color === 'medium') {
     textColor += ' text-medium'
  } else if (props.blok.color === 'light') {
     textColor += ' text-light'
  } else {
     textColor += ' text-black'
  }

  return textColor
})
// const showVideo = computed(() => {
//   if (
//     props.blok.background_image.filename &&
//     !props.blok.background_video.filename
//   ) {
//     return false
//   } else if (props.blok.background_video.filename) {
//     return true
//   }
// })

</script>
