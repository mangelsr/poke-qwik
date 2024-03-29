import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import Navbar from "~/components/shared/navbar/navbar";

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwtCookie = cookie.get("jwt");

  // Do validation on server side here...
  if (jwtCookie) {
    console.log("Cookie value", jwtCookie);
  } else {
    redirect(302, "/login");
  }
});

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="flex flex-col justify-center items-center mt-2">
        <span class="text-5xl">Dashboard Layout</span>
        <Slot />
      </div>
    </>
  );
});
