<template lang="pug">
  #experience
    h2.mb-3 {{ me.experienceHeading }}
    p.mb-5 {{ me.experienceDesc }}
    .mb-n5
      .mb-5(v-for="exp in me.experience" :key="exp.title")
        h3.mb-3 {{ exp.title }}
        ul
          li.mb-2(v-for="item in exp.items" :key="item" v-html="item")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Experience",
  computed: {
    ...mapState(['me'])
  }
};
</script>
