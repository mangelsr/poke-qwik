import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Hello Client</div>;
});

export const head: DocumentHead = {
  title: "PokeQwik - Client-List",
};
