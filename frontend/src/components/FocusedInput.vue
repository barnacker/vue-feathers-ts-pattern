<template>
  <a v-if="!currentActive"
    class="focused-input inactive d-flex align-center"
    :href="'#'"
    @click="startEdit"
    @focus="startEdit"
  >
    <slot name="view">
      <span class="ml-2">{{ currentValue }}</span>
      <v-icon class="ml-2 icon" small>mdi-pencil</v-icon>
    </slot>
  </a>

  <div v-else
    class="focused-input active d-flex align-center"
  >
    <v-col class="py-0">
      <v-row>
        <v-col class="pa-0">
          <slot name="edit">
            <v-text-field
              ref="input"
              v-model="currentValue"
              hide-details
              dense
              @keyup="keyup"
              @blur="approveEdit"
            />
          </slot>
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
  </div>
</template>

<script lang="ts">
import {
  defineComponent, getCurrentInstance,
} from '@vue/composition-api';

import { useProp, useSyncedProp } from '@/composites/prop';

export default defineComponent({
  name: 'FocusedInput',

  props: {
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    active: { type: Boolean, default: false },
    hideButtons: { type: Boolean, default: false },
  },

  setup(props, context) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = getCurrentInstance() as any;

    const currentActive = useSyncedProp(props, 'active', context);
    const currentValue = useProp(props, 'value');

    return {
      currentValue,
      currentActive,

      // start editing mode and focus on input field
      startEdit() {
        currentActive.value = true;
        instance.$nextTick(() => {
          if (context.refs.input) {
            (context.refs.input as HTMLElement).focus();
          }
          context.emit('edit-start');
        });
      },

      // emits input event (v-model) and cancel editing
      approveEdit() {
        currentActive.value = false;
        context.emit('input', currentValue.value);
        context.emit('edit-approve');
      },

      // reset to original prop value and cancel editing
      cancelEdit() {
        currentActive.value = false;
        currentValue.value = props.value;
        context.emit('edit-cancel');
      },

      keyup(e: KeyboardEvent) {
        if (e.which === 27) { // ESCAPE
          instance.cancelEdit();
          e.stopPropagation();
          e.preventDefault();
        } else if (e.which === 13) { // ENTER
          instance.approveEdit();
          e.stopPropagation();
          e.preventDefault();
        }
      },
    };
  },
});
</script>

<style scoped>
.focused-input {
  padding: 0 .5em;
  height: 34px;
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
