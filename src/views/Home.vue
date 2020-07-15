<template lang="pug">
  #home
    h2.mb-3 {{ homeHeading1 }}
    p.mb-5 {{ about }}
    h2.mb-3 {{ homeHeading2 }}
    b-table.mb-5(bordered striped :items="items" :fields="fields")
</template>

<script>
import {
  homeHeading1,
  homeHeading2,
  about,
  details
} from '@/assets/me.json'

export default {
  name: "Home",
  data: () => ({
    homeHeading1,
    homeHeading2,
    about,
    items: details.map((d) => ({ key: d.label, value: d.value })),
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
  })
};
</script>
