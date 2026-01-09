const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const YAMPI_ALIAS = config.public.yampiAlias;
  const API_TOKEN = config.yampiToken;
  const API_SECRET = config.yampiSecretKey;

  // A URL externa da Yampi
  const CATEGORIES_URL = `https://api.dooki.com.br/v2/${YAMPI_ALIAS}/catalog/categories`;

  try {
    // 1. Usa $fetch (ou ofetch) para fazer a requisição externa
    const categories = await $fetch(CATEGORIES_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Token': API_TOKEN,
        'User-Secret-Key': API_SECRET,
      },
      query: {
        limit: 500 // Garante que pegamos todas
      },
      // Aqui você pode adicionar tratamentos de erro, logs, etc.
    });

    return categories;

  } catch (error) {
    console.error('Yampi API Error:', error);
    throw createError({
        statusCode: 500,
        statusMessage: 'Falha ao buscar categorias da loja.',
    });
  }
}, {
  // Configuração do Cache
  name: 'yampi-categories-cache',
  maxAge: 120 * 10 // Cache de 10 minutos (em segundos)
});