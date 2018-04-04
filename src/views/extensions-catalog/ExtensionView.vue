<template lang='pug'>
  .extension
    v-card(hover color="#ECEFF1")
      v-layout(row)
        v-card-media(height="150px")
          router-link(:to="router_url")
            img.logo(src="../../assets/kitware-logo.png" height="150px")
        .information
          router-link(:to="router_url")
            .text-container
              h3 {{ name }}
              .short-info {{ description }} ({{ app_revision }})
          .action-container
            v-btn(v-bind="{extension: name}" color="success" small
                  @click="downloadExtension") {{ actionExtensionBtn }}
</template>

<script>
export default {
  name: 'Extension',
  props: {
    extension: {
      type: Object,
      required: true,
    },
    application: Object,
  },

  data() {
    return {
      actionExtensionBtn: 'Download',
    };
  },

  watch: {
    router_url () {
      return `/extensions-catalog/${this.application.id}/extension-info/${this.extension._id}`
    }
  },

  computed: {
    name () {
      return this.extension.meta.baseName
    },
    description () {
      return this.extension.description
    },
    app_revision () {
      return this.extension.meta.app_revision
    },
    router_url () {
      return `/extensions-catalog/${this.application.id}/extension-info/${this.extension._id}`
    }
  },

  methods: {
    downloadExtension(event) {
      this.$emit('download', {
        name: event.target.getAttribute('extension'),
      });
    },
  },
};
</script>

<style lang='stylus'>
.extension
  display inline-block
  height 200px
  margin 20px

.extension .card
  border-radius 5px

.information
  display flex
  flex-direction column
  justify-content space-around
  max-width "calc(300 / 2)"
  padding 5px

.information a
  text-decoration none
  color black

</style>
