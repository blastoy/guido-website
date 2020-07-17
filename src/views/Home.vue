<template lang="pug">
  #home
    h2.mb-3(@click="home") {{ me.homeHeading }}
    p.mb-5 {{ me.about }}
    h2.mb-3 {{ me.homeHeading2 }}
    b-table.mb-5(bordered striped :items="items" :fields="fields")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Home",
  data: () => ({
    fields: [
      {
        key: "key",
        thClass: "d-none"
      },
      {
        key: "value",
        thClass: "d-none"
      }
    ],
  }),
  computed: {
    ...mapState(['me']),
    items() {
      return this.me.details.map((d) => ({ key: d.label, value: d.value }))
    },
  },
  methods: {
    home() {
      this.$router.push('/');
    }
  }
};
</script>
