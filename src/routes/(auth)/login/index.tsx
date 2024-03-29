import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

import styles from "./login.css?inline";

export const useLoginUserAction = routeAction$(
  (data, { cookie, redirect }) => {
    const { email, password } = data;
    if (email === "miguel@google.com" && password === "123456") {
      const jwt = "this_is_my_jwt";
      cookie.set("jwt", jwt, { secure: true, path: "/" });
      redirect(302, "/");
    } else {
      return {
        success: false,
      };
    }
  },
  zod$({
    email: z.string().email("Invalid format"),
    password: z.string().min(6, "At least 6 characters"),
  })
);

export default component$(() => {
  useStylesScoped$(styles);
  const action = useLoginUserAction();
  return (
    <Form action={action} class="login-form">
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input name="password" type="password" placeholder="Password" />
        <label for="password">Password</label>
      </div>

      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      <code>{JSON.stringify(action.value, undefined, 2)}</code>
    </Form>
  );
});
