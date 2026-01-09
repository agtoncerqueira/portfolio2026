import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async () => {
    
    const allCategories = await fetchYampiCategoriesService();
    // const allSlugs = await getAllStoryblokSlugs();
    // const map: string[] = allCategories.map(category => category.slug);
    // const mergedArray: string[] = [...map, ...allSlugs];
    // console.log(mergedArray)
    const sitemapUrls: SitemapUrlInput[] = allCategories.map(
        (item: any) => ({
            loc: `produtos/${item.slug}`,
        })
    )
    return sitemapUrls
})