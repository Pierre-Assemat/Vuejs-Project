<template lang='pug'>
.resources
  h2 {{ header }}
  v-list.resource-list(dense)
    v-list-tile(v-for="resource in resources" :key="resources.indexOf(resource)")
      v-list-tile-action
        button(:class="['resource', {active: currentResource === resource}]"
               @click="changeCurrentResource") {{ resource }}
</template>

<script>
export default {
  props: ['header', 'resources'],
  data () {
    return {
      resourceActive: this.resources[0],
    }
  },
  computed: {
    currentResource: {
      get () {
        var output = this.resourceActive ? this.resourceActive : this.resources[0];
        this.$emit('resource-list-selected', output);
        return output;
      },
      set (val) {
        this.resourceActive = val;
      },
    }
  },
  methods: {
    changeCurrentResource: function (e) {
      this.currentResource = e.target.innerText;
    },

  }
}
</script>

<style lang='stylus'>
.resources
  display block
  min-width 10%

.resource-list
  background-color #fafafa

button:hover
  color #ccc

.resource.active
  color #0066ff

</style>
