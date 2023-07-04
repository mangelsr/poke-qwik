import {
  $,
  component$,
  useContext,
  useOnDocument,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { getSmallPokemoms } from "~/helpers/get-small--pokemons";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { PokemonListContext } from "~/context/pokemon/pokemon-list.context";

// Note:
// useSignal are designed to be used with primitives values
// With Objects and Arrays we should use useStore

export default component$(() => {
  const pokemonList = useContext(PokemonListContext);

  // Only run on the browser and after rendering
  // useVisibleTask$();

  // Initially excecuted by the server, then exceuted on the client
  useTask$(async ({ track }) => {
    track(() => pokemonList.currentPage);
    pokemonList.loading = true;
    const pokemons = await getSmallPokemoms(pokemonList.currentPage * 10, 30);
    if (pokemons.length == 0) pokemonList.end = true;
    pokemonList.pokemons = [...pokemonList.pokemons, ...pokemons];
    pokemonList.loading = false;
  });

  useOnDocument(
    "scroll",
    $(() => {
      if (!pokemonList.end && !pokemonList.loading) {
        const maxScroll = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;
        if (currentScroll + 200 >= maxScroll) {
          pokemonList.loading = true;
          pokemonList.currentPage++;
        }
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="">Current page: {pokemonList.currentPage}</span>
        <span class="">Is loading:</span>
      </div>

      <div class="mt-10">
        <button
          onClick$={() => pokemonList.currentPage++}
          class="btn btn-primary"
        >
          Next
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {pokemonList.pokemons.map((pokemon) => (
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
