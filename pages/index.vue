<script setup>
const runtimeConfig = useRuntimeConfig();
const storyblokVersion = runtimeConfig.public.storyblokVersion;

const story = await useAsyncStoryblok('home', { version: storyblokVersion },
{ customParent: 'https://app.storyblok.com' })

useHead({
     title: runtimeConfig.public.APP_TITLE,
})
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
