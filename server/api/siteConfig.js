

export default defineEventHandler(async (event) => {
    const storyblokClient = useStoryblokClient(); // Automatically resolves to server client in server context
  
    try {
      const { data } = await storyblokClient.get('cdn/stories/site-config', {
        version: 'draft', // Can use draft version securely on the server
      });
      return data;
    } catch (error) {
      console.error('Error fetching story from server API:', error);
      return { error: 'Failed to fetch data' };
    }
  });