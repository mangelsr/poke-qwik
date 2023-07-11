import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

interface Props {
  id: number | string;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible = true }: Props) => {
    const isImageLoading = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);
      isImageLoading.value = false;
    });

    const imageUrl = useComputed$(() => {
      if (id === "") return "";
      return backImage
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
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
          src={imageUrl.value}
          alt="Pokemon Sprite"
          class={[
            {
              hidden: !isImageLoading.value,
              "brightness-0": !isVisible,
            },
            "transition-all",
          ]}
          onLoad$={() => (isImageLoading.value = true)}
        />
      </div>
    );
  }
);
