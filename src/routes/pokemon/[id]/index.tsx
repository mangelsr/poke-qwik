import { component$, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { PokemonGameContext } from "~/context/pokemon/pokemon-game.context";
import { PokemonImage } from "~/components/pokemon/pokemon-image";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) redirect(301, "/");
  if (id <= 0) redirect(301, "/");
  if (id > 1010) redirect(301, "/");
  return id;
});

export default component$(() => {
  const pokemonGame = useContext(PokemonGameContext);
  return (
    <>
      <span class="text-5xl">Pokemon: {pokemonGame.pokemonId}</span>
      <PokemonImage
        id={pokemonGame.pokemonId}
        isVisible={pokemonGame.isPokemonVisible}
        backImage={pokemonGame.showBackImage}
      />
    </>
  );
});
