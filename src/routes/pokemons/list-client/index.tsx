import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { SmallPokemon } from "~/interfaces/small-pokemon";

// Note:
// useSignal are designed to be used with primitives values
// With Objects and Arrays we should use useStore

interface PokemonState {
  currentPage: number;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonState>({
    currentPage: 0,
    pokemons: [],
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="">Current page: {pokemonState.currentPage}</span>
        <span class="">Is loading:</span>
      </div>

      <div class="mt-10">
        <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary mr-2"
        >
          Previous
        </button>

        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary"
        >
          Next
        </button>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {/* {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.name}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage id={pokemon.id} />
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))} */}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik - Client-List",
};
