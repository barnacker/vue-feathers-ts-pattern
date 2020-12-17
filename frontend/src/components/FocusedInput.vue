<template>
  <a v-if="!currentActive"
    class="focused-input inactive d-flex align-center"
    :href="''"
    @click="startEdit"
    @focus="startEdit"
  >
    <slot name="view">
      <span>{{ currentValue }}</span>
      <v-icon class="ml-2 icon" small>mdi-pencil</v-icon>
    </slot>
  </a>

  <div v-else
    class="focused-input active d-flex align-center"
  >
    <slot name="edit">
      <v-col class="py-0">
        <v-row>
          <v-col class="pa-0">
            <v-text-field
              ref="input"
              v-model="currentValue"
              hide-details
              dense
              @keyup="keyup"
              @blur="approveEdit"
            />
          </v-col>

          <v-col class="pa-0 d-flex align-center" cols="auto">
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
    </slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, getCurrentInstance, ref, watch,
} from '@vue/composition-api';

import { useSyncedProp } from '@/composites/prop';

export default defineComponent({
  name: 'FocusedInput',

  props: {
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    active: { type: Boolean, default: false },
  },

  setup(props, context) {
    const internalInstance = getCurrentInstance();

    const currentActive = useSyncedProp(context, props, 'active');

    // currentValue
    const currentValue = ref(props.value);
    watch((): Ref => props.value, (newValue: string): void => {
      currentValue.value = newValue;
    });

    return {
      currentValue,
      currentActive,

      startEdit() {
        currentActive.value = true;
        internalInstance.$nextTick(() => {
          context.refs.input.focus();
        });
      },

      approveEdit() {
        currentActive.value = false;
        context.emit('input', currentValue.value);
      },

      // reset to original prop value
      cancelEdit() {
        currentActive.value = false;
        currentValue.value = props.value;
      },

      keyup(e: KeyboardEvent) {
        if (e.which === 27) { // ESCAPE
          internalInstance.cancelEdit();
        } else if (e.which === 13) { // ENTER
          internalInstance.approveEdit();
        }
        e.stopPropagation();
        e.preventDefault();
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
