<script setup>
import { useLoadingIndicator } from '#imports'

const { isLoading, progress } = useLoadingIndicator()

// Manually start the loading indicator
// start()
</script>

<template>
  <div v-if="isLoading">
    <p>Loading...</p>
    <!-- Use progress for animation -->
    <div :style="{ width: progress + '%' }"></div>
  </div>
</template>