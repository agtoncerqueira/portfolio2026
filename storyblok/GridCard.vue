<script setup>
const props = defineProps({ blok: Object })

const optimizedIcon = computed(() => {
  const isSvg = props.blok.icon?.filename.slice(-3) === 'svg'
  const optimize = isSvg ? '' : '/m/' + props.blok?.icon_width + 'x0'
  return props.blok.icon?.filename + optimize
})

const optimizedImage = computed(() =>
  getOptimizedImage(props.blok.backgroundImage, 600),
)

const roundedImage = computed(() => {
  return props.blok.rounded === true ? 'rounded-full' : ' ' 
})
const textColor = computed(() => {
    if (props.blok.text_color === 'light') {
    return 'text-light'
    } else if (props.blok.text_color === 'white') {
    return 'text-white'
    } else if (props.blok.text_color === 'dark') {
    return 'text-dark'
    } else if (props.blok.text_color === 'secondary') {
    return 'text-secondary'
    } else if (props.blok.text_color === 'medium') {
    return 'text-medium'
    } else if (props.blok.text_color === 'primary') {
    return 'text-primary'
  } else {
    return 'text-black'
  }
})
</script>

<template>
  <div v-editable="blok"
    class="flex h-full w-full max-w-md flex-col rounded-lg p-6 lg:max-w-none"
    :style="
      blok.background_color?.color
        ? 'background-color: ' + blok.background_color.color
        : ''
    "
  >
    <img
          :src="optimizedImage"
          loading="lazy"
          class="absolute top-0 left-0 z-0 w-full h-full object-cover pointer-events-none hover:scale-[1.02]"
          :class="roundedImage"
        />
    <img
      v-if="blok.icon.filename"
      loading="lazy"
      :src="optimizedIcon"
      :alt="blok.icon.alt"
      :width="blok.icon_width"
      class="pointer-events-none mx-auto mb-6"
      :class="roundedImage"
      v-motion-fade-visible
    />
    <div class="flex grow flex-col">
      <div class="grow" :class="textColor">
        <h3
          class="mb-3 font-display text-xl font-bold " v-motion-slide-visible-left
        >
          {{ blok.label }}
        </h3>
        <div class="font-light leading-relaxed" v-motion-slide-visible-left> 
          {{ blok.text }}
        </div>
      </div>
      <div v-if="blok.button.length" class="mt-4" v-motion-fade-visible>
        <Button
          v-for="button in blok.button"
          :key="button._uid"
          :button="button"
        />
      </div>
    </div>
  </div>
</template>