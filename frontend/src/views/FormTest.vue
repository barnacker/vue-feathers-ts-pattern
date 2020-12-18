<template>
  <v-card>
    <v-card-title>
      This is an about page
    </v-card-title>

    <v-card-text>
      <focused-group v-model="address">
        <div>{{ address.street }}</div>
        <span>{{ address.city }}</span>, <span>{{ address.country }}</span>
        <div>{{ address.zip }}</div>

        <template v-slot:edit="{ data }">
          <v-text-field v-model="data.street" label="Street" autofocus />
          <div>{{ data.street }}</div>
          <v-text-field v-model="data.city" label="City" />
          <v-text-field v-model="data.country" label="Country" />
          <v-text-field v-model="data.zip" label="Zip Code" />
        </template>
      </focused-group>

      <focused-group v-model="address2">
        <div>{{ address2.street }}</div>
        <span>{{ address2.city }}</span>, <span>{{ address2.country }}</span>
        <div>{{ address2.zip }}</div>

        <template v-slot:edit="{ data }">
          <v-text-field v-model="data.street" label="Street" autofocus />
          <v-text-field v-model="data.city" label="City" />
          <v-text-field v-model="data.country" label="Country" />
          <v-text-field v-model="data.zip" label="Zip Code" />
        </template>
      </focused-group>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { reactive, defineComponent, ref } from '@vue/composition-api';

import FocusedInput from '@/components/FocusedInput.vue';
import FocusedGroup from '@/components/FocusedGroup.vue';

export default defineComponent({
  name: 'HelloWorld',

  components: {
    FocusedInput,
    FocusedGroup,
  },

  setup() {
    const address = ref({
      street: '123 de la rue',
      city: 'Montreal',
      country: 'Canada',
      zip: 'J2S 1Y4',
    });

    const address2 = ref({
      street: '278 de la flute',
      city: 'Repentigny',
      country: 'Canada',
      zip: 'G1F 2S2',
    });

    return {
      address,
      address2,
    };
  },
});
</script>
