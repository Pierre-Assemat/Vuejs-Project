<template lang="pug">
extension-infos-view(v-if="isLoggedIn" :extension="extension" @download="download")
</template>

<script>
import ExtensionInfosView from '@/views/extensions-catalog/ExtensionInfosView.vue'
import rest from '@/rest';
import { mapGetters } from 'vuex';

var ObjectID = require("bson-objectid");

export default {
  components: {
    ExtensionInfosView,
  },

  data () {
    return {
      application_id: null,
      extension: null,
    };
  },

  created () {
    var filters = {
        extension_id: this.$route.params.id
      };
    this.application_id = this.$route.params.app_id
    this.getExtension(filters);
  },

  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'isAdmin']),
  },

  methods: {
    getExtension(filters) {
      return rest.get(`/app/${ObjectID(this.application_id)}/extension`, {
        params: filters
      }).then((resp) => {
        this.extension = resp.data[0];
        Event.$emit('extensions-fetched', this.extension);
      });
    },
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
}

</script>
