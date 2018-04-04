<template>
  <div>
    <installedExtensions></installedExtensions>
  </div>
</template>

<script>
import installedExtensions from '@/views/extensions-manager/installed_extensions'

export default {
  name: 'extensionsManager',

  components: {
    installedExtensions
  }
}
</script>

<style>
.installedExtensions {
  margin: 30px;
}
</style>
