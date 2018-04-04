<template>
  <div class="installedExtensions">
    <installedExtension
      v-for="installedExt in installedExtensions"
      v-bind:key="installedExt.id"
      v-bind:title="installedExt.title"
      v-bind:info="installedExt.info"
    ></installedExtension>
  </div>
</template>

<script>
import installedExtension from '@/views/extensions-manager/installed_extension'

export default {
  name: 'installedExtensions',

  data () {
    return {
      installedExtensions: [
        {id: 0, title: 'AnglePanes', info: 'Julia Lopinto'},
        {id: 1, title: 'ABC', info: 'Marcel Prastawa'},
        {id: 2, title: 'Anomalous Filters', info: 'Antonio Carlos'},
        {id: 3, title: 'Cardiac Agatston', info: 'Jessica Forbes'},
        {id: 4, title: 'CMFreg', info: 'Vinicius Boen'},
        {id: 5, title: 'Change Tracker', info: 'Andrey Fedorov'}
      ]
    }
  },

  components: {
    installedExtension
  }
}
</script>

<style>

</style>
