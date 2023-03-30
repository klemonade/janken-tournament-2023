<script lang="ts">
	import { Button, Modal } from "flowbite-svelte";
	import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let resultPageData: {
        user: string,
        currentOpponent: string,
        foxNumber: number,
        currentRound: number,
    }

    let currentStance: number
    let showModal = false


    const emojiStance = [
        '👊🏻',
        '🖐🏻',
        '✌🏻',
    ]

    const onConfirm = () => {
        dispatch('next', {
            userStance: currentStance
        })
    }

    const onWarn = (stance: number) => {
        currentStance = stance
        showModal = true
    }

    const closeModal = () => {
        showModal = false
    }

</script>

<style>
    .stance_rotatation {
	animation-name: rotation;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
}
    @keyframes rotation {
  0% {
    -webkit-transform: rotate(10deg);
  }
  50% {
    -webkit-transform: rotate(-10deg);
  }
  100% {
    -webkit-transform: rotate(10deg);
  }
}
</style>

<section class="max-w-[500px] w-full flex flex-col items-center gap-8 pt-16">
    <h1 class="text-center font-bold text-4xl">Battle !</h1>
    <p>{resultPageData.currentRound == 2? "ใครชนะติดเซม!!": "มาาาาาา สู้กันนนนนน~"}</p>
    <div class="grid grid-cols-2 items-center justify-bewteen gap-4 sm:gap-8 p-4">
            <img class="h-[274px] w-[218px] object-cover p-2 bg-red-300 rounded-lg" src="https://randomfox.ca/images/{resultPageData.foxNumber}.jpg" alt="">
            <img class="h-[274px] w-[218px] object-contain p-2  from-pink-300 to-green-300 rounded-lg bg-gradient-to-t" src="profile/half/{resultPageData.currentOpponent}.webp" alt="">
            <p class="font-bold text-2xl text-center">{resultPageData.user}</p>
            <p class="font-bold text-2xl text-center">{resultPageData.currentOpponent}</p>
    </div>
    <div class="flex flex-row justify-between items-center w-[80%] ">
        <button class="stance_rotatation text-7xl sm:text-8xl" on:click={() => onWarn(0)} in:fade={{delay: 0}}>👊🏻</button>
        <button class="stance_rotatation text-7xl sm:text-8xl" on:click={() => onWarn(1)} in:fade={{delay: 200}}>🖐🏻</button>
        <button class="stance_rotatation text-7xl sm:text-8xl" on:click={() => onWarn(2)} in:fade={{delay: 400}}>✌🏻</button>
    </div>
</section>

<Modal bind:open={showModal}>
    <div class="text-center space-y-2"  in:fade={{duration: 100}} out:fade={{duration: 100}}>
        <h1 class="text-7xl">{emojiStance[currentStance]}</h1>
        <h3 class="text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you sure with{emojiStance[currentStance]}?</h3>
        <div class="grid grid-cols-2 gap-2">
            <Button color="red" on:click={() => onConfirm()}>Yes, I'm sure</Button>
            <Button color='alternative' on:click={() => closeModal()}>No, cancel</Button>
        </div>
    </div>
</Modal>