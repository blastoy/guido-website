<template lang="pug">
  #resume
    h2.mb-3 {{ me.skillsHeading }}
    p.mb-5 {{ me.skillsDesc }}
    .mb-n5
      .mb-5(v-for="skill in me.skills" :key="skill.key")
        h3.mb-4 {{ skill.label }}
        b-row.mb-3(v-for="item in skill.value" :key="item.key")
          b-col(sm="3")
            p.mb-0 {{ item.label }}
          b-col(sm="9")
            b-progress(height="1.5rem" :variant="expToTheme(item.value)")
              b-progress-bar(:value="expToVal(item.value)") {{ item.value }}
</template>

<script>
import { mapState } from 'vuex'

const EXP_TO_VAL = {
  NOVICE: 25,
  MODERATE: 50,
  ADVANCED: 75,
  ADEPT: 100
};

const EXP_TO_THEME = {
  NOVICE: "novice",
  MODERATE: "moderate",
  ADVANCED: "advanced",
  ADEPT: "adept"
}

export default {
  name: "Skills",
  computed: {
    ...mapState(['me'])
  },
  methods: {
    expToVal(exp) {
      return EXP_TO_VAL[exp];
    },
    expToTheme(exp) {
      return EXP_TO_THEME[exp];
    },
  }
};
</script>
