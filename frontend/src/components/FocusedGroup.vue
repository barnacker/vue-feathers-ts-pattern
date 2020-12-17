<template>
  <a v-if="!currentActive"
    class="focused-input inactive d-flex align-center"
    :href="'#'"
    @click="startEdit"
  >
    <div>
      <slot name="view" v-bind="{ data: currentValue }" />
    </div>
  </a>

  <a v-else
    class="focused-input active d-flex align-center"
    :href="'#'"
    @focusout="blurGroup"
    @keyup="keyup"
  >
    <v-col class="py-0">
      <v-row>
        <v-col class="pa-0">
          <slot name="edit" v-bind="{ data: currentValue }"/>
        </v-col>

        <v-col v-if="!hideButtons"
          class="pa-0 d-flex align-center"
          cols="auto"
        >
          <v-btn
            style="min-width: 0"
            tabindex="-1"
            icon
            small
            @click="cancelEdit"
          >
            <v-icon class="pa-1" color="error" small>mdi-close</v-icon>
          </v-btn>

          <v-btn
            style="min-width: 0"
            tabindex="-1"
            icon
            small
            @click="approveEdit"
          >
            <v-icon class="pa-1" color="success" small>mdi-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </a>
</template>

<script lang="ts">
import {
  defineComponent, getCurrentInstance, watch, ref,
} from '@vue/composition-api';

import { useSyncedProp } from '@/composites/prop';

export default defineComponent({
  name: 'FocusedGroup',

  props: {
    value: { type: Object, default: () => ({}) },
    active: { type: Boolean, default: false },
    hideButtons: { type: Boolean, default: false },
  },

  setup(props, context) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const instance = getCurrentInstance()!;

    const currentValue = ref(JSON.parse(JSON.stringify(props.value)));

    watch(props.value, (): void => {
      console.log('watch props.value', JSON.stringify(props.value));
      currentValue.value = JSON.parse(JSON.stringify(props.value));
    });

    const currentActive = useSyncedProp(context, props, 'active');

    watch(currentActive, (newValue): void => {
      if (newValue) {
        instance.$nextTick(() => {
          const input = instance.$el.querySelector('input');
          if (input) {
            input.select();
          }
        });
      }
    });

    // start editing mode and focus on input field
    const startEdit = (): void => {
      currentActive.value = true;
      context.emit('edit-start');
    };

    // emits input event (v-model) and cancel editing
    const approveEdit = (): void => {
      currentActive.value = false;
      context.emit('input', JSON.parse(JSON.stringify(currentValue.value)));
      context.emit('edit-approve');
    };

    // reset to original prop value and cancel editing
    const cancelEdit = (): void => {
      currentActive.value = false;
      currentValue.value = JSON.parse(JSON.stringify(props.value));
      context.emit('edit-cancel');
    };

    return {
      currentValue,
      currentActive,
      startEdit,
      cancelEdit,
      approveEdit,

      keyup(e: KeyboardEvent) {
        if (e.which === 27) { // ESCAPE
          cancelEdit();
          e.stopPropagation();
          e.preventDefault();
        } else if (e.which === 13) { // ENTER
          approveEdit();
          e.stopPropagation();
          e.preventDefault();
        }
      },

      blurGroup(e: FocusEvent) {
        if (!instance.$el.contains(e.relatedTarget as Node)) {
          approveEdit();
        }
      },
    };
  },
});
</script>

<style scoped>
.focused-input {
  padding: 0 .5em;
  text-decoration: none;
  color: initial;
}
.focused-input.inactive > .icon {
  opacity: .5;
}
.focused-input.inactive:hover > .icon {
  opacity: 1;
}
.focused-input.inactive:hover {
  background-color: rgba(100, 100, 100, .05);
  font-weight: bold;
  cursor: pointer;
}
</style>
