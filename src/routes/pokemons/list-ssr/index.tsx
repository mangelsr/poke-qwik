import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import type {
  PokemonListResponse,
  BasicPokemonInfo,
} from "../../../interfaces/pokemon-list-response";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
  );
  const data = (await response.json()) as PokemonListResponse;
  return data.results;
});

export default component$(() => {
  const pokemons = usePokemonList();

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="">Current offset: xxx</span>
        <span class="">Is navigating: xxx</span>
      </div>

      <div class="mt-10">
        <Link class="btn btn-primary mr-2">Previous</Link>
        <Link class="btn btn-primary">Next</Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.name}
            class="m-5 flex flex-col justify-center items-center"
          >
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik - SSR-List",
};
