import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  const nav = useNavigate();

  const {
    pokemonId,
    showBackImage,
    isPokemonVisible,
    nextPokemon,
    prevPokemon,
    toggleFrontBack,
    toggleVisible,
  } = usePokemonGame();

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonId.value}/`);
  });

  return (
    <>
      <span class="text-2xl">Simple search</span>
      <span class="text-9xl">{pokemonId.value}</span>
      <div onClick$={goToPokemon}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>
      <div class="mt-2">
        <button onClick$={prevPokemon} class="btn btn-primary mr-2">
          Previous
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary">
          Next
        </button>
        <button onClick$={toggleFrontBack} class="btn btn-primary ml-2">
          Flip
        </button>
        <button onClick$={toggleVisible} class="btn btn-primary ml-2">
          {isPokemonVisible.value ? "Hide" : "Reveal"}
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Firsr qwik app",
    },
  ],
};
