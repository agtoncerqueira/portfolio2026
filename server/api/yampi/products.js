const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const YAMPI_ALIAS = config.public.yampiAlias;
  const API_TOKEN = config.yampiToken;
  const API_SECRET = config.yampiSecretKey;
  const baseUrl = config.public.yampiAPI

  const AUTH_HEADERS = {
    'Content-Type': 'application/json',
    'User-Token': API_TOKEN,
    'User-Secret-Key': API_SECRET,
  };

  try {
    
    const queryParams = getQuery(event);
    const categorySlug = queryParams.categorySlug;
    let categoryId = null;

    if (categorySlug) {
      const CATEGORIES_URL = `https://api.dooki.com.br/v2/${YAMPI_ALIAS}/catalog/categories`;
      try {  
        const allCategories = await $fetch('/api/yampi/categories', {
        
        });
      
      const foundCategory = allCategories.data.find(
        (category) => category.slug === categorySlug
      );

        if (foundCategory) {
          categoryId = foundCategory.id;
        } else {

          return { data: [], meta: { pagination: { total: 0, total_pages: 1 } } };
        }
      } catch (err) {
        console.error('Erro ao buscar ID da categoria:', err);
        // Se a busca por categoria falhar, lançamos um erro 500
        throw createError({
            statusCode: 500,
            statusMessage: 'Falha na busca da categoria por SLUG.',
        });
      }
    }
    
    const PRODUCTS_URL = `${baseUrl}/${YAMPI_ALIAS}/catalog/products`;

    const yampiQuery = {
      include: queryParams.include, 
      limit: queryParams.limit,
      page: queryParams.page,
    }

    // Adiciona o filtro de ID de Categoria se ele foi encontrado
    if (categoryId) {
      yampiQuery['category_id[]'] = categoryId;
    }

    const productsResponse = await $fetch(PRODUCTS_URL, {
      method: 'GET',
      headers: AUTH_HEADERS,
      query: yampiQuery,
    });
    
    return productsResponse;

  } catch (error) {
    
    console.error('Yampi API Products Error:', error);
    
    throw createError({
        statusCode: 500,
        statusMessage: 'Falha ao buscar produtos da loja. Verifique sua conexão ou entre em contato com o suporte.',
        data: { details: error.message },
    });
  }
})