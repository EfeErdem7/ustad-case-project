<template>
  <v-btn :style="buttonStyle" :class="background">
    <slot />
  </v-btn>
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "160px",
  },
  height: {
    type: String,
    default: "44px",
  },
  background: {
    type: String,
    default: "primary",
    validator: (x) =>
      ["primary", "secondary", "secondary-light", "green", "blue"].includes(x),
  },
});

const buttonStyle = ref({
  width: props.width,
  height: props.height,
  borderRadius: "8px",
  color: "white",
});
</script>

<style lang="scss" scoped>
.v-btn {
  :deep(.v-btn__content) {
    font-size: 20px;
  }
}

.primary {
  background-color: $primary !important;
}

.secondary {
  background-color: $secondary !important;
}

.secondary-light {
  background-color: $secondary-light !important;
}

.green {
  background-color: $green !important;
}

.blue {
  background-color: $blue !important;
}
</style>
