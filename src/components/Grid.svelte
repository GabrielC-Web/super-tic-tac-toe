<script>
    import { onMount, createEventDispatcher, afterUpdate } from "svelte";

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

        if (!gameState.win) {
            boardDisabled = true;
        }

        //* Emito el evento con el update del juego
        dispatch("gameState", {
            gameState,
        });
    }

    /**
     * Revisa si hay 3 items que coinciden en una fila o columna
     * @param arr
     */
    function hasMatch(arr, position) {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];

            if (element != "") {
                //* Para ver si hay 3 seguidos en fila 1
                if (arr[0] != "" && arr[0] == arr[1] && arr[0] == arr[2]) {
                    return { win: true, playerMove: arr[0] };
                    //* Para ver si hay 3 seguidos en fila 2
                } else if (
                    arr[3] != "" &&
                    arr[3] == arr[4] &&
                    arr[3] == arr[5]
                ) {
                    return { win: true, playerMove: arr[3] };
                    //* Para ver si hay 3 seguidos en fila 3
                } else if (
                    arr[6] != "" &&
                    arr[6] == arr[7] &&
                    arr[6] == arr[8]
                ) {
                    return { win: true, playerMove: arr[6] };
                    //* Para ver si hay 3 seguidos en columna
                } else if (element == arr[i + 3] && element == arr[i + 6]) {
                    return { win: true, playerMove: element };
                    //* Para ver si hay 3 seguidos en diagonal
                } else if (
                    arr[0] != "" &&
                    arr[0] == arr[4] &&
                    arr[0] == arr[8]
                ) {
                    return { win: true, playerMove: arr[0] };
                    //* Para ver si hay 3 seguidos en diagonal inverso
                } else if (
                    arr[2] != "" &&
                    arr[2] == arr[4] &&
                    arr[2] == arr[6]
                ) {
                    return { win: true, playerMove: arr[2] };
                }
            }
        }
        return { win: false, position: position };
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
