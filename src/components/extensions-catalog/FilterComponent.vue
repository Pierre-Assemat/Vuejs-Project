<template lang="pug">
.metadata-form
  v-select(@change="updateOs" :items="os_list" item-value="value" v-model="os" label="OS" single-line clearable dense)
  v-select(@change="updateArch" :items="arch_list" item-value="value" v-model="arch" label="Architecture" single-line clearable dense)
</template>

<script>

export default {
  props: ['header'],
  data () {
       return {
         os: null,
         os_list: [
           {text: 'Mac OSX', value: 'macosx'},
           {text: 'Windows', value: 'win'},
           {text: 'Linux', value: 'linux'},
         ],
         arch: null,
         arch_list: [
           {text: '64-bit', value: 'amd64'},
           {text: '32-bit', value: 'i386'},
         ],
      }
  },

  created () {
    if (window.navigator.userAgent.indexOf('Windows') != -1) {
      this.os = {text: 'Windows', value: 'win'};
    }
    if (window.navigator.userAgent.indexOf('Mac') != -1) {
      this.os = {text: 'Mac OSX', value: 'macosx'};
    }
    if (window.navigator.userAgent.indexOf('Linux') != -1) {
      this.os = {text: 'Linux', value: 'linux'};
    }
    this.arch = this.arch_list[0];
  },

  methods: {
    updateOs (data) {
      Event.$emit('OS-selected', data);
    },
    updateArch (data) {
      Event.$emit('arch-selected', data);
    }
  },
};

</script>
