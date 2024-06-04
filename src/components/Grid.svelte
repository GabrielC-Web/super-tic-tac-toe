<script>
    import { onMount } from "svelte";

    let squares = [
        {
            value: "",
        },
        {
            value: "",
        },
        {
            value: "",
        },
        {
            value: "",
        },
        {
            value: "",
        },
        {
            value: "",
        },
        {
            value: "",
        },
        {
            value: "",
        },
        {
            value: "",
        },
    ];

    onMount(() => {
        console.log("asdad");
    });

    function addChoice(choice) {
        console.log(choice);
        squares[choice].value = "x";
    }

    const handleClick = () => {
        console.log("asd");
    };
</script>

<section
    class="relative gameboard_grid flex h-full w-full max-h-[700px] max-w-[700px]"
>
    {#each squares as square, i}
        <button
            class="square border-black border-2"
            on:click={() => {
                addChoice(i);
            }}>{square.value}</button
        >
    {/each}
</section>

<style>
    .gameboard_grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .square {
        @apply flex items-center justify-center text-5xl;
    }
</style>
