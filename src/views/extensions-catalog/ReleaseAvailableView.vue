<template lang="pug">
.release-list
  h2.release-list-header {{ header }}
  v-list(dense)
    v-list-tile.release-list-content(v-for="release in releases" :key="release.name" @click="")
      v-list-tile-content.release-list-element
        button(@click="selectRelease" :class="{active: currentRelease._id === release._id}") {{ release.name }}
</template>

<script>
import rest from '@/rest';

export default {
  props: {
    header: String,
    releases: Array,
  },
  data () {
    return {
      currentRelease: null,
    };
  },
  created () {
    Event.$once('releases-list-fetched', (releases) => {
      this.currentRelease = releases[0];
    });
  },
  methods: {
    selectRelease (event) {
      this.releases.forEach((rls) => {
        if (rls.name === event.target.innerText) {
          this.currentRelease = rls;
        }
      });
      Event.$emit('release-selected', this.currentRelease);
    }
  },
};

</script>

<style lang="stylus">
.release-list-header
  display block
.release-list-content
  display block

</style>
