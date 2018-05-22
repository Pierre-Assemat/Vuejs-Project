<template lang="pug">
.extensions-catalog
  .filters-extensions
    SearchComponent(v-model="results" ,:extensions="extensions")
    filter-component
    release-available-component(header="Releases")
    list-resource-view(@resource-list-selected="filterByCategory", header="Categories", :resources="categories")
  .extensions-container
    .extensions-list(v-if="filteredExtensions.length !== 0 && isLoading === false")
      extension-component(
        @detailed-extension-info="detailedExtensionInfo",
        v-for="extension in filteredExtensions",
        :key="extension.id",
        :extension="extension",
        :application="application")
    .no-extensions(v-else-if="isLoading === false")
      span {{ msg_no_extension }}
    .loading(v-else)
      v-progress-circular(indeterminate, color="primary", :size="50")
</template>

<script>
import ExtensionComponent from '@/components/extensions-catalog/ExtensionComponent';
import listResourceView from '@/views/extensions-catalog/ListResourceView';
import FilterComponent from '@/components/extensions-catalog/FilterComponent';
import ReleaseAvailableComponent from '@/components/extensions-catalog/ReleaseAvailableComponent';
import SearchComponent from '@/components/SearchComponent';

export default {
  name: 'ExtensionsCatalog',

  components: {
    ExtensionComponent,
    listResourceView,
    ReleaseAvailableComponent,
    FilterComponent,
    SearchComponent,
  },

  props: ['header', 'extensions', 'application', 'isLoading'],

  data() {
    return {
      msg_no_extension: 'No extensions found...',
      results: [],
      app_id: '',
      currentCategory: '',
      currentRelease: '',
      types: ['item'],
    };
  },

  created() {
    Event.$on('extensions-fetched', (data) => {
      this.results = data;
    });
  },

  computed: {
    categories () {
      var categories = ['All'];
      this.extensions.forEach((extension) => {
        if (extension.meta.category) {
          if (!categories.includes(extension.meta.category)) {
            categories.push(extension.meta.category);
          }
        }
      });
      return categories;
    },
    filteredExtensions() {
      if (this.currentCategory === 'All' || !this.currentCategory) {
        return this.results;
      }
      var filterExtensions = [];
      this.results.forEach((extension) => {
        if (extension.meta.category === this.currentCategory) {
          filterExtensions.push(extension);
        }
      });
      return filterExtensions;
    },
  },

  watch: {
    results: {
      handler() {

      },
      deep: true,
    },
  },

  methods: {
    filterByCategory (category) {
      this.currentCategory = category;
    },
    detailedExtensionInfo (event) {
      console.log('event: ', event);
    },
  },
};
</script>

<style lang="stylus">
.extensions-catalog
  margin-top 30px
  display flex
  flex-wrap wrap
.filters-extensions
  width 10%
.extensions-container
  width 90%
  text-align center
.no-extensions, .loading
  font-size 2em
  padding-top 20px
</style>
