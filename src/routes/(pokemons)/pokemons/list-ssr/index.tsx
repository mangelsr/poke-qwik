import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { type SmallPokemon } from "~/interfaces/small-pokemon";
import { getChatGPTResponse } from "~/helpers/get-chatgpt-response";
import { getSmallPokemoms } from "~/helpers/get-small--pokemons";
import { Modal } from "~/components/shared";
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

  const pokemonModal = useStore({
    id: "",
    name: "",
  });

  const modalVisible = useSignal(false);

  const chatGPTPokeFact = useSignal("");

  useVisibleTask$(({ track }) => {
    track(() => pokemonModal.name);
    chatGPTPokeFact.value = "";
    if (pokemonModal.name !== "") {
      getChatGPTResponse(pokemonModal.name).then((response) => {
        chatGPTPokeFact.value = response;
      });
    }
  });

  const showModal = $((id: string, name: string) => {
    pokemonModal.id = id;
    pokemonModal.name = name;
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
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

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.name}
            onClick$={() => showModal(pokemon.id, pokemon.name)}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage id={pokemon.id} />
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>

      <Modal persistent showModal={modalVisible.value} closeFn={closeModal}>
        <div q:slot="title">{pokemonModal.name}</div>
        <div q:slot="content" class="flex flex-col justify-center items-center">
          <PokemonImage id={pokemonModal.id} />
          <span>
            {chatGPTPokeFact.value === ""
              ? "Asking ChatGPT..."
              : chatGPTPokeFact.value}
          </span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik - SSR-List",
};
