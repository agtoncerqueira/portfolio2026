<template>
    <Transition name="fade">
      <div v-if="isLoading" class="loading-overlay bg-transparent">
        <div class="spinner">
          <div class="spinner-border"></div>
          <p class="loading-text">Carregando...</p>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  defineProps({
    isLoading: {
      type: Boolean,
      default: false
    }
  })
  </script>
  
  <style scoped>
  .loading-overlay {
    position: relative;
    /* position: fixed; */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: rgba(255, 255, 255, 0.95); */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(2px);
  }
  
  .spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .spinner-border {
    width: 50px;
    height: 50px;
    border: 4px solid #e0e0e0;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .loading-text {
    font-size: 16px;
    color: #000;
    font-weight: 500;
    margin: 0;
  }
  
  /* Animação de entrada/saída */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  