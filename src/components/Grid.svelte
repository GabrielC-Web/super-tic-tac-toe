<script>
    import { onMount } from "svelte";

    let squares = ['','','','','','','','','']

    function addChoice(choice) {

        squares[choice] = "x";

        console.log(hasThreeConsecutiveDiagonal(squares))

    }

    /**
     * Revisa si hay 3 items que coinciden de forma diagonal
     * @param arr
     */
    function hasThreeConsecutiveDiagonal(arr) {
        // Check main diagonal (top-left to bottom-right)
        let mainDiagonal = true;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i][i] !== arr[0][0]) {
                mainDiagonal = false;
                break;
            }
        }

        // Check secondary diagonal (top-right to bottom-left)
        let secondaryDiagonal = true;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i][arr.length - 1 - i] !== arr[0][arr.length - 1]) {
                secondaryDiagonal = false;
                break;
            }
        }

        return mainDiagonal || secondaryDiagonal;
    }

</script>

<section
    class="relative gameboard_grid flex h-full w-full max-h-[700px] max-w-[700px]"
>
    {#each squares as square, i}
        <button
            class="square border-black border-2"
            on:click={() => {
                addChoice(i);
            }}>{square}</button
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
