import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
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

  useVisibleTask$(() => {
    const stringData = localStorage.getItem("pokemon-game");
    if (stringData) {
      const {
        pokemonId = 10,
        isPokemonVisible = true,
        showBackImage = false,
      } = JSON.parse(stringData) as PokemonGameState;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.isPokemonVisible = isPokemonVisible;
      pokemonGame.showBackImage = showBackImage;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.pokemonId,
      pokemonGame.showBackImage,
      pokemonGame.isPokemonVisible,
    ]);
    localStorage.setItem("pokemon-game", JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
