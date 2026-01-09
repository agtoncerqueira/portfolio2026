<template>
    <div class="gallery-grid">
      <nuxt-img
        v-for="post in posts"
        :key="post.id"
        :src="post.media_url"
        alt="Instagram post"
        class="gallery-image"
        width="300"
        height="300"
        sizes="sm:100vw md:50vw lg:33vw"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const posts = ref([]);
  const accessToken = 'YOUR_ACCESS_TOKEN'; // Store securely, not directly in code
  const userId = 'YOUR_USER_ID';
  
  onMounted(async () => {
    try {
      const response = await axios.get(
        `https://graph.instagram.com/${userId}/media?access_token=${accessToken}`
      );
      posts.value = response.data.data;
    } catch (error) {
      console.error("Error fetching Instagram posts:", error);
    }
  });
  </script>
  
  <style scoped>
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
  }
  .gallery-image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  </style>