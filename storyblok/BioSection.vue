<template>
    <section v-editable="blok"
      class=" z-10">
        <div class="container mx-auto">
          <div class="p-2 py-14 mt-[50px] inset-y-0 bg-gray-900">
            <div class="w-36 h-36 bg-[url(https://base5km.basetrailrun.com.br/assets/icons/icon01.png)] bg-no-repeat bg-cover bg-center rounded-full mx-auto"></div>
            <p class="text-white text-2xl">Para você que já tentou iniciar na corrida sozinho(a) e se lesionou ou não teve resultado e parou. Na Base você conseguirá!</p>
          </div>
          <div class="max-w-7xl mx-auto overflow-hidden z-90">
            <div class="text-center mb-16 z-90">
              <span class="text-3xl md:text-5xl p-4 text-gray-300">{{ blok.lead }}</span>
              <h2 class="text-5xl md:text-7xl text-lime-400 font-bold mb-6">{{ blok.lead }}</h2>
            </div>
            
            <div class="relative flex justify-center z-90 text-white">
              <div class="max-w-3xl mx-auto ">
                <BioCard v-for="card in blok.Cards" :key="card._uid" :Cards="card" />
              </div>
            </div>
            
          </div>
        </div>
      </section>
</template>

<script setup>

const props = defineProps({ blok: Object })

</script>  
