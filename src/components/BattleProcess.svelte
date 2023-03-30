<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { fade } from "svelte/transition";
    const dispatch = createEventDispatcher();


    let cnt = 0
    onMount(() => {
        while (cnt < 20) {
            setTimeout(() => {
                cnt += 1
            }, 100);
        }
    })
</script>

<section class="absoulute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] relative">
    <p class="relative mx-auto top-[30%]" in:fade={{}}>เป่า</p>
    <p>{cnt}</p>
</section>