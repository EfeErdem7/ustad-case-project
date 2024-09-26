<template>
  <v-app>
    <AppHeader title="Cat Generator" />
    <div :class="[{ 'login-background': isLoginPage }, 'main']">
      <v-container class="main-container">
        <slot />
      </v-container>
    </div>
    <AppSignature />
  </v-app>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const isLoginPage = computed(() => route.path === "/login");
</script>

<style lang="scss" scoped>
.login-background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("/images/login-bg.png");
  background-size: cover;
  background-position: center;
}

.main {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 100px);

  @include devices(lg) {
    top: 0;
    height: calc(100vh - 64px);
  }

  &-container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding-bottom: 72px;

    @include devices(lg) {
      height: auto;
    }
  }
}
</style>
