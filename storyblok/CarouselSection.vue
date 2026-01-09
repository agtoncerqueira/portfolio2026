<template>
    <section
      v-editable="blok"
      class="page-section carousel-section relative overflow-hidden flex"
    >
   
      <Carousel v-bind="config">
      <Slide v-for="(item, index) in props.blok.images" :key="index">
          <div class="carousel__item ">
            <img loading="lazy" :src="item.banner.filename"  />
          </div>
      </Slide>
  
      <template #addons>
        <Navigation >
            <template #prev>
            <span class="bg-gradient ml-8"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#ffffff" viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg></span>
            </template>
            <template #next>
            <span class="mr-8"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#ffffff" viewBox="0 0 256 256"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path></svg></span>
            </template>
        </Navigation>
        <Pagination />
      </template>
    </Carousel>
  
    </section>
  </template>
<script setup>
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel'
  
  const props = defineProps({ blok: Object, index: Number })
  
  const config = {
    height: props.blok.height,
    itemsToShow: (props.blok.itemsToShow ) ? props.blok.itemsToShow : 1,
    gap: (Number(props.blok.gap) ) ? Number(props.blok.gap) : 5,
    wrapAround: (props.blok.wrapAround ) ? props.blok.wrapAround : false,
    autoplay: (props.blok.autoplay ) ? props.blok.autoplay : 2000,
    pauseAutoplayOnHover: (props.blok.pauseAutoplayOnHover ) ? props.blok.pauseAutoplayOnHover : false,
  }
  </script>
  
  <style>
  .carousel__item {
    min-height: 200px;
    width: 100%;
    background-color: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    border: none;
  }
  .carousel__pagination-button {
  height: 8px;
  width: 25px;
  border-radius: 5px;
  margin-right: 8px;
  background-color: white;
}
.carousel__pagination-button--active {
  background-color: var(--primary);
}
  </style>