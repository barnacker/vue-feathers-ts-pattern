<template>
  <v-container grid-list-xs>
    <v-row>{{ first }}</v-row>
    <v-row>{{ address1 }}</v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Some Form
          </v-card-title>

          <v-card-text>
            <focused-input v-model="first" label="first name" />
            <focused-input v-model="last" label="last name" />

            <focused-group v-model="phone1">
              <span>{{ phone1.type }}</span>, <span>{{ phone1.number }}</span>

              <template v-slot:edit="{ data }">
                <v-select
                  v-model="data.type"
                  :items="Object.keys(phoneType)"
                  label="Standard"
                  dense
                />
                <v-text-field v-model="data.number" label="Number" />
              </template>
            </focused-group>

            <focused-group v-model="address1">
              <div>{{ address1.street }}</div>
              <span>{{ address1.city }}</span>, <span>{{ address1.country }}</span>
              <div>{{ address1.zip }}</div>

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
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            Some Form
          </v-card-title>

          <v-card-text>
            <focused-input v-model="first" />
            <focused-input v-model="last" />

            <focused-group v-model="phone1">
              <span>{{ phone1.type }}</span>, <span>{{ phone1.number }}</span>

              <template v-slot:edit="{ data }">
                <v-select
                  v-model="data.type"
                  :items="Object.keys(phoneType)"
                  label="Standard"
                  dense
                />
                <v-text-field v-model="data.number" label="Number" />
              </template>
            </focused-group>

            <focused-group v-model="address1">
              <div>{{ address1.street }}</div>
              <span>{{ address1.city }}</span>, <span>{{ address1.country }}</span>
              <div>{{ address1.zip }}</div>

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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import FocusedInput from '@/components/FocusedInput.vue';
import FocusedGroup from '@/components/FocusedGroup.vue';

enum phoneType {
  Home = 'Home',
  Mobile = 'Mobile',
  Work = 'Work',
}

export default defineComponent({
  name: 'FormTest',

  components: {
    FocusedInput,
    FocusedGroup,
  },

  setup() {
    const first = ref('John');
    const last = ref('Connor');
    const phone1 = ref({ type: phoneType.Home, number: '5142223333' });
    const phone2 = ref({ type: phoneType.Work, number: '5145555555' });

    const address1 = ref({
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
      first,
      last,
      phone1,
      phone2,
      address1,
      address2,
      phoneType,
    };
  },
});
</script>
