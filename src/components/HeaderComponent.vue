<template lang='pug'>
.auth-container
  v-btn(flat small v-if="!isLoggedIn" @click="showLoginDialog") Log In
  v-btn(flat small v-if="!isLoggedIn" @click="showRegisterDialog") Register
  v-btn(flat small v-if="isLoggedIn" @click="doLogout") Log Out
  v-dialog(max-width="500px", v-model="showingAuthDialog", @keydown.esc="showingAuthDialog = false")
    auth-container(@login="showingAuthDialog = false", @register="showingAuthDialog = false")
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';
import AuthContainer from '@/components/AuthContainer';
import { authDialogModes } from '@/store/auth';


export default {
  name: 'Header',
  components: {
    AuthContainer,
  },
  data() {
    return {
      showingAuthDialog: this.authDialogVisible,
    };
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

<style>
.extensions{
  display: inline-block;
  width: 70%;
  text-align: center;
  vertical-align: top;
}
</style>
