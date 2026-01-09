<template>
    <div class="mb-16 p-0 border rounded-[2vw] animate-fade-up animate-ease-in">
        <div class="w-full h-full mx-auto flex items-center m-0 transition-opacity duration-500 opacity-100 hover:opacity-80">
            <NuxtLink :to="Cards.link.url" >
                    <img :src="Cards.image.filename" class="rounded-[2vw]"/>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({ Cards: Object })

</script>  