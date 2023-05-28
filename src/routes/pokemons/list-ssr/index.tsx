import { component$, useComputed$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { type SmallPokemon } from "~/interfaces/small-pokemon";
import { getSmallPokemoms } from "~/helpers/get-small--pokemons";
import { PokemonImage } from "~/components/pokemon/pokemon-image";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset") || "0");
    if (isNaN(offset)) redirect(301, pathname);
    if (offset < 0) redirect(301, pathname);
    return await getSmallPokemoms(offset);
  }
);

export default component$(() => {
  const location = useLocation();
  const pokemons = usePokemonList();

  const currentOffset = useComputed$<number>(() => {
    const offsetString = location.url.searchParams.get("offset");
    return Number(offsetString) || 0;
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="">Current offset: {currentOffset.value} </span>
        <span class="">
          Is navigating: {location.isNavigating ? "Yes" : "No"}
        </span>
      </div>

      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Previous
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary"
        >
          Next
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemons.value.map((pokemon) => (
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
  title: "PokeQwik - SSR-List",
};
