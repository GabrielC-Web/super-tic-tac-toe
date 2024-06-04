<script>
    import Grid from "../components/Grid.svelte";
    import { onMount } from "svelte";

    let mainSquares = ["", "", "", "", "", "", "", "", ""];

    onMount(() => {
        console.log("asdad");
    });
</script>

<section
    class="relative gameboard_grid flex h-full w-full max-h-[700px] max-w-[700px]"
>
    {#each mainSquares as mainSquare}
        <div class="border-4 border-black">
            <Grid />
        </div>
    {/each}
</section>

<style>
    .gameboard_grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
</style>
