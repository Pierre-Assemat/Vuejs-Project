<template lang="pug">
v-container(fluid)
  v-layout
    v-flex
      v-card.extension-info-container(color="" width="75%")
        v-container(fluid)
          v-layout(row)
            v-flex
              img.logo(src="../../assets/kitware-logo.png" height="200px")
            v-flex(sm12)
              v-layout(column)
                v-flex
                  v-layout(row justify-space-between)
                    h1(v-if="category") {{ baseName }} ({{ category }})
                    h1(v-else) {{ baseName }}
                    span Slicer revision ({{ app_revision }})
                v-flex
                  v-layout(row)
                    v-flex(sm6)
                      v-list(dense)
                        v-list-tile
                          v-list-tile-content
                            v-list-tile-title Created on {{ date }}
                        v-list-tile
                          v-list-tile-content
                            v-list-tile-title Revision: {{ revision }}
                        v-list-tile
                          v-list-tile-content
                            v-list-tile-title Size of {{ size }}
                        v-list-tile
                          v-list-tile-content
                            v-list-tile-title Available for {{ os }} in {{ arch }}
                      span
                    v-flex(sm6)
                      .links(v-if="repo_url")
                        h2 Links:
                        span {{ repo_url }}
                      .screenshots(v-if="screenshots")
                        h2 Screenshots:
                        img.logo(src="../../assets/kitware-logo.png" height="100px")
                        img.logo(src="../../assets/kitware-logo.png" height="100px")
                        img.logo(src="../../assets/kitware-logo.png" height="100px")
          v-layout(row)
            v-flex(sm12)
              .description(v-if="description")
                h2 Description:
                p {{ description }}
            v-flex
              v-btn(color="success" small @click="downloadExtension") {{ actionExtensionBtn }}
</template>

<script>

export default {
  props: {
    extension: Object,
  },

  data () {
    return {
      actionExtensionBtn: 'Download',
    };
  },

  computed: {
    baseName () {
      if (this.extension) {
        return this.extension.meta.baseName;
      }
    },
    app_revision () {
      if (this.extension) {
        return this.extension.meta.app_revision;
      }
    },
    revision () {
      if (this.extension) {
        return this.extension.meta.revision;
      }
    },
    description () {
      if (this.extension) {
        return this.extension.description;
      }
    },
    date () {
      if (this.extension) {
        var date = new Date(this.extension.created);
        return date.toUTCString();
      }
    },
    size () {
      if (this.extension) {
        return this.fileSizeSI(this.extension.size);
      }
    },
    os () {
      if (this.extension) {
        if (this.extension.meta.os === 'macosx')
          return 'Mac OSX';
        else if (this.extension.meta.os === 'linux')
          return 'Linux';
        else if (this.extension.meta.os === 'win')
          return 'Windows';
      }
    },
    arch () {
      if (this.extension) {
        if (this.extension.meta.arch === 'amd64')
          return '64-bit';
        else if (this.extension.meta.arch === 'i386')
          return '32-bit';
      }
    },
    repo_url () {
      if (this.extension) {
        // return this.extension.meta.repo_url;
        return true
      }
    },
    category () {
      if (this.extension) {
        return this.extension.meta.category;
      }
    },
    screenshots () {
      if (this.extension) {
        // return this.extension.meta.screenshots;
        return true
      }
    },
  },

  methods: {
    downloadExtension () {
      this.$emit('download', {});
    },
    fileSizeSI (a,b,c,d,e) {
      return (b=Math,c=b.log,d=1e3,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2) + ' ' + (e?'kMGTPEZY'[--e]+'B':'Bytes');
    },
  },
};
</script>

<style lang='stylus'>
.extension-info-container
  margin auto
  border-radius 5px
</style>
