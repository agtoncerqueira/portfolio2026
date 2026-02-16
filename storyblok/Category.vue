<script setup>
const props = defineProps({ blok: Object, uuid: String });

const { slug } = useRoute().params;
let language = 'default';

const runtimeConfig = useRuntimeConfig();
const storyblokVersion = runtimeConfig.public.storyblokVersion;

if (slug) {
  language = await getLanguage(slug);
}

const articles = ref(null);
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get(`cdn/stories/`, {
  version: storyblokVersion,
  starts_with: 'case-study',
  filter_query: {
    categories: {
      in_array: props.uuid,
    },
  },
  language,
  fallback_lang: 'default',
  resolve_relations: 'article-page.categories',
});

articles.value = data.stories;

const gridClasses = computed(() => getGridClasses());
</script>

<template>
  <main v-editable="blok" class="container mx-auto mt-12 py-12 md:py-16">
    <Headline
      v-if="blok.headline"
    >
      {{ blok.headline }}
    </Headline>
    <div
      :class="gridClasses"
    >
      <ArticleCardVertical
        v-for="article in articles"
        :key="article.uuid"
        :article="article.content"
        :slug="article.full_slug"
      />
    </div>
  </main>
</template>
