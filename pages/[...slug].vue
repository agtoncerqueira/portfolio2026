<script setup>
let { slug } = useRoute().params
const runtimeConfig = useRuntimeConfig();
const storyblokVersion = runtimeConfig.public.storyblokVersion;
    //const resolveRelations = ['popular-articles.articles'] 
    const url = slug && slug.length > 0 ? slug.join('/') : 'home'

/**
 * Resolve relations
 */
let resolveRelations = [
  'featured-articles-section.articles',
]

/**
 * Use Bridge
 */
 onMounted(() => {
  if (slug[0] !== undefined && slug[0] === 'site-config') return
  useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
    resolveRelations: resolveRelations,
  })
})


 const story = await useAsyncStoryblok(url.replace(/\/$/, ''),
      {
        version: storyblokVersion,
        // language: locale.value,
        resolve_relations: resolveRelations,
      },
      {
        resolveRelations,
      }
    )

</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" :uuid="story.uuid" />
</template>