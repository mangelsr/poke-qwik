import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) redirect(301, "/");
  if (id <= 0) redirect(301, "/");
  if (id > 1010) redirect(301, "/");
  return id;
});

export default component$(() => {
  const {
    pokemonId,
    showBackImage,
    isPokemonVisible,
    toggleFrontBack,
    toggleVisible,
  } = usePokemonGame();

  return (
    <>
      <span class="text-5xl">Pokemon: {pokemonId.value}</span>
      <PokemonImage
        id={pokemonId.value}
        isVisible={isPokemonVisible.value}
        backImage={showBackImage.value}
      />
      <div class="mt-2">
        <button onClick$={toggleFrontBack} class="btn btn-primary">
          Flip
        </button>
        <button onClick$={toggleVisible} class="btn btn-primary ml-2">
          {isPokemonVisible.value ? "Hide" : "Reveal"}
        </button>
      </div>
    </>
  );
});
