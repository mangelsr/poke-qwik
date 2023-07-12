import { Slot, component$ } from "@builder.io/qwik";

import Navbar from "~/components/shared/navbar/navbar";
import { ProkemonProvider } from "~/context";

export default component$(() => {
  return (
    <ProkemonProvider>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </ProkemonProvider>
  );
});
