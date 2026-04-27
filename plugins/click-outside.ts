import { v4 as uuidv4 } from 'uuid';

const handlers: unknown = {};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding) {
      const id = uuidv4();
      el.setAttribute('dir-id', id);

      let latch = false;

      handlers[id] = {
        callback: (event: unknown) => {
          if (latch) {
            const clickedEl = event.target;
            if (!clickedEl) {
              return;
            }
            if (!el.contains(clickedEl)) {
              binding.value();
            }
          }
          else {
            latch = true;
          }
        },
      };

      if (typeof document !== 'undefined') {
        document.addEventListener('click', handlers[id].callback);
      }
    },
    beforeUnmount(el) {
      const id = el.getAttribute('dir-id');
      if (id && typeof document !== 'undefined') {
        document.removeEventListener('click', handlers[id].callback);
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete handlers[id];
      }
    },
  });
});
