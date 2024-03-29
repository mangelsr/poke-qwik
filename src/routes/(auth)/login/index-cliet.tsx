import {
  $,
  component$,
  useComputed$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";

import styles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const formState = useStore({
    email: "default@email.com",
    password: "123456",
    formPosted: false,
  });

  const emailError = useComputed$(() => {
    if (formState.email.includes("@")) return "";
    return "not-valid";
  });

  const passwordError = useComputed$(() => {
    if (formState.password.length >= 6) return "";
    return "not-valid";
  });

  const isFormValid = useComputed$(() => {
    if (emailError.value === "not-valid" || passwordError.value === "not-valid")
      return false;
    return true;
    // return (
    //   emailError.value !== "not-valid" && passwordError.value !== "not-valid"
    // );
  });

  const onSubmit = $(() => {
    formState.formPosted = true;
    const { email, password } = formState;
    console.log({ email, password });
  });

  return (
    <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
      <div class="relative">
        <input
          value={formState.email}
          onInput$={(event) => {
            formState.email = (event.target as HTMLInputElement).value;
          }}
          class={formState.formPosted ? emailError.value : ""}
          name="email"
          type="text"
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          value={formState.password}
          onInput$={(event) => {
            formState.password = (event.target as HTMLInputElement).value;
          }}
          class={formState.formPosted ? passwordError.value : ""}
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>

      <div class="relative">
        <button disabled={!isFormValid} type="submit">
          Ingresar
        </button>
      </div>

      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});
