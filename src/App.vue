<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>例のあれがああなる確率</span>
        <!--span class="font-weight-light">MATERIAL DESIGN</span-->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/TkoolerLufar/probability-calc.git"
        target="_blank"
      >
        <span class="mr-2">GitHub</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <Top/>
    </v-content>
  </v-app>
</template>

<script>
import Top from './components/Top'

export default {
  name: 'App',
  components: {
    Top
  },
  data () {
    return {
      //
    }
  }
}
</script>
