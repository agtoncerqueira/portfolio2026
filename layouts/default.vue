<template>
<div>
  <main :style="cssVariables">
      <Header v-if="story"
          :logo="story.content.header_logo"
          :disable_transparency="story.content.header_disable_transparency"
          :nav="story.content.header_nav"
          :buttons="story.content.header_buttons"
          :light="story.content.header_light"
        />
      <div class="overflow-hidden">
        <slot :key="$route.fullPath" />
      </div>
      <LazyFooter v-if="story" hydrate-on-visible
      :logo="story.content.footer_logo"
      :tiktok="story.content.tiktok"
      :pinterest="story.content.pinterest"
      :instagram="story.content.instagram"
      :youtube="story.content.youtube"
    />
  </main>
</div>
</template>

<script setup>
const defaultColors = {
  '--primary': '#04fe75',
  '--secondary': '#00c052',
  '--light': '#edfff5',
  '--medium': '#afffd3',
  '--dark': '#00c052',
}

const runtimeConfig = useRuntimeConfig();
const storyblokVersion = runtimeConfig.public.storyblokVersion;

const story = ref()
const storyblokApi = useStoryblokApi()

const { data } = await storyblokApi.get('cdn/stories/site-config', {
  version: storyblokVersion,
  resolve_links: 'url',
})

story.value = data.story

const route = useRoute()

const slug = route.params.slug

onMounted(() => {
  if (slug && slug[0] !== undefined && slug[0] === 'site-config') {
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
      disableClicks: true,
    })
  }})

  const cssVariables = computed(() => {
  if (!story.value || !story.value.content) {
    return { ...defaultColors }
  }
  
  return {
    '--primary': story.value.content.primary.color,
    '--secondary': story.value.content.secondary.color,
    '--light': story.value.content.light.color,
    '--medium': story.value.content.medium.color,
    '--dark': story.value.content.dark.color,
  }
})

</script>

<style>
  :root {
    --nav-background-color: #ffffff;
  }
  
  
  section.page-section {
    @apply py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32;
  }
  
  section.page-section.bg-white + section.page-section.bg-white,
  section.page-section.bg-primary-background + section.page-section.bg-primary-background {
    @apply pt-0;
  }
  section.page-section.contact-form-section:last-child {
    @media not all and screen(lg) {
      @apply pb-0;
    }
  }
  </style>
