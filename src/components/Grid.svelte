<script>
    import { onMount, createEventDispatcher, afterUpdate } from "svelte";
    import hasMatch from "../services/services";

    /**
     * Array de cuadros del tablero
     */
    let squares = ["", "", "", "", "", "", "", "", ""];

    /**
     * Jugada disponible a realizar en el tablero
     */
    export let playerMove = "x";

    /**
     * Estado del juego
     */
    let gameState = { win: false, position: undefined, playerMove: undefined };

    /**
     * Indica que el tablero está deshabilitado
     */
    export let boardDisabled = false;

    /**
     * Emite eventos
     */
    const dispatch = createEventDispatcher();

    /**
     * Posición o índice del tablero
     */
    export let position;

    /**
     * Indica si el tablero está habilitado
     */
    export let enabledBoard;

    export let reset;

    onMount(() => {
        //* Deshabilito todos los tableros menos el inicial
        if (position != 0) {
            boardDisabled = true;
        }
    });

    afterUpdate(() => {
        //* Deshabilito todos los tableros menos el inicial
        if (position == enabledBoard) {
            boardDisabled = false;
        }

        if (reset) {
            resetGame();
        }
    });

    /**
     * Agrega la opción al tablero
     * @param choice
     */
    function addChoice(choice) {
        if (boardDisabled || squares[choice] != "") {
            return;
        }

        //* Agrego la opción escogida al tablero
        squares[choice] = playerMove;

        // gameFinished = hasMatch(squares);
        gameState = hasMatch(squares, choice);

        boardDisabled = true;

        //* Emito el evento con el update del juego
        dispatch("gameState", {
            gameState,
        });
    }

    function resetGame() {
        squares = ["", "", "", "", "", "", "", "", ""];

        enabledBoard = 0;

        playerMove = "x";

        gameState = { win: false, position: undefined, playerMove: undefined };
    }
</script>

<section
    class="relative gameboard_grid flex h-full w-full max-h-[700px] max-w-[700px] {boardDisabled
        ? 'opacity-5'
        : ''}"
>
    {#each squares as square, i}
        <!-- En caso de que haya contenido -->
        {#if square}
            <button
                class="square border-black border-2 p-0"
                on:click={() => {
                    addChoice(i);
                }}>{square}</button
            >
            <!-- En caso de que no haya contenido -->
        {:else}
            <button
                class="square border-black border-2 p-0 text-transparent"
                on:click={() => {
                    addChoice(i);
                }}>{"/"}</button
            >
        {/if}
    {/each}
</section>

<style>
    .gameboard_grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .square {
        @apply flex items-center justify-center text-5xl;
        max-width: 75px;
        max-height: 75px;
    }
</style>
