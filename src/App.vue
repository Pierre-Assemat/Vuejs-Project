<template lang="pug">
v-app
  router-view
</template>

<script>
import LayoutView from '@/views/LayoutView';
import { authDialogModes } from '@/store/auth';
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    LayoutView
  },
  data() {
    return {
      showingAuthDialog: this.authDialogVisible,
      app_name: "Slicer",
      tabs: ['Browse', 'Extensions'],
      tabItems: ['extensionsCatalog', 'extensionsManager'],
    };
  },
  created () {
    var filters = {};
    Event.$on('release-selected', (data) => {
      filters.release_id = data._id;
      Event.$emit('extensions-filters-updated', filters);
    });
    Event.$on('OS-selected', (data) => {
      filters.os = data;
      Event.$emit('extensions-filters-updated', filters);
    });
    Event.$on('arch-selected', (data) => {
      filters.arch = data;
      Event.$emit('extensions-filters-updated', filters);
    });
  },
  computed: {
    ...mapState('auth', ['authDialogMode', 'authDialogVisible']),
    ...mapGetters('auth', ['isLoggedIn', 'isAdmin']),
  },
  watch: {
    authDialogVisible(val) {
      this.showingAuthDialog = val;
    },
    showingAuthDialog(val) {
      this.showAuthDialog({ visible: val });
    },
  },
  methods: {
    doLogout() {
      this.logout();
      this.$router.push({ path: '/' });
    },
    showLoginDialog () {
      this.showAuthDialog({ mode: authDialogModes.LOGIN, visible: true });
    },
    showRegisterDialog () {
      this.showAuthDialog({ mode: authDialogModes.REGISTER, visible: true });
    },
    ...mapActions('auth', ['showAuthDialog']),
    ...mapActions('auth', ['logout']),
  },
};
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  cursor default
  background-color #ffffff

</style>
