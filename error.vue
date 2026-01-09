<template>
    <section class="bg-white">
       <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
           <div class="mx-auto max-w-screen-sm text-center">
               <template v-if="error.status === 404">
                   <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">{{ error.status }}</h1>
                   <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Página Não Encontrada.</p>
                   <p class="mb-4 text-lg font-light text-gray-500">Nós já estamos trabalhando para resolver este problema. </p>
                   <button class="inline-flex items-center tracking-wider cursor-pointer transition-all duration-300 border border-1 border-primary rounded-full py-2 px-6 text-sm" @click="handleError">Ir Para Página Inicial</button>
                   <div v-motion-fade-visible>
                    <img
                      src="/assets/images/pagina-nao-encontrada.png"
                      alt="Erro: Página não encontrada!"
                      width="600px"
                      height="600px"
                      class="pointer-events-none"
                    />
                  </div>
               </template>
   
               <template v-else>
                   <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 "> {{ error.status }} </h1>
                   <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Houve um erro interno no servidor.</p>
                   <p class="mb-4 text-lg font-light text-gray-500">Nós já estamos trabalhando para resolver este problema. </p>
                   <button class="inline-flex items-center tracking-wider cursor-pointer transition-all duration-300 border border-1 border-primary rounded-full py-2 px-6 text-md" @click="handleError">Ir Para Página Inicial</button>
                    <div v-motion-fade-visible>
                      <img
                        src="/assets/images/pagina-nao-encontrada.png"
                        alt="Erro: Página não encontrada!"
                        width="600px"
                        height="600px"
                        class="pointer-events-none"
                      />
                    </div>
               </template>
   
           </div>   
       </div>
   </section>
   
   </template>
   
  <script setup>
    const error = useError();
   useHead({
     title: (error.status === 404) ? 'Página não encontrada' : 'Houve um problema crítico no servido!'
   })
   const handleError = () => {
     clearError({
       redirect: '/',
     });
   };
   </script>