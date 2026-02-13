<script setup>
const props = defineProps({ blok: Object });

const optimizedArticleImage = computed(() =>
  getOptimizedImage(props.blok.image, 1600, 800),
);

useHead({
  title: props.blok?.meta_title,
  meta: [
    { name: 'description', content: props.blok?.meta_description },
  ],
})

console.log(props.blok)
</script>

<template>
  <article v-editable="blok">
    <div class="container mx-auto mt-[200px] px-8">
      <header>
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <CategoriesList v-if="blok?.categories?.length" :categories="blok.categories" class="mt-12 flex justify-center space-x-4" />
          <Headline
            v-if="blok.headline"
            class="font-bold"
          >
            {{ blok.headline }}
          </Headline>
        </div>
        <div v-if="optimizedArticleImage" class="px-4 lg:px-0">
          <div class="relative">
            <img
              :src="optimizedArticleImage"
              :alt="blok.image?.alt"
              class="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      </header>
      <main v-if="blok.text" class="prose prose-lg mx-auto my-12">
        <StoryblokRichText :doc="blok.text" />
      </main>
    </div>
  </article>
</template>
