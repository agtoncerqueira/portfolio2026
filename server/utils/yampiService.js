// O Nuxt auto-importa isso dentro da pasta server/
export const fetchYampiCategoriesService = async () => {
    const config = useRuntimeConfig();
    const YAMPI_ALIAS = config.public.yampiAlias;
    
    // Headers de autenticação
    const headers = {
      'Content-Type': 'application/json',
      'User-Token': config.yampiToken,
      'User-Secret-Key': config.yampiSecretKey,
    };
    // Lógica pura de fetch (sem useAsyncData)
    try {
      const response = await $fetch(`https://api.dooki.com.br/v2/${YAMPI_ALIAS}/catalog/categories`, {
        headers,
        query: { limit: 1000 }
      });
      return response.data || [];
    } catch (error) {
      console.error('Erro no serviço Yampi:', error);
      return [];
    }
  };