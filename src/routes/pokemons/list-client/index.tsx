import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { getSmallPokemoms } from "~/helpers/get-small--pokemons";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import type { SmallPokemon } from "~/interfaces/small-pokemon";

// Note:
// useSignal are designed to be used with primitives values
// With Objects and Arrays we should use useStore

interface PokemonState {
  currentPage: number;
  pokemons: SmallPokemon[];
  loading: boolean;
  end: boolean;
}

export default component$(() => {
  const pokemonState = useStore<PokemonState>({
    currentPage: 0,
    pokemons: [],
    loading: false,
    end: false,
  });

  // Only run on the browser and after rendering
  // useVisibleTask$();

  // Initially excecuted by the server, then exceuted on the client
  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    pokemonState.loading = true;
    const pokemons = await getSmallPokemoms(pokemonState.currentPage * 10, 30);
    if (pokemons.length == 0) pokemonState.end = true;
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.loading = false;
  });

  useOnDocument(
    "scroll",
    $(() => {
      if (!pokemonState.end && !pokemonState.loading) {
        const maxScroll = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;
        if (currentScroll + 200 >= maxScroll) {
          pokemonState.loading = true;
          pokemonState.currentPage++;
        }
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="">Current page: {pokemonState.currentPage}</span>
        <span class="">Is loading:</span>
      </div>

      <div class="mt-10">
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary"
        >
          Next
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {pokemonState.pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage id={pokemon.id} />
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik - Client-List",
};
