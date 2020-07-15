<template lang="pug">
  #experience
    h2.mb-3 {{ experienceHeading }}
    p.mb-5 {{ experienceDesc }}
    .mb-n5
      .mb-5(v-for="exp in experience" :key="exp.title")
        h3.mb-3 {{ exp.title }}
        ul
          li.mb-2(v-for="item in exp.items" :key="item" v-html="item")
</template>

<script>
import me from '@/assets/me.json'

export default {
  name: "Experience",
  data: () => ({
    experience: me.experience
  })
};
</script>
