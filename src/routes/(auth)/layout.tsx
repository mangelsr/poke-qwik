import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <h2>Auth Layout</h2>
      <Slot />
    </>
  );
});
