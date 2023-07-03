import { component$ } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class="">Current page: </span>
        <span class="">Is loading:</span>
      </div>

      <div class="mt-10">
        <button class="btn btn-primary mr-2">Previous</button>
        <button class="btn btn-primary">Next</button>
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
