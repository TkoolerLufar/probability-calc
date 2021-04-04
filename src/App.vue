<template>
  <v-app>
    <v-app-bar app dark color="primary">
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">あれの確率</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/TkoolerLufar/probability-calc.git"
        target="_blank"
      >
        <span class="mr-2">GitHub</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <ProbabilityCalc/>
    </v-main>
  </v-app>
</template>

<script>
import ProbabilityCalc from './components/ProbabilityCalc'

export default {
  name: 'App',
  components: {
    ProbabilityCalc
  },
  data () {
    return {
      //
    }
  }
}
</script>
