<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    export let tournament: object

    let firstTime = false
    let view = false
    
    const dispatch = createEventDispatcher();

    const close = () => {
        dispatch('close')
        if (document.body.querySelector('.brackets-viewer')) {
                document.body.removeChild(document.querySelector('.brackets-viewer'))
            }
    }
    onMount(() => {
        firstTime = true
        render()
    })

    const render = () => {
        if (firstTime) {
            view = true
            const newBracket = document.createElement('div')
            newBracket.classList.add('brackets-viewer', 'z-40', 'absolute', 'top-0', 'left-0', 'w-full', 'h-full')
            if (document.body.querySelector('.brackets-viewer')) {
                document.body.removeChild(document.querySelector('.brackets-viewer'))
            }
            document.body.appendChild(newBracket)
            window.bracketsViewer.render({
                stages: tournament.stage,
                matches: tournament.match,
                matchGames: tournament.match_game,
                participants: tournament.participant
            });
        }
    }
    
    $: tournament && render();

</script>

<section class="absolute top-4 right-4 z-50">
    <Button outline on:click={close} btnClass="border-2 border-black p-2 rounded-lg flex flex-col justify-center items-center aspect-square"><img src="https://img.icons8.com/ios/32/000000/multiply.png"/></Button>
</section>

<!-- <Button on:click={render}>Rerender</Button> -->