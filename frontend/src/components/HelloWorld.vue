<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          What's next?
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Important Links
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Ecosystem
        </h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>

    <v-btn color="success" @click="updThing">test</v-btn>
    <v-btn color="error" @click="drawer.close">test drawer close</v-btn>

    <v-container>
      <v-row>
        <v-col class="pa-0" cols="3">
          <focused-input v-model="uName" hide-buttons />
          <focused-input v-model="another" />
        </v-col>
        <v-col class="pa-0" cols="3">
          <focused-input v-model="uName" />
        </v-col>
        <v-col class="pa-0" cols="3">
          <focused-group>
            <template v-slot:view>
              <div>ALLO</div>
              <div>{{ uName }}</div>
            </template>
            <template v-slot:edit>
              <focused-input v-model="uName" />
              <focused-input v-model="another" />
            </template>
          </focused-group>
        </v-col>
      </v-row>
    </v-container>

    <div>dimension.profondeur: {{ box.dimension.profondeur }}</div>
    <div>Opened: {{ drawer.isOpened }}</div>
    <div>isProfound: {{ box.isProfound }}</div>
    <div>myCompute: {{ computes.myCompute.value }}</div>
    <div>Comfortable[box.dimension.comfortable]: {{ Comfortable[box.dimension.comfortable] }}</div>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent, ref, reactive, toRefs, computed,
} from '@vue/composition-api';

import { useBox, Comfortable } from '@/composites/box';

import FocusedInput from './FocusedInput.vue';
import FocusedGroup from './FocusedGroup.vue';

enum Drawer {
  Opened,
  Closed,
}

const useDrawer = () => {
  const state = ref(Drawer.Closed);

  const open = (): void => {
    state.value = Drawer.Opened;
  };

  const close = (): void => {
    state.value = Drawer.Closed;
  };

  const isOpened = computed(() => state.value === Drawer.Opened);

  return {
    state,
    open,
    close,
    isOpened,
  };
};

export default defineComponent({
  name: 'HelloWorld',

  components: {
    FocusedInput,
    FocusedGroup,
  },

  setup() {
    const uName = ref('MeMyselfAndI');
    const another = ref('Another');

    const box = useBox();
    const drawer = useDrawer();

    const ecosystem = reactive([
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ]);

    const importantLinks = ref([
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ]);

    const whatsNext = ref([
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ]);
    const unAffaire = ref({ a: '1', b: 2 });
    const unAutre = reactive({ a: '1', b: 2 });

    // Test reactivity behavior
    const updThing = (): void => {
      const { text } = toRefs(ecosystem[1]);
      console.log(unAffaire, unAutre, drawer);
      text.value = 'poil';
      box.dimension.profondeur = 20;
      drawer.open();
    };

    const computes = {
      myCompute: computed(() => 'fix'),
    };

    console.log(Comfortable[box.dimension.comfortable]);

    return {
      drawer: ref(drawer),
      box: ref(box),
      uName,
      another,
      ecosystem,
      importantLinks,
      whatsNext,
      updThing,
      computes,
      Comfortable,
    };
  },
});
</script>
