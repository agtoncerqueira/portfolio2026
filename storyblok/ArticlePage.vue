<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/solid'

const props = defineProps({ blok: Object });
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const appURL = runtimeConfig.public.appURL;
const canonicalURL = `${appURL}${route.path}`


const optimizedArticleImage = computed(() =>
  getOptimizedImage(props.blok.image, 1600, 800),
);

useHead({
  title: props.blok?.meta_title ?? "Aghi Cerqueira Portfolio",
  link: [
    { 
      rel: 'canonical', 
      href: `${canonicalURL}`
    },
  ],
  meta: [
    { name: 'description', content: props.blok?.meta_description || "My journey is driven by the intersection of art and logic. With over 15 years of experience, I began my career in the demanding fashion industry, where I refined my eye for aesthetics, composition, and detail as a graphic and textile designer. This solid visual foundation evolved organically into the digital realm. For the past 7 years, I have dived deep into web development, specializing in modern ecosystems like Nuxt.js and Laravel to build robust, high-performance solutions. As a self-taught motion designer and video editor, I don’t just build a website’s structure—I bring a brand’s visual narrative to life. I am a designer who writes code and a developer who values pixel-perfection."},
    {
          hid: 'og:title',
          property: 'og:title',
          content: props.blok?.meta_title || "Aghi Cerqueira Portfolio",
        },
        { hid: 'og:url', property: 'og:url', content: `${canonicalURL}` },
        {
          hid: 'og:description',
          property: 'og:description',
          content: props.blok?.meta_description || "My journey is driven by the intersection of art and logic. With over 15 years of experience, I began my career in the demanding fashion industry, where I refined my eye for aesthetics, composition, and detail as a graphic and textile designer. This solid visual foundation evolved organically into the digital realm. For the past 7 years, I have dived deep into web development, specializing in modern ecosystems like Nuxt.js and Laravel to build robust, high-performance solutions. As a self-taught motion designer and video editor, I don’t just build a website’s structure—I bring a brand’s visual narrative to life. I am a designer who writes code and a developer who values pixel-perfection.",
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: optimizedArticleImage || "/cover-aghi-portfolio.jpg"
        },
  
        // twitter card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: props.blok?.meta_title || "Aghi Cerqueira Portfolio",
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: canonicalURL,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: props.blok?.meta_description || "My journey is driven by the intersection of art and logic. With over 15 years of experience, I began my career in the demanding fashion industry, where I refined my eye for aesthetics, composition, and detail as a graphic and textile designer. This solid visual foundation evolved organically into the digital realm. For the past 7 years, I have dived deep into web development, specializing in modern ecosystems like Nuxt.js and Laravel to build robust, high-performance solutions. As a self-taught motion designer and video editor, I don’t just build a website’s structure—I bring a brand’s visual narrative to life. I am a designer who writes code and a developer who values pixel-perfection.",
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: optimizedArticleImage || "/cover-aghi-portfolio.jpg"
        },
  ],
})
</script>

<template>
  <article v-editable="blok">
    <div class="container mx-auto mt-[150px] md:mt-[200px] px-8">
      <header>
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <CategoriesList v-if="blok?.categories?.length" :categories="blok.categories" class="mt-12 flex justify-center space-x-4" />
          <Headline
            v-if="blok.headline"
            class="font-bold"
          >
            {{ blok.headline }}
          </Headline>
          <!-- component -->
          
            <nav class="text-sm sm:text-base bg-white p-4 md:p-6 lg:p-6 rounded-md">
              <ol class="list-none p-0 inline-flex space-x-1">
                <li class="flex items-center">
                  <NuxtLink to="/" class="flex cursor-default text-gray-600 hover:text-blue-500 transition-colors duration-300">
                    <svg onclick="window.location.href='/';" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" class="cursor-pointer hover:fill-blue-500 transition-colors duration-300" fill="#4b5563">
                      <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                      <span class="mx-2">/</span>
                  </NuxtLink>  
                </li>
                <li class="flex items-center">
                  <NuxtLink to="/case-study" class="cursor-default text-gray-600 hover:text-blue-500 transition-colors duration-300">
                     Portfolio 
                  </NuxtLink>
                  <span class="mx-2">/</span>
                </li>
                <li class="flex items-center">
                  <span class="text-dark font-medium">{{ blok.headline }}</span>
                </li>
              </ol>
            </nav>
        </div>
        <div v-if="optimizedArticleImage" class="px-0 lg:px-0">
          <div class="relative">
            <img
              loading="lazy"
              :src="optimizedArticleImage"
              :alt="blok.image?.alt || blok.headline"
              class="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      </header>
      <main v-if="blok.text" class="prose prose-lg mx-auto my-12">
        <StoryblokRichText :doc="blok?.text" />
      </main>
      <div class="mx-auto max-w-sm mb-8">
        <NuxtLink to="/case-study" class="flex items-center justify-center text-center gap-2 px-4 py-4 text-sm font-medium text-dark bg-secondary border border-gray-300 rounded-full shadow-sm hover:bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out">
          <ChevronLeftIcon
            class="h-5 w-5 text-dark font-bold"
            aria-hidden="true"
          /> <span class="text-dark font-bold ">Portfolio</span>
        </NuxtLink>
      </div>
    </div>
    <Banner
      v-if="blok?.call_to_action?.length"
      :blok="blok.call_to_action[0].content"
      :referenced="true"
    />
  </article>
</template>
