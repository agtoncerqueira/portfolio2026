// composables/useYampiCatalog.js
import { ref } from 'vue';

export const useYampiCatalog = () => {
  const perPage = ref(12);
  const currentPage = ref(1);
  const totalItems = ref(0);
  const totalPages = ref(1);
  const include = ref('firstImage,images,filters,categories')

  const setPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
      currentPage.value = pageNumber;
    }
  };

  // --- Busca de Categorias (GET /api/yampi/categories) ---
  const fetchCategories = () => {
    const INTERNAL_CATEGORIES_URL = '/api/yampi/categories'; 
   
    const { data, pending, error, refresh } = useAsyncData(
      'yampi-categories', // A unique key for caching
      async () => await $fetch(INTERNAL_CATEGORIES_URL) // The data fetching handler
    );
    return {
      data,
      pending,
      error,
      refresh
    }
  }

  const fetchProducts = (filter = {}) => {
    // --- Estado Reativo Interno (Apenas para disparar o watch) ---
    const currentPage = ref(1);
    
    const activeFilters = reactive({
        categorySlug: filter.categorySlug || null       
    });
    // Função para mudar a página (será retornada)
    const setPage = (pageNumber) => {
      currentPage.value = pageNumber;
    };
    
    const { data: result, pending, error, refresh } = useAsyncData(
      // A chave de cache agora depende dos filtros E da página
      computed(() => `yampi-products-p${currentPage.value}-s${activeFilters.categorySlug || 'all'}`),
      // 1. O fetcher (sempre executado quando o 'key' acima muda)
    async () => await $fetch('/api/yampi/products', {
        query: { 
          include: include.value,
          limit: perPage.value, // Você pode ajustar o 'perPage' aqui ou torná-lo reativo
          page: currentPage.value,
          ...(activeFilters.categorySlug && { categorySlug: activeFilters.categorySlug })
        }, 
      }),
      {
        watch: [computed(() => activeFilters.categorySlug)],

        transform: (response) => {
          const meta = response.meta?.pagination || {};
          
          // Retorna um objeto único
          return {
            products: response.data || [],
            pagination: {
              totalItems: meta.total || 0,
              totalPages: meta.total_pages || 1,
              currentPage: meta.current_page || 1
            }
          };
        },
        
        // 4. Fornece um valor 'default'
        // Isso previne erros de 'undefined' antes da primeira carga
        default: () => ({
          products: [],
          pagination: {
            totalItems: 0,
            totalPages: 1,
            currentPage: 1
          }
        })
      }
    );

    // 5. Retorna refs computadas baseadas no 'result'
    // 'result' é a 'ref' principal que o useAsyncData sincroniza
    return {
      products: computed(() => result.value?.products),
      pagination: computed(() => result.value?.pagination), // Uma ref computada para o objeto de paginação
      pending,
      error,
      refresh,
      setPage, // Retorna a função para alterar a página
    };
  };
  
  return {
    fetchCategories,
    fetchProducts,
  };
};