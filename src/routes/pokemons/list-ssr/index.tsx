import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div>Hello World SSR</div>;
});

export const head: DocumentHead = {
  title: "PokeQwik - SSR-List",
};
