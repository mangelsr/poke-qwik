import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  backImage?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false }: Props) => {
    const isImageLoading = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);
      isImageLoading.value = false;
    });

    return (
      <div
        class="flex items-center justify-center"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {!isImageLoading.value && <span>Loading...</span>}
        <img
          width={size}
          height={size}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            backImage ? "back" : ""
          }/${id}.png`}
          alt="Pokemon Sprite"
          class={{
            hidden: !isImageLoading.value,
          }}
          onLoad$={() => (isImageLoading.value = true)}
        />
      </div>
    );
  }
);
