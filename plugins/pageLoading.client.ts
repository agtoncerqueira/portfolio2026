export default defineNuxtPlugin((nuxtApp) => {
    const isLoading = useState('page-loading', () => false)
    // const loadingDelay = 300
    // let navigationTimeout: NodeJS.Timeout | null = null
  
    // // Mostrar loading no carregamento inicial
    // nuxtApp.hook('app:created', () => {
    //   isLoading.value = true
    //   console.log('⏳ Aplicação iniciando...')
    // })
  
    // // Esconder loading quando a app foi renderizada (carregamento inicial)
    // nuxtApp.hook('app:rendered', () => {
    //   console.log('✅ Aplicação renderizada!')
    //   if (navigationTimeout) clearTimeout(navigationTimeout)
    //   setTimeout(() => {
    //     isLoading.value = false
    //   }, loadingDelay)
    // })
  
    // const router = useRouter()
  
    // // Detectar mudança de rota
    // router.beforeEach((to, from, next) => {
    //   if (to.path !== from.path) {
    //     isLoading.value = true
    //     console.log('⏳ Navegando para:', to.path)
        
    //     // Timeout de segurança (caso finish não dispare)
    //     navigationTimeout = setTimeout(() => {
    //       isLoading.value = false
    //     }, 5000)
    //   }
    //   next()
    // })
  
    // // Esconder loading após mudança de rota
    // router.afterEach(() => {
    //   console.log('✅ Navegação concluída!')
    //   if (navigationTimeout) clearTimeout(navigationTimeout)
    //   setTimeout(() => {
    //     isLoading.value = false
    //   }, loadingDelay)
    // })
  
    return {
      provide: {
        pageLoading: isLoading
      }
    }
  })