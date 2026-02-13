<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/solid'

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

// console.log(props.blok)
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
      <div class="mx-auto max-w-md mb-8">
        <NuxtLink to="/case-study" class="flex items-center justify-center text-center gap-2 px-4 py-2 text-sm font-mediumtext-dark bg-secondary border border-gray-300 rounded-md shadow-sm hover:bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out">
        <ChevronLeftIcon
          class="h-5 w-5 text-dark font-bold"
          aria-hidden="true"
        /> <span class="text-dark font-bold "> Go back </span>
      </NuxtLink>
      </div>
    </div>
  </article>
</template>
