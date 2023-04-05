<script lang="ts">
    import { Button } from 'flowbite-svelte'
    import html2canvas from 'html2canvas'
    import { downloadImage } from '../../lib/util';
    import Circle2 from "svelte-loading-spinners/Circle2.svelte";
    import { memberscgm } from '../../lib/member';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let data: {query: string; promise: string}

    let onShareResult = false

    const back = () => {
        dispatch("back")
    }


    const shareResult = async () => {
        disableScroll()
    onShareResult = true
    await new Promise<void>((resolve) => setTimeout(() => {
		resolve()
	}, 1000))
    const canvas = await html2canvas(document.querySelector('#canvas'), {
    backgroundColor: 'rgb(31 41 55)',
    scale: 1
  });
  onShareResult = false
     canvas.toBlob(async (blob) => {
        const files = [new File([blob], 'screenshot.png', { type: 'image/png' })];
        if ('share' in navigator && 'canShare' in navigator) {
    try {
      await navigator.share({
        files,
        // url: "https://fightforkaning.vercel.app/janken-2023/",
        text: `ถ้า #${data.query}${memberscgm.includes(data.query)? "CGM48": "BNK48"} ชนะ Janken ฉันจะ...`,
        // text: "Beautiful images",
      });
    //   output.textContent = "Shared!";
    } catch (error) {
    //   output.textContent = `Error: ${error.message}`;
    }
} else {
        console.log('Your system doesn\'t support sharing files.');
        await downloadImage(canvas.toDataURL(), `${data.query}-janken-promise-2023.png`)
    }
    });
    enableScroll()
  };

  function preventScroll(e: Event) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}

	const enableScroll = () => {
		document.removeEventListener('touchmove', preventScroll, { passive: false });
		document.removeEventListener('wheel', preventScroll, { passive: false });
	};

	const disableScroll = () => {
		document.addEventListener('touchmove', preventScroll, { passive: false });
		document.addEventListener('wheel', preventScroll, { passive: false });
	};
</script>

<section class="flex flex-col justify-center items-center h-[100vh] gap-8">
    {#if onShareResult}
            <section class="absolute top-0 left-0 sm:w-full sm:h-full w-[200vw] h-[200vh]">
                <p class=" absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-[51] text-white">Loading Image...</p>
                <section
                    class="w-full h-full z-[50] bg-white/[0.6] absolute left-0 top-0 flex flex-col justify-center items-center"
                />
                <section
                    class="w-full h-full z-[50] bg-gray-800/[1] absolute left-0 top-0 flex flex-col justify-center items-center"
                >
                    <Circle2 size="200" unit="px" />
                </section>
            </section>
        {/if}
    <h1 class="text-xl">{data.query.replace(/^\w/, (c) => c.toUpperCase())} จ้องคุณอยู่</h1>
    <div class="w-[300px] h-[300px] relative" id="canvas"  style="{onShareResult? "transform: scale(3, 3);": ""}">
        <img src="janken-wish/members/{data.query.toLowerCase()}.webp" class="w-full h-full absolute top-0 left-0" alt="">
        {#if onShareResult}
        <div class="flex flex-col justify-center items-center absolute w-[200px] top-[85px] left-[106px] gap-0 text-sm drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <div class="flex flex-row items-baseline gap-1">ถ้า<h1 class="text-lg font-bold">{data.query.toUpperCase()}</h1> <div>เป็น<u>เซนเตอร์</u></div></div>
           
            <p class="text-lg">ฉันจะ...</p>
        </div>
        {:else}
        <div class="flex flex-col justify-center items-center absolute w-[200px] top-[95px] left-[106px] gap-0 text-sm drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <div class="flex flex-row items-baseline gap-1">ถ้า<h1 class="text-lg font-bold">{data.query.toUpperCase()}</h1> <div>เป็น<u>เซนเตอร์</u></div></div>
           
            <p class="text-lg">ฉันจะ...</p>
        </div>
        {/if}
        {#if onShareResult}
        <div class="flex flex-col absolute w-[150px] h-[90px] top-[150px] left-[140px] items-center justify-center">
            <p class="text-xs text-center">{data.promise}</p>
        </div>
        {:else}
        <div class="flex flex-col absolute w-[150px] h-[90px] top-[155px] left-[140px] items-center justify-center">
            <p class="text-xs text-center">{data.promise}</p>
        </div>
        {/if}
    </div>
    <div class="flex flex-col justify-center items-center w-[100px] gap-4">
        <Button  on:click={shareResult} >
            <div class="flex flex-row justify-center items-center gap-2 w-[80px]">

                <img src="twitter-white.webp" class="h-[16px] inline-block" alt="" />
                <p>Share</p>
            </div>
        </Button>
        <!-- <Button  on:click={back} outline>
            <div class="flex flex-row justify-center items-center gap-2 w-[80px]">
                <p>Back</p>
            </div>
        </Button> -->
    </div>
</section>