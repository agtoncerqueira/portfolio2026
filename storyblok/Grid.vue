<template>
  <section v-editable="blok"
  class="mx-auto">
    <div class="grid-section grid flex w-full place-items-center text-left py-12 p-8 px-4 sm:px-6 lg:px-8" :class=" classes">
      <StoryblokComponent
      v-for="blok in blok.columns"
      :key="blok._uid"
      :blok="blok"
      />
    </div>
    <div class="flex justify-center py-8">
      <Button class="mx-auto"
        v-for="button in blok.buttons"
        :key="button._uid"
        :button="button"
      />
    </div>
</section>
</template>

<script setup>
const props = defineProps({ blok: Object })


const classes = computed(() => {
    let classes =
      ''
    if (props.blok.gap === "4") {
      classes += 'gap-4'
    } else if (props.blok.gap === "6") {
    classes += 'gap-6'
    } else if (props.blok.gap === "8") {
      classes += 'gap-8'
    } else {
      classes += 'gap-12 sm:gap-8'
    }

    if (props.blok.backgroundColor !== "") {
      classes += ` bg-${props.blok.backgroundColor}`
    }

    switch (props.blok.cols) {
      case 'three':
        classes += ' md:grid-cols-3 gap-12'
        break
      case 'four':
        classes += ' sm:grid-cols-2 xl:grid-cols-4'
        break
      case 'two':
      default:
        classes += ' md:grid-cols-2'
        break
    }

    switch (props.blok.text_position) {
      case 'center':
        classes += ' text-center'
        break
      case 'right':
        classes += ' text-right'
        break
      case 'left':
      default:
        classes += ' text-left'
        break
    }
  
    return classes
  })
  
</script>
