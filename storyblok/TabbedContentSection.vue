<script setup>
const props = defineProps({ blok: Object })

const mobileTabsStates = ref(props.blok.entries.map((entry) => false))
// Mobile
const setActiveTabMobile = (index) => {
  mobileTabsStates.value[index] = !mobileTabsStates.value[index]
}
// Desktop
const activeTab = ref(0)

const setActiveTab = (index) => {
  activeTab.value = index
}

const tabWidth = computed(() => 100 / props.blok.entries.length)

const cssVars = computed(() => {
  return {
    '--indicatorWidth': tabWidth.value + '%',
    '--indicatorMarginLeft': activeTab.value * tabWidth.value + '%',
    '--activeTab': activeTab.value,
  }
})

const textColor = computed(() => {
  let textColor = 'text-black'
  if(props.blok.text_color) {
    textColor = `text-${props.blok.text_color}`
  }
    return textColor
  })
const optimizedBgImage = computed(() =>
  getOptimizedImage(props.blok.background_image, 1000),
)
// TODO: use focus point helper function for images, check padding/margin in mobile
</script>

<template>
  <section
    v-editable="blok"
    class="tabbed-content-section max-w-5xl mx-auto bg-white py-12 px-4 sm:px-6 lg:px-8"
    style="
      background-size: fixed;
      background-position: left;
      background-repeat: no-repeat;
    "
    :style="{ 'background-image': 'url(' + optimizedBgImage + ')' }"
  >
    <div class="mb-12 text-center" :class="textColor">
      <Headline v-if="blok.headline" class="font-extrabold mb-4">{{ blok.headline }}</Headline>
        <Lead v-if="blok.lead">
          {{ blok.lead }}
        </Lead>
      </div>
      <div
        class="tabbed-content-section-mobile"
      :class="{ 'md:invisible md:hidden': !blok.always_accordion }"
    >
      <ul class="relative flex flex-col" itemscope="itemscope" itemtype="http://schema.org/FAQPage">
        <li v-for="(entry, index) in blok.entries" class="group" itemscope="itemscope" itemprop="mainEntity" itemtype="https://schema.org/Question">
          <button
            @click.prevent="setActiveTabMobile(index)"
            class="border-1 flex w-full cursor-pointer justify-between border-t border-dark py-4 text-left text-lg group-first:border-0"
            ref="buttonRefs"
            :class="textColor"
          >
            <span class="fw-bolder font-display font-bold">
              {{ entry.headline }}
            </span>
            <span v-if="mobileTabsStates[index]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </span>
            <span v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
          </button>
          <StoryblokComponent v-if="mobileTabsStates[index]" :blok="entry" />
        </li>
      </ul>
    </div>
    <div
      class="tabbed-content-section-desktop invisible hidden md:visible md:block"
      :style="cssVars"
      v-if="!blok.always_accordion"
    >
      <ul class="relative mb-8 flex border-b border-gray-900">
        <li
          v-for="(entry, index) in blok.entries"
          :key="entry._uid"
          :style="'width:' + tabWidth + '%'"
        >
          <button
            @click.prevent="setActiveTab(index)"
            class="w-full cursor-pointer p-3 text-center text-lg"
            :class="textColor"
          >
            {{ entry.headline }}
          </button>
        </li>
      </ul>
      <section
        v-for="(entry, index) in blok.entries"
        :key="entry._uid"
        :id="'entry-' + entry._uid"
      >
        <StoryblokComponent v-if="index === activeTab" :blok="entry" />
      </section>
    </div>
  </section>
</template>

<style scoped>
@screen md {
  ul:after {
    content: '';
    @apply absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all duration-500;
    width: var(--indicatorWidth);
    margin-left: var(--indicatorMarginLeft);
    /* TODO: use v-bind once it works reliably */
    /* width: v-bind(tabWidth + '%');
    margin-left: v-bind(activeTab * tabWidth + '%'); */
  }
}
</style>
