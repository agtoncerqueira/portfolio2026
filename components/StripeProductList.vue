<script setup lang="ts">
// import { ref, watch } from 'vue';

// Configuration
const perPage = 20; // The limit for each API call
const products = ref<any[]>([]);
const isLoading = ref(false);
const hasMore = ref(false);
const lastProductId = ref<string | null>(null); // Stores the ID for the 'starting_after' parameter

// Simple pagination state
const currentPage = ref(1);

// --- Fetching Logic ---
const fetchProducts = async (page: number) => {
  isLoading.value = true;

  // Determine the 'starting_after' parameter
  // For the first page (page 1), we don't need 'starting_after'
  // For subsequent pages, use the ID of the last product from the previous page
  const startingAfterId = page > 1 ? lastProductId.value : undefined;

  try {
    // Call the Nuxt Server API Endpoint
    const { data, has_more, last_product_id } = await $fetch('/api/stripe/products', {
      query: {
        limit: perPage, // Corrected: Use 'perPage' directly, not 'perPage.value'
        starting_after: startingAfterId,
      },
    });

    // Update state
    products.value = data;
    hasMore.value = has_more;
    lastProductId.value = last_product_id;
    currentPage.value = page; // Ensure currentPage is set after successful fetch

  } catch (error) {
    console.error('Fetch Error:', error);
    // Optional: Show a user-friendly error message
  } finally {
    isLoading.value = false;
  }
};

// --- Pagination Handlers ---
const nextPage = () => {
  if (hasMore.value) {
    fetchProducts(currentPage.value + 1);
  }
};

const prevPage = () => {
  // Note: Stripe's native pagination is forward-only (using 'starting_after').
  // To implement true 'previous page' functionality, you would typically:
  // 1. Store the product IDs for all visited pages in an array.
  // 2. Use the ID of the product *before* the first one on the current page as the 'ending_before' parameter.
  //    (This requires modifying the server endpoint to accept 'ending_before' as well).
  // FOR SIMPLICITY: We will just prevent the user from going before page 1.
  if (currentPage.value > 1) {
    // A true previous page would require more complex logic.
    // For this example, we'll just log an advisory.
    console.warn("Stripe pagination is complex for 'previous page'. You'd need to store page history.");
    // For a simple demo, you might just reset to page 1, or implement the history/ending_before logic.
  }
};

// Initial fetch when the component mounts
onMounted(() => {
  fetchProducts(1);
});
console.log(products)
</script>

<!-- <template>
  <div>
    <h2>Stripe Products (Page: {{ currentPage }})</h2>

    <div v-if="isLoading">Loading products...</div>

    <div v-else-if="products.length">
      <ul>
        <li v-for="product in products" :key="product.id">
          <strong>{{ product.name }}</strong> (ID: {{ product.id }})
          <p>{{ product.description }}</p>
        </li>
      </ul>

      <div class="pagination-controls">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1 || isLoading"
        >
          &lt; Previous
        </button>
        
        <button 
          @click="nextPage" 
          :disabled="!hasMore || isLoading"
        >
          Next &gt;
        </button>
      </div>
    </div>

    <div v-else>
      No products found.
    </div>
  </div>
</template> -->
<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>

      <div v-if="isLoading">Loading products...</div>

      <div v-else-if="products.length">
        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <a v-for="product in products" :key="product.id" :href="product.href" class="group">
            <img :src="product.images" :alt="product.name" class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" />
            <h3 class="mt-4 text-md text-black">{{ product.name }}</h3>
            <p class="mt-1 text-lg font-medium text-gray-900">{{ product.default_price }}</p>
          </a>
        </div>
      </div>
      <div v-else>
        No products found.
      </div>
      <div class="pagination-controls">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1 || isLoading"
        >
          &lt; Previous
        </button>
        
        <button 
          @click="nextPage" 
          :disabled="!hasMore || isLoading"
        >
          Next &gt;
        </button>
        <h2>Stripe Products (Page: {{ currentPage }})</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagination-controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 5px;
}
</style>