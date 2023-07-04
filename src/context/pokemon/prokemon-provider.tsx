import {
  Slot,
  component$,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";

import { PokemonGameContext, PokemonListContext } from "../";
import type { PokemonGameState, PokemonListState } from "../";

export const ProkemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    showBackImage: true,
    isPokemonVisible: false,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    pokemons: [],
    loading: false,
    end: false,
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  return <Slot />;
});
