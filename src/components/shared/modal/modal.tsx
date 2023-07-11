import type { PropFunction } from "@builder.io/qwik";
import { Slot, component$, useStylesScoped$ } from "@builder.io/qwik";
import ModalStyles from "./modal.css?inline";

interface Props {
  showModal: boolean;
  persistent?: boolean;
  size?: "sm" | "md" | "lg";
  closeFn: PropFunction<() => void>;
}

export const Modal = component$(
  ({ showModal, closeFn, persistent = false, size = "md" }: Props) => {
    useStylesScoped$(ModalStyles);

    return (
      <div
        onClick$={() => {
          if (!persistent) closeFn();
        }}
        class={showModal ? "modal-background" : "hidden"}
      >
        <div
          class={["modal-content", `modal-${size}`]}
          onClick$={(e) => e.stopPropagation()}
        >
          <div class="mt-3 text-center">
            <h3 class="modal-title">
              <Slot name="title" />
            </h3>

            <div class="mt-2 px-7 py-3">
              <div class="modal-content-text">
                <Slot name="content" />
              </div>
            </div>

            {/* Botton */}
            <div class="items-center px-4 py-3">
              <button id="close-btn" onClick$={closeFn} class="modal-button">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
