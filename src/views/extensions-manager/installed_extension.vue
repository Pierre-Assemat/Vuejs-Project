<template>
  <div class="installed-extension">
    <img class="logo" src="../../assets/kitware-logo.png">
    <div class="installed-extension-infos" v-on:click="detailedExtensionInfo">
      <h2>{{ title }}</h2>
      <p class="short-info">{{ info }}</p>
    </div>
    <div class="installed-extension-actions">
      <button class="basic-action-btn" v-on:click="enableExtension">{{ actionInstalledExtensionBtn }}</button>
      <button class="basic-action-btn" v-on:click="RemoveExtension">Remove</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'installedExtension',
  props: {
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      actionInstalledExtensionBtn: 'Disable'
    };
  },
  methods: {
    detailedExtensionInfo(e) {
      console.log(e.target.childNodes[0].data || e.target.childNodes[0].innerText)
    },
    enableExtension(e) {
      if (this.actionInstalledExtensionBtn === 'Disable') {
        this.actionInstalledExtensionBtn = 'Enable'
      } else {
        this.actionInstalledExtensionBtn = 'Disable'
      }
      console.log(e.target.parentElement.parentElement.childNodes[2].childNodes[0].innerText)
    },
    RemoveExtension(e) {
      console.log(e.target.parentElement.parentElement.childNodes[2].childNodes[0].innerText)
    }
  }
}
</script>

<style>
h2, p {
  margin: 5px;
}
.installed-extension {
  display: flex;
  margin: 10px;
  border-bottom: solid 1px #ccc;
}
.installed-extension .logo{
  width: 50px;
  height: 50px;
  margin: 5px;
}
.installed-extension-infos {
  flex: 1;
  cursor: pointer;
}
.basic-action-btn {
  cursor: pointer;
  font-size: 1em;
  min-width: 64px;
  padding: 7px;
  margin-left: 5px;
  background-color: #fff;
  border: solid 1px #ccc;
  border-radius: 3px;
  position: relative;
  top: 15%
}
.basic-action-btn:hover {
  background-color: #f2f2f2;
}
.basic-action-btn:active {
  background-color: #d9d9d9;
}
</style>
