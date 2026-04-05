# PokeQwik App

## Description

This project is part of the course [Qwik - Introducción](https://cursos.devtalles.com/courses/qwik-introduccion) on DevTalles. It's a demo application that showcases different features of Qwik and Qwik City, such as routing, data fetching, global state management, and server-side rendering.

## Features

- **Pokémon Explorer**: Interaction with a Pokémon API to browse and view Pokémon.
- **ChatGPT Integration**: Uses external APIs (like OpenAI) for AI-powered responses.
- **State Management**: Implements the Context API and custom hooks (`use-pokemon-game`, `use-counter`).
- **File-based Routing**: Organized into grouped routes including authentication `(auth)`, user dashboard `dashboard`, basic `counter`, and `(pokemons)`.
- **Server Integrations**: Configured to run on a minimal Express server adapter.

## Project Structure

Inside the `src/` directory, the code is structured as follows:

- `components/`: UI components categorized into `icons`, `pokemon` specific components, and `shared` layouts.
- `context/`: Application-level context providers.
- `helpers/`: Utility functions for API calls (e.g., `get-chatgpt-response.ts`, `get-small-pokemons.ts`).
- `hooks/`: Reusable custom Qwik hooks (`use-counter.tsx`, `use-pokemon-game.tsx`).
- `interfaces/`: TypeScript definitions (`pokemon-list-response.ts`, `small-pokemon.ts`).
- `routes/`: File-system routing handling all application views.

## ENV Config

Rename `.env.template` to `.env` and change the environment variables

## Express Server

This app has a minimal [Express server](https://expressjs.com/) implementation. After running a full build, you can preview the build using the command:

```bash
pnpm serve
```

Then visit [http://localhost:8080/](http://localhost:8080/)
