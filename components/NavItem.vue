<script setup>
const { query } = useRoute()

const inEditor = computed(() => {
  return query._storyblok ? true : false
})

const props = defineProps({ item: Object })

// const url = computed(() => {
//   switch (props.item.link.linktype) {
//     case 'story':
//       const targetUrl = props.item.link.cached_url
//       const anchorId = props.item.link.anchor
//       return `${targetUrl}${anchorId ? `#${anchorId}` : ''}`
//       // return MenuItem
//     case 'url':
//     case 'asset':
//       return props.item.link.url
//     case 'email':
//       return 'mailto:' + props.item.link.email
//     default:
//       return '#'
//   }
// })
const url = computed(() => {
  if (props.item.link.url !== '') {
    return '';
  }
  switch (props.item.link.linktype) {
    case 'story':
      return `/${props.item.link.story?.full_slug}`;
    case 'email':
      return `mailto:${props.item.link.email}`;
    case 'url':
    case 'asset':
    default:
      return props.item.link.url;
  }
});

</script>

<template>
  <NuxtLink
    v-editable="item"
    :to="inEditor ? '' : url"
    class="pointer-events-auto cursor-pointer transition-colors"
    :aria-label="item.label"
  >
    {{ item.label }}
  </NuxtLink>
</template>
