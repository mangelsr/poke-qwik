import { createContextId } from "@builder.io/qwik";

import type { SmallPokemon } from "~/interfaces/small-pokemon";

export interface PokemonListState {
  currentPage: number;
  pokemons: SmallPokemon[];
  loading: boolean;
  end: boolean;
}

export const PokemonListContext = createContextId<PokemonListState>(
  "pokemon.list-context"
);
