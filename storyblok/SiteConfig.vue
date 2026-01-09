<script setup>
const defaultColors = {
  '--primary': '#04fe75',
  '--secondary': '#00c052',
  '--light': '#edfff5',
  '--medium': '#afffd3',
  '--dark': '#00c052',
}

const theme = reactive({ ...defaultColors })

const runtimeConfig = useRuntimeConfig();
const storyblokVersion = runtimeConfig.public.storyblokVersion;

const story = ref()
const storyblokApi = useStoryblokApi()

const { data } = await storyblokApi.get('cdn/stories/site-config', {
  version: storyblokVersion,
  resolve_links: 'url',
})

    story.value = data.story

  const cssVariables = computed(() => {
  
  theme['--primary'] = story.value.content.primary.color
  theme['--secondary'] = story.value.content.secondary.color
  theme['--light'] = story.value.content.light.color
  theme['--medium'] = story.value.content.medium.color
  theme['--dark'] = story.value.content.dark.color
  return theme
})
</script>

<template>
    <div :style="cssVariables">
        <Headline class="mb-8">Color Previews</Headline>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          <div
            class="bg-primary w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
          >
            <span class="text-sm text-white">Primary</span>
          </div>
          <div
            class="bg-secondary w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
          >
            <span class="text-sm text-white">Secondary</span>
          </div>
          <div
            class="bg-light w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
          >
            <span class="text-sm text-black">Light</span>
          </div>
          <div
            class="bg-medium w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
          >
            <span class="text-sm text-black">Medium</span>
          </div>
          <div
            class="bg-dark w-full aspect-square rounded-3xl flex items-center justify-center shadow-sm"
          >
            <span class="text-sm text-white">Dark</span>
          </div>
        </div>
      </div>
</template>