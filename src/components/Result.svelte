<script lang="ts">
	import { Button, Modal, P } from "flowbite-svelte";
	import { onMount } from "svelte";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    const proceed = () => {
        dispatch('next')
    }

    export let resultPageData: {
        user: string,
        currentOpponent: string,
        foxNumber: number,
        isDefeated: boolean,
        isFirstRound: boolean,
        currentRound: number,
        lastRound: object[],
        participantList: { [key: number] : string},
    }

    const startOver = () => {
        location.reload()
    }

</script>

    <section class="max-w-[500px] w-full flex flex-col items-center gap-8 pt-16">
        <h1 class="text-center font-bold text-4xl">{resultPageData.isDefeated? "Defeated": "Victorious"}</h1>
        <p>{resultPageData.isDefeated? "หว่ายย แพ้ซะละ~" :"ก็ไม่เท่าไหร่นี่นา~"}{' '}{resultPageData.isDefeated && (resultPageData.currentRound > 3)? "แต่ยังติดเซมนะ!": ""}</p>
        <div class="grid grid-cols-2 items-center justify-bewteen gap-4 sm:gap-8 p-4">
                <img class="h-[274px] w-[218px] object-cover p-2 bg-red-300 rounded-lg {resultPageData.isDefeated? "grayscale": ""} ease-in-out duration-500" src="https://randomfox.ca/images/{resultPageData.foxNumber}.jpg" alt="">
                <img class="{!resultPageData.isDefeated? "grayscale": ""} h-[274px] w-[218px] object-contain p-2  from-pink-300 to-green-300 rounded-lg bg-gradient-to-t ease-in-out duration-500" src="profile/half/{resultPageData.currentOpponent}.webp" alt="">
                <p class="font-bold text-2xl text-center">{resultPageData.user}</p>
                <p class="font-bold text-2xl text-center">{resultPageData.currentOpponent}</p>
        </div>
        {#if resultPageData.isDefeated}
            <Button size="xl" on:click={() => startOver()}>Play Again</Button>
        {:else}
            <Button size="xl" on:click={() => proceed()}>Proceed</Button>
        {/if}
        <h1 class="text-center font-bold text-4xl">Results</h1>
        <div class="flex flex-col items-center gap-4 w-full pb-8">
            {#each resultPageData.lastRound as match}
                {#if match.round_id == resultPageData.currentRound - 1}
                    {#if match.opponent1 == null || match.opponent2 == null} 
                        {#if match.opponent1 == null}
                        <div class="bg-white border w-[80%]">
                                <p>{resultPageData.participantList[match.opponent2.id]}</p>
                            </div>
                        {:else if match.opponent2 == null}
                        <div class="bg-white border w-[80%] text-black p-2 rounded-lg flex flex-row gap-4 items-center justify-between">
                            <div class="flex flex-row gap-4 items-center">
                                <img src="profile/icon/{resultPageData.participantList[match.opponent1.id]}.webp" class="aspect-square rounded-full h-[32px]" alt="">
                                <p>{resultPageData.participantList[match.opponent1.id]}</p>
                            </div>
                            <p class="px-4">BYE</p>
                        </div>
                        {/if}
                        <!-- {JSON.stringify(match)} -->
                    {:else if match?.opponent1?.id != 75 && match?.opponent2?.id != 75}
                        {#if match.opponent1?.result == 'win'}
                        <div class="bg-gradient-to-r from-green-400 to-red-400 border w-[80%] text-black p-2 rounded-lg flex flex-row gap-4 items-center justify-between">
                            <div class="flex flex-row gap-4 items-center">
                                <img src="profile/icon/{resultPageData.participantList[match.opponent1.id]}.webp" class="aspect-square rounded-full h-[32px]" alt="">
                                <p>{resultPageData.participantList[match.opponent1.id]}</p>
                            </div>
                            <div class="flex flex-row gap-4 items-center">
                                <p>{resultPageData.participantList[match.opponent2.id]}</p>
                                <img src="profile/icon/{resultPageData.participantList[match.opponent2.id]}.webp" class="aspect-square rounded-full h-[32px]" alt="">
                            </div>
                        </div>
                        {:else if match.opponent2?.result == 'win'}
                        <div class="bg-gradient-to-l from-green-400 to-red-400 border w-[80%] text-black p-2 rounded-lg flex flex-row gap-4 items-center justify-between">
                            <div class="flex flex-row gap-4 items-center">
                                <img src="profile/icon/{resultPageData.participantList[match.opponent1.id]}.webp" class="aspect-square rounded-full h-[32px]" alt="">
                                <p>{resultPageData.participantList[match.opponent1.id]}</p>
                            </div>
                            <div class="flex flex-row gap-4 items-center">
                                <p>{resultPageData.participantList[match.opponent2.id]}</p>
                                <img src="profile/icon/{resultPageData.participantList[match.opponent2.id]}.webp" class="aspect-square rounded-full h-[32px]" alt="">
                            </div>
                        </div>
                        {/if}
                    {/if}
                {/if}
            {/each}
        </div>
        <!-- {JSON.stringify(resultPageData.lastRound)} -->
    </section>