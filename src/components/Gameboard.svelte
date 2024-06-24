<script>
    import Grid from "../components/Grid.svelte";
    import hasMatch from "../services/services";

    let mainSquares = ["", "", "", "", "", "", "", "", ""];

    let enabledBoard = 0;

    let playerMove = "x";

    let currentGameState;

    let superBoardState;

    /**
     * Indica si el juego ha sido reseteado
     */
    let reset = false;

    /**
     * Indica si el juego ha sido iniciado
     */
    let gameStarted = false;

    /**
     * Setea las directrices para el próximo movimiento
     * @param event
     */
    function setBoard(event) {
        //* Indico que el juego ha iniciado
        reset = false;
        gameStarted = true;

        //* Remuevo la clase de la animación inicial
        setInitialAnimations();

        //* Obtengo el estado del último tablero jugado
        currentGameState = event.detail.gameState;

        //* Revisa el ganador de algún tablero
        setWinnerBoard();

        //* En caso de que haya un supermatch, termino el juego
        if (superBoardState?.win) {
            enabledBoard = 100;

            //* Alerto la celebración
            celebrationTime();

            return;
        }

        //* Habilito el tablero para la siguiente jugada
        if (mainSquares[currentGameState.position] == "") {
            enabledBoard = currentGameState.position;
        }

        //* Veo si el tablero habilitado realmente se puede jugar
        while (mainSquares[enabledBoard] != "") {
            if (enabledBoard + 1 <= 8) {
                enabledBoard = enabledBoard + 1;
            } else {
                enabledBoard = 0;
            }
        }

        //* Cambia la jugada
        toggleNextMove();
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

            //* Veo si hay un super match!
            superBoardState = hasMatch(mainSquares, currentGameState.position);
        }
    }

    function celebrationTime() {
        setTimeout(() => {
            alert(
                "¡Juego completado, ganan las: " + superBoardState.playerMove,
            );
            resetGame();
        }, 500);
    }

    /**
     * Reseteo el juego
     */
    function resetGame() {
        mainSquares = ["", "", "", "", "", "", "", "", ""];

        enabledBoard = 0;

        playerMove = "x";

        currentGameState = null;

        superBoardState = null;

        gameStarted = false;

        reset = true;

        //* Reinicio la animación
        setInitialAnimations();
    }

    /**
     * Agrega o elimina la animación inicial
     */
    function setInitialAnimations() {
        if (reset) {
            document.getElementById("main_grid").classList.add("appear");
        } else {
            document.getElementById("main_grid").classList.remove("appear");
        }
    }
</script>

{#if !gameStarted}
    <h1 id="main_title" class="main_title font-bold">¡Super Tic Tac Toe!</h1>
{/if}

<section
    id="main_grid"
    class="relative gameboard_grid flex h-full w-full max-h-[700px] max-w-[700px] appear"
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
                {reset}
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

    .main_title {
        position: absolute;
        font-size: 50px;
        animation-name: vanish;
        animation-duration: 2s;
        animation-fill-mode: forwards;
    }

    .appear {
        animation-name: appear;
        animation-duration: 4s;
    }

    @media (max-width: 620px) {
        .winner_move {
            font-size: 20vw;
        }
    }

    @media (max-width: 400px) {
        .main_title {
            font-size: 40px;
        }
    }

    @keyframes appear {
        from {
            opacity: 0.5;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes vanish {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
</style>
