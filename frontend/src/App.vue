<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      :class="{ dislocated: !located, located: located }"
    >
      <div class="d-flex align-center">
        <v-btn icon tile @click="locate">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </v-btn>

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer />

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'App',

  setup() {
    const located = ref(false);
    const locate = () => {
      located.value = true;
    };

    return {
      located,
      locate
    };
  }
});
</script>

<style scoped>
.dislocated {
height:100% !important;
transition: height 1s;
}
.located {
transition: height 1s;
}
</style>
