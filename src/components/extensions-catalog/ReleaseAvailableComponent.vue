<template lang="pug">
  list-resource-view(@resource-list-selected="fetchExtensions" :header="header" :resources="releasesName")
</template>

<script>
import rest from '@/rest';
import listResourceView from '@/views/extensions-catalog/ListResourceView';
var ObjectID = require("bson-objectid");


export default {
  components: {
    listResourceView,
  },
  props: {
    header: String,
  },
  data () {
    return {
      releases: [],
      application: null,

    };
  },
  created () {
    Event.$once('application-fetched', (data) => {
      this.application = data;
      this.fetchReleases();

    });
  },
  mounted () {
  },
  computed: {
    releasesName () {
      var names = [];
      this.releases.forEach((rls) => {
        names.push(rls.name);
      });
      return names
    }
  },
  methods: {
    fetchReleases () {
      rest.get(`/app/${ObjectID(this.application.id)}/release`).then((resp) => {
        this.releases = resp.data;
        Event.$emit('releases-fetched', this.releases);
      });
    },
    fetchExtensions (release) {
      this.releases.forEach((rls) => {
        if (rls.name === release) {
          Event.$emit('release-selected', rls);
        }
      });

    },
  },
};

</script>
