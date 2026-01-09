<script setup>
const { query } = useRoute()

const inEditor = computed(() => {
  return query._storyblok ? true : false
})

const props = defineProps({ item: Object })

const route = useRoute()


const url = computed(() => {
  switch (props.item.link.linktype) {
    case 'story':
      // here we need to test if the story object exists because it won't be resolved when the bridge is used on site-config
      // return '/' + props.item.link.story?.full_slug
      const targetUrl = props.item.link.cached_url || ''
      const anchorId = props.item.link.anchor || ''

      // Cria o link completo
      const fullUrl = `${targetUrl}${anchorId ? `#${anchorId}` : ''}`

      // Verifica se o link aponta para a mesma rota atual
      const isSamePage = route.path === `/${targetUrl.replace(/^\//, '')}`

      // Se for a mesma página, retorna apenas o hash
      if (isSamePage) {
        return `/${anchorId ? `#${anchorId}` : ''}`
      }

      // Caso contrário, retorna o link completo
      return fullUrl
      // const targetUrl = props.item.link.cached_url
      // const anchorId = props.item.link.anchor
      // return `${targetUrl}${anchorId ? `#${anchorId}` : ''}`
      // return MenuItem
    case 'url':
    case 'asset':
      return props.item.link.url
    case 'email':
      return 'mailto:' + props.item.link.email
    default:
      return '#'
  }
})

</script>

<template>
  <NuxtLink
    :to="inEditor ? '' : url"
    class="pointer-events-auto cursor-pointer transition-colors"
    v-editable="item"
    :aria-label="item.label"
  >
    {{ item.label }}
  </NuxtLink>
</template>
