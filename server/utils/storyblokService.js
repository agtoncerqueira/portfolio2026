export const getAllStoryblokSlugs = async () => {
  const runtimeConfig = useRuntimeConfig();
  const storyblokVersion = runtimeConfig.public.storyblokVersion;
  const storyblokToken = runtimeConfig.public.storyblokToken;
  
  const response = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${storyblokToken}&version=${storyblokVersion}`);
  const data = await response.json();

  const slugs = data.stories.map(story => story.full_slug);
  return slugs;
}