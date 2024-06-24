<script>
    import Grid from "../components/Grid.svelte";
    import { onMount } from "svelte";

    let mainSquares = ["", "", "", "", "", "", "", "", ""];

    let enabledBoard = 0;

    let playerMove = "x";

    let currentGameState;

    /**
     * Setea las directrices para el próximo movimiento
     * @param event
     */
    function setBoard(event) {
        currentGameState = event.detail.gameState;

        setWinnerBoard();

        enabledBoard = currentGameState.position;

        //* Cambia la jugada
        // toggleNextMove();
    }

    /**
     * Cambia la jugada para el próximo mivimiento
     */
    function toggleNextMove() {
        if (playerMove == "x") {
            playerMove = "o";
        } else {
            playerMove = "x";
        }
    }

    function setWinnerBoard() {
        if (currentGameState.win) {
            mainSquares[enabledBoard] = currentGameState.playerMove;
            console.log(mainSquares);
        }
    }
</script>

<section
    class="relative gameboard_grid flex h-full w-full max-h-[700px] max-w-[700px]"
>
    {#each mainSquares as mainSquare, i}
        <div class="border-4 border-black relative">
            <!-- Espacio donde va la jugada ganadora -->
            <div
                class="absolute flex items-center justify-center w-full h-full align-middle text-center"
            >
                <span class="winner_move">{mainSquare}</span>
            </div>

            <Grid
                position={i}
                boardDisabled={mainSquare != ""}
                {enabledBoard}
                {playerMove}
                on:gameState={setBoard}
            />
        </div>
    {/each}

    <!-- <div class="max-h-[225px] max-w-[225px]">
        <Grid />
    </div> -->
</section>

<style>
    .gameboard_grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .winner_move {
        font-size: 150px;
    }

    @media (max-width: 620px) {
        .winner_move {
            font-size: 20vw;
        }
    }
</style>
