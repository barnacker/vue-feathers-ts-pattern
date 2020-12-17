<template>
  <div v-if="!currentActive">
    <span>{{ currentValue }}</span>

    <slot name="view" />
  </div>

  <div v-else>
    <v-input v-model="currentValue" />

    <v-button @click="cancelEdit">
      <v-icon>mdi-close</v-icon>
    </v-button>

    <v-button @click="approveEdit">
      <v-icon>mdi-checkmark</v-icon>
    </v-button>

    <slot name="edit" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch,
} from '@vue/composition-api';

export default defineComponent({
  name: 'FocusedInput',

  props: {
    value: { type: String, default: '' },
    active: { type: Boolean, default: false },
  },

  setup() {
    // currentActive
    const currentActive = ref(this.active);
    watch(this.active, (newValue) => {
      currentActive.value = newValue;
    });
    watch(currentActive, (newValue) => {
      this.$emit('active:update', newValue);
    });

    // currentValue
    const currentValue = ref(this.value);
    watch(this.value, (newValue) => {
      currentValue.value = newValue;
    });
    watch(currentValue, (newValue) => {
      this.$emit('input', newValue);
    });

    return {
      currentValue,
      currentActive,

      approveEdit() {
        currentActive.value = false;
      },

      cancelEdit() {
        currentActive.value = false;
      },
    };
  },
});
</script>
