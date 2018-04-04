<template>
  <div id="app">
    <div class="header">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', {active: currentTab === tab}]"
        v-on:click="currentTab = tab"
      >{{ tab }}</button>
      <div class='header-blank'></div>
    </div>
    <component
      v-bind:is="currentTabComponent"
      class="tab"
    ></component>
  </div>
</template>

<script>
import extensionsCatalog from './components/extensions-catalog/extensions-catalog'
import extensionsManager from './components/extensions-manager/extensions-manager'

export default {
  name: 'App',
  data () {
    return {
      tabs: ['Extensions', 'Browse'],
      currentTab: 'Extensions'
    }
  },
  components: {
    extensionsManager,
    extensionsCatalog
  },
  computed: {
    currentTabComponent: function () {
      var componentsName
      if (this.currentTab === 'Browse') {
        componentsName = 'extensionsCatalog'
      } else if (this.currentTab === 'Extensions') {
        componentsName = 'extensionsManager'
      }
      return componentsName
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  cursor: default;
}
.header {
  display: flex;
}
.tab-button {
  font-size: 1.2em;
  cursor: pointer;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: solid 1px #ccc;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-right: -1px;
}
.tab-button.active {
  background-color: #fff;
  cursor: default;
  border-bottom: none;
}
.header-blank {
  flex: 1;
  border-bottom: solid 1px #ccc;
  vertical-align: bottom;
}
</style>
