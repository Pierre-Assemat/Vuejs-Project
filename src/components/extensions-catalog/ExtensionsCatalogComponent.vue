<template lang="pug">
extensions-catalog-view(
  v-if="isLoggedIn",
  :extensions="extensions",
  :application="application",
  :isLoading="isLoading")
</template>

<script>
import ExtensionsCatalogView from '@/views/extensions-catalog/ExtensionsCatalogView';
import rest from '@/rest';
import { mapGetters } from 'vuex';

var ObjectID = require("bson-objectid");

export default {
  components: {
    ExtensionsCatalogView,
  },
  props: {
    app_name: {
      type: String,
      default: 'Slicer',
    }
  },
  data() {
    return {
      isLoading: true,
      application: {},
      filters: {},
      extensions: [],
    };
  },
  created () {
    Event.$on('extensions-filters-updated', (filters) => {
      this.getExtensions(filters);
    });
    if(this.isLoggedIn) {
      this.getApp();
    }
    Event.$on('fetch-application', () => {
      this.getApp();
    });
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'isAdmin']),
  },
  watch: {
    isLoggedIn () {
      // Prevent multiple bind of the event.
      Event.$off(['extensions-filters-updated']);
      Event.$on('extensions-filters-updated', (filters) => {
        this.getExtensions(filters);
      });
      if(this.isLoggedIn) {
        this.getApp();
      }
    },
  },
  methods: {
    getApp() {
      return rest.get('/app', {
        params: {
          name: this.app_name,
        },
      }).then((resp) => {
        this.application = {
          id: resp.data[0]._id,
          name: this.app_name,
        };
        Event.$emit('application-fetched', this.application);
      });
    },
    getExtensions(filters) {
      this.isLoading= true;
      return rest.get(`/app/${ObjectID(this.application.id)}/extension`, {
        params: filters
      }).then((resp) => {
        this.extensions = resp.data;
        Event.$emit('extensions-fetched', this.extensions);
        this.isLoading = false;
      });
    },
  },
};
</script>
