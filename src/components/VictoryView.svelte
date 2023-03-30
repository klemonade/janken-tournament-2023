<script lang="ts">
	import { Button } from "flowbite-svelte";


	export let victoryPageData: {
	    user: string,
	    foxNumber: number,
	}
	// const victoryPageData = {
	// 	user: 'test',
	// 	foxNumber: 1
	// };

    const startOver = () => {
        location.reload()
    }
</script>

<section class="flex flex-col overflow-hidden h-[100vh] mx-auto justify-center items-center gap-8">
	<div class="flex flex-col justify-center items-center gap-2">
		<h1 class="text-2xl font-semibold">You are a</h1>
		<h1 class="text-4xl font-bold">Janken Queen 👑</h1>
	</div>
	<img
		class="h-[320px] w-[320px] object-cover p-2 rounded-lg rainbow_bg_animated"
		src="https://randomfox.ca/images/{victoryPageData.foxNumber}.jpg"
		alt=""
	/>
	<div>
		<p class="text-4xl font-semibold rainbow rainbow_text_animated">{victoryPageData.user}</p>
	</div>
    <Button size="xl" color="green" on:click={() => startOver()}>Play Again</Button>
</section>

<style>

	.rainbow_text_animated {
		background: linear-gradient(to right, #6666ff, #0099ff, #00ff00, #ff3399, #6666ff);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: rainbow_animation 0.5s ease-in-out infinite;
		background-size: 400% 100%;
	}

	.rainbow_bg_animated {
		background: linear-gradient(to right, #6666ff, #0099ff, #00ff00, #ff3399, #6666ff);
		/* -webkit-background-clip: text;
    background-clip: text; */
		color: transparent;
		animation: rainbow_animation 0.5s ease-in-out infinite;
		background-size: 400% 100%;
	}

	@keyframes rainbow_animation {
		0%,
		100% {
			background-position: 0 0;
		}

		50% {
			background-position: 100% 0;
		}
	}
</style>
