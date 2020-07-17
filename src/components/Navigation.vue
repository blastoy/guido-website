<template lang="pug">
  #navigation
    b-img.mb-4(fluid width="150" :src="require('../assets/me.png')" alt="Profile picture")
    h1.mb-3 {{ me.name }}
    p.mb-4 {{ me.title }}
    b-button.d-block.nav-link.text-center.text-md-left(variant="link" v-for="link in links" :key="link.title" exact :to="link.route") {{ link.title }}
    b-dropdown.d-block.nav-link.pt-1.pr-0(block menu-class="shadow" variant="link" text="Resume" toggle-class="text-center text-md-left")
      b-dropdown-item(href="guido-ruiz-resume.pdf" target="_blank") PDF
      b-dropdown-item(href="guido-ruiz-resume.docx" target="_blank") DOCX
    div.mt-4
      b-button.round-link(variant="outline-primary" :href="`mailto:${me.email}`" target="_blank")
        v-icon(name="envelope")
      b-button.round-link.ml-1(variant="outline-success" :href="`tel:${me.phone}`" target="_blank")
        v-icon(name="phone")
      b-button.round-link.ml-1(variant="outline-github" :href="me.github" target="_blank")
        v-icon(name="brands/github-alt")
      b-button.round-link.ml-1(variant="outline-linkedin" :href="me.linkedin" target="_blank")
        v-icon(name="brands/linkedin-in")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Navigation",
  data: () => ({
    links: [
      {
        title: "About",
        route: "/"
      },
      {
        title: "Skills",
        route: "/skills"
      },
      {
        title: "Experience",
        route: "/experience"
      }
    ]
  }),
  computed: {
    ...mapState(['me'])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// .router-link-active,
// .router-link-exact-active {
//   color: #42b983;
// }
</style>

<style lang="scss">
#navigation {
  .nav-link,
  .nav-link .btn {
    padding-left: 0 !important;
    margin-left: 0 !important;
  }
  .round-link {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    padding: 0;

    svg {
      margin-top: 11px;
    }
  }
}
</style>
