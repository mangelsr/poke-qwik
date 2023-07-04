import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
} from "@builder.io/qwik";

import { PokemonGameContext, PokemonListContext } from "../context/";
import type { PokemonGameState, PokemonListState } from "../context/";

import Navbar from "~/components/shared/navbar/navbar";
import styles from "./styles.css?inline";

export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    showBackImage: true,
    isPokemonVisible: false,
  });
  useContextProvider(PokemonGameContext, pokemonGame);

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    pokemons: [],
    loading: false,
    end: false,
  });
  useContextProvider(PokemonListContext, pokemonList);

  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
