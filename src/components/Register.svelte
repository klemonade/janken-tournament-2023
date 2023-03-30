<script lang="ts">
    import { Button, Input } from 'flowbite-svelte';
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let user: string;
    export let foxNumber: number;

    const next = () => {
        dispatch('next', {
            user: user || 'Anonymous',
        })
    }

</script>

<section class="p-0 bg-[url(/assets/janken-cover-portrait.webp)] h-screen max-w-[550px] w-full bg-cover bg-center flex flex-col justify-center items-center" in:fade={{duration: 1000}} >
    <div class="flex flex-col justify-center items-center gap-8 p-8 rounded-lg backdrop-blur">
        <h1 class="sm:text-4xl text-2xl text-white font-bold">Janken Tournament 2023</h1>
        <img src="https://randomfox.ca/images/{foxNumber}.jpg" class="aspect-square object-cover h-[300px] p-2 bg-red-300 rounded-lg" alt="">
        <Input type="text" placeholder="Your stage name" class="bg-white bg-opacity-50 rounded p-2 max-w-[300px]" bind:value={user} />
        <Button class="font-medium w-[80px] sm:font-bold sm:w-[100px]" size="xl" on:click={next}>Play</Button>
    </div>
</section>