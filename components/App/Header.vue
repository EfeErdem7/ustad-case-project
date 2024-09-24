<template>
  <v-app-bar :elevation="0" height="100" class="header">
    <v-container>
      <v-toolbar-title class="header-title">{{ title }}</v-toolbar-title>
    </v-container>
  </v-app-bar>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Cat Generator",
  },
});
</script>

<style lang="scss" scoped>
.header {
  background-color: $secondary !important;
  color: white !important;

  &-title {
    font-weight: 600;
    font-size: 2rem;
  }
}
</style>
