<template lang="pug">
extension-view(@download="download", :extension="extension", :application="application")
</template>

<script>
import ExtensionView from '@/views/extensions-catalog/ExtensionView';
import rest from '@/rest';
var ObjectID = require("bson-objectid");

export default {
  components: { ExtensionView },
  props: {
    extension: Object,
    application: Object,
  },
  data() {
    return {
      folder: null,
    };
  },
  methods: {
    download() {
      rest.get(`/item/${this.extension._id}/files`).then((resp) => {
        var files = resp.data;
        if (files) {
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.style = "display: none";

          rest.get(`/file/${files[0]._id}/download`).then((resp) => {
            var blob = new Blob([resp.data], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = files[0].name;
            a.click();
            window.URL.revokeObjectURL(url);
          });
        }
      });
    },
  },

};
</script>
