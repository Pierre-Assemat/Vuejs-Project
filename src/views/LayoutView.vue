<template lang="pug">
  div
    slot
      v-toolbar(color="grey darken-3" dark extended dense)
        v-toolbar-title Slicer Packages Manager
        v-spacer
        header-component
        v-toolbar-items(slot="extension")
          v-btn(small flat to="/extensions-catalog") Browse
          v-btn(small flat to="/extensions-manager") Extensions
      router-view.content
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import { mapGetters } from 'vuex';

export default {
  components: {
    HeaderComponent
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'isAdmin']),
  }
};
</script>

<style lang="stylus">
.content
  margin 10px
  display block
</style>
