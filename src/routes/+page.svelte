<script lang="ts">
    import Display from "./janken-promise/display.svelte";
    import Editor from "./janken-promise/editor.svelte";
    let page = 0
    let data: {query: string; promise: string}
    // let data = {
    //     query: "fortune",
    //     promise: "บังจี้จั้มม บังจี้จั้มม บังจี้จั้มม บังจี้จั้มม บังจี้จั้มม บังจี้จั้มม บังจี้จั้มม บังจี้จั้มม v บังจี้จั้มม บังจี้จั้มม "
    // }
    const nextPage = () => {
        page = 1
    }

    const previousPage = () => {
        page = 0
    }
</script>

{#if page === 0}
<Editor {data} on:submit={(e) => {
    data = e.detail
    nextPage()
}}/>
{:else if page === 1}
<Display {data} on:back={previousPage}/>
{/if}
