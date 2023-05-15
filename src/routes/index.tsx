import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const pokemonId = useSignal(1);

  return (
    <>
      <span class="text-2xl">Simple search</span>
      <span class="text-9xl">{pokemonId}</span>
      {/* TODO: Add pokemon image */}
      <div class="mt-2">
        <button class="btn btn-primary mr-2">Previous</button>
        <button class="btn btn-primary">Next</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Firsr qwik app",
    },
  ],
};
