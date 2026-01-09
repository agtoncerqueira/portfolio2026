<template>
    <nav v-if="totalPages > 1 && totalItems > 0" class="flex items-center justify-center space-x-2 py-4" aria-label="Pagination">
      <button 
        @click="setPage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-sm"
        :class="{ 'cursor-pointer': currentPage > 1 }"
      >
        Anterior
      </button>
  
      <template v-for="page in totalPages" :key="page">
        <button 
          v-if="page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)"
          @click="setPage(page)" 
          class="h-10 w-10 text-sm font-medium border rounded-full transition duration-150 ease-in-out shadow-sm"
          :class="{
            'bg-black text-white border-gray-600 hover:gray-700': page === currentPage,
            'bg-white text-gray-700 border-gray-300 hover:bg-gray-100': page !== currentPage
          }"
        >
          {{ page }}
        </button>
  
        <span 
          v-if="page === 2 && currentPage > 2" 
          class="h-10 w-10 flex items-center justify-center text-sm text-gray-500"
        >
          ...
        </span>
        <span 
          v-if="page === totalPages - 1 && currentPage < totalPages - 1" 
          class="h-10 w-10 flex items-center justify-center text-sm text-gray-500"
        >
          ...
        </span>
      </template>
  
      <button 
        @click="setPage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-sm"
        :class="{ 'cursor-pointer': currentPage < totalPages }"
      >
        Próximo
      </button>
    </nav>
  
    <div v-if="totalPages > 1" class="text-center text-sm text-gray-500 mt-2">
      Mostrando página {{ currentPage }} de {{ totalPages }} (Total: {{ totalItems }} produtos)
    </div>
  </template>
  
  <script setup>
  // Props que receberão o estado reativo do Composable
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    },
    // Função para mudar a página
    setPage: {
      type: Function,
      required: true
    }
  });
  
  // Desestruturação das props para uso direto no template
  const { currentPage, totalPages, totalItems, setPage } = toRefs(props);
  
  </script>