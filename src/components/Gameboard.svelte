<section class="relative h-full w-full max-h-[700px] max-w-[700px]">
    <hr class="gameboard_line_horizontal horizontal1" />
    <hr class="gameboard_line_horizontal horizontal2" />
    <hr class="gameboard_line_vertical vertical1" />
    <hr class="gameboard_line_vertical vertical2" />
</section>

<style>
    .gameboard_grid {
        /* display: grid;
        grid-template-columns: repeat(3, fr); */
    }

    .horizontal1 {
        top: 33.3333333%;
    }

    .horizontal2 {
        bottom: 33.3333333%;
    }

    .vertical1 {
        left: 33.3333333%;
    }

    .vertical2 {
        right: 33.3333333%;
    }

    .gameboard_line_horizontal {
        @apply w-full h-4 absolute bg-black;
    }

    .gameboard_line_vertical {
        @apply w-4 h-full absolute bg-black;
    }
</style>
