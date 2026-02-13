<template>
    <section v-editable="blok"
      class="gallery-grid py-12"
    >
      <div
      class="grid gap-6"
      :class="{
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': blok.columns === '3',
        'grid-cols-1 sm:grid-cols-2': blok.columns === '2',
      }"
      :style="{ gridAutoRows: rowHeight }"
    >
      <div
        v-for="(item, index) in blok.images"
        :key="index"
        class="relative overflow-hidden rounded-xl shadow group"
        :class="{
          'col-span-2 row-span-2': index === featured,
          'sm:row-span-2': index === featured,
        }"
      >
        <img
          :src="item.filename"
          :alt="item.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <!-- <div
          class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"
        ></div> -->
      </div>
    </div>
    </section>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({ blok: Object });

  const rowHeight = computed(() => props.blok.rowHeight || '320px')
  const featured = computed(() => parseInt(props.blok.featured_image))
  </script>
  