import { $, component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  const nav = useNavigate();

  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value <= 0) return;
    pokemonGame.pokemonId += value;
  });

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonGame.pokemonId}/`);
  });

  return (
    <>
      <span class="text-2xl">Simple search</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>
      <div onClick$={goToPokemon}>
        <PokemonImage
          id={pokemonGame.pokemonId}
          backImage={pokemonGame.showBackImage}
          isVisible={pokemonGame.isPokemonVisible}
        />
      </div>
      <div class="mt-2">
        <button
          onClick$={() => changePokemonId(-1)}
          class="btn btn-primary mr-2"
        >
          Previous
        </button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary">
          Next
        </button>
        <button
          onClick$={() =>
            (pokemonGame.showBackImage = !pokemonGame.showBackImage)
          }
          class="btn btn-primary ml-2"
        >
          Flip
        </button>
        <button
          onClick$={() =>
            (pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)
          }
          class="btn btn-primary ml-2"
        >
          {pokemonGame.isPokemonVisible ? "Hide" : "Reveal"}
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
