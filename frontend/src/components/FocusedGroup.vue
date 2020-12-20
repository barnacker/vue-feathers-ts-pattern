<template>
  <a
    :class="{ 'focused-input': true,
              'd-flex': true,
              'align-center': true,
              active: currentActive,
              inactive: !currentActive
    }"
    :href="'#'"
    @click="startEdit"
    @focus="startEdit"
    @focusout="blurGroup"
    @keyup="keyup"
  >
    <div v-if="!currentActive" style="display: flex;">
      <div>
        <slot />
      </div>
      <v-icon class="ml-2 icon" small>mdi-pencil</v-icon>
    </div>
    <v-col v-else>
      <v-row>
        <v-col class="pa-0">
          <slot name="edit" v-bind="{ data: currentValue }" />
        </v-col>

        <v-col
          v-if="!hideButtons"
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

import _ from 'lodash';
import { useProp } from '@/composites/prop';

export default defineComponent({
  name: 'FocusedGroup',

  props: {
    value: { type: Object, default: () => ({}) },
    hideButtons: { type: Boolean, default: false },
  },

  setup(props, context) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const instance = getCurrentInstance()!;

    const currentValue = useProp(props, 'value');
    const currentActive = ref(false);

    watch(currentActive, (newValue): void => {
      if (newValue) {
        instance.$nextTick(() => {
          const input = instance.$el.querySelector('input');
          if (input) {
            if (!input.readOnly) {
              input.select();
            }
          }
        });
      }
    });

    // start editing mode and focus on input field
    const startEdit = (): void => {
      if (!currentActive.value) {
        currentActive.value = true;
        context.emit('edit-start');
      }
    };

    // emits input event (v-model) and cancel editing
    const approveEdit = (): void => {
      currentActive.value = false;
      const clone = _.cloneDeep(currentValue.value);
      context.emit('input', clone);
      context.emit('edit-approve');
    };

    // reset to original prop value and cancel editing
    const cancelEdit = (): void => {
      currentActive.value = false;
      currentValue.value = _.cloneDeep(props.value);
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
  text-decoration: none;
  color: initial;
  outline: none;
}
.focused-input.inactive > div > .icon {
  opacity: .3;
}
.focused-input.inactive:hover > div > .icon {
  opacity: 1;
}
.focused-input.inactive:hover {
  background-color: rgba(100, 100, 100, .05);
  font-weight: bold;
  cursor: pointer;
}
</style>
