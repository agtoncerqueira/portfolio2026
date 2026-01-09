<template>
    <button>
      <NuxtLink
        :to="inEditor ? '' : url"
        :class="classes"
        v-editable="button"
        class="block w-full h-full"
        :aria-label="button.label"
      >
        {{ button.label }}
        <slot />
      </NuxtLink>
    </button>
  </template>
  
  <script setup>
  const { query } = useRoute()
  
  const inEditor = computed(() => {
    return query._storyblok ? true : false
  })
  const props = defineProps({ button: Object })
  const url = computed(() => {
    switch (props.button.link.linktype) {
      case 'story':
        // here we need to test if the story object exists because it won't be resolved when the bridge is used on site-config
        let slug = props.button.link.story?.full_slug || props.button.link.cached_url
        return '/' + slug
      case 'url':
      case 'asset':
        return props.button.link.url
      case 'email':
        return 'mailto:' + props.button.link.email
      default:
        return '#'
    }
  })
  
  const classes = computed(() => {
    let classes =
    `ctaButton inline-flex items-center rounded-full tracking-wider cursor-pointer transition-all duration-300 border border-${props.button.button_color} text-${props.button.button_color}`  
   
    switch (props.button.size) {
      case 'small':
        classes += ' py-2 px-6 text-sm'
        break
      case 'large':
        classes += ' py-4 px-12 text-2xl'
        break
      case 'medium':
      classes += ' py-4 px-10 text-xl'
      break
      default:
        classes += ' py-3 px-8 text-lg'
        break
    }

    switch (props.button.backgroundColor) {
      case 'primary':
        classes += ' bg-primary'
        break
      case 'secondary':
        classes += ' bg-secondary'
        break
      case 'medium':
      classes += ' bg-medium'
      break
      case 'dark':
      classes += ' bg-dark'
      break
      case 'light':
      classes += ' bg-light'
      break
      case 'transparent':
      classes += ' bg-transparent'
      break
      case 'black':
      classes += ' bg-black'
      break
      default:
        classes += ' bg-white'
        break
    }

    switch (props.button.style) {
      case 'default':
      classes += ' hover:scale-105 transform'
        break
      case 'semi':
        classes += ' bg-opacity-20 backdrop-blur-lg hover:scale-105'
        break
      default:
        classes += ' bg-transparent hover:scale-105'
        break
    }
  
    return classes
  })
  </script>
  