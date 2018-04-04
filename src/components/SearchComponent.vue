<template lang="pug">
div
  slot
    search(v-model="query", :loading="!!this.pending", :placeholder="placeholder")
</template>

<script>
import { AccessType } from '@/constants';
import rest from '@/rest';
import Search from '@/views/SearchView';

export default {
  components: { Search },
  model: {
    prop: this.results,
    event: 'updated-results',
  },
  props: {
    extensions: {
      default: [],
      type: Array,
    },
    results: {
      default: function () { return [] },
      type: Array,
    },
    level: {
      default: AccessType.READ,
      type: Number,
    },
    placeholder: {
      default: 'Search',
      type: String,
    },
  },
  data() {
    return {
      query: '',
      pending: null,
      next: null,
    };
  },
  watch: {
    query() {
      if (this.pending) {
        this.next = this.query;
      } else {
        this.search(this.query);
      }
    },
  },
  methods: {
    search(q) {
      if (!q) {
        this.$emit('updated-results', this.extensions);
      } else {
        var results = []
        this.extensions.forEach((extension) => {
          var name =  extension.meta.baseName;
          if (name.search(this.query) !== -1) {
            results.push(extension);
          }
        });
        this.$emit('updated-results', results)
      }
    },
  },
};
</script>
