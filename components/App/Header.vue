<template>
  <v-app-bar :elevation="0" height="100" class="header">
    <v-container>
      <div class="inner-container">
        <NuxtLink to="/">
          <v-toolbar-title class="header-title">{{ title }}</v-toolbar-title>
          <NuxtImg src="/images/kitty.png" width="32" />
        </NuxtLink>
        <div class="button-container">
          <NuxtLink v-if="isAuth && showGenerateButton" to="/generator">
            <CommonButton :background="'green'"> Generate </CommonButton>
          </NuxtLink>
          <NuxtLink v-if="!isAuth && showCommonButton" to="/login">
            <CommonButton :background="'secondary-light'"> Login </CommonButton>
          </NuxtLink>
          <NuxtLink v-if="isAuth && showCommonButton" to="/" @click="logout">
            <CommonButton :background="'primary'"> Logout </CommonButton>
          </NuxtLink>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useUserStore } from "~/stores/userStore";
import { useRoute } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    default: "Cat Generator",
  },
});

const userStore = useUserStore();
const route = useRoute();

const isAuth = computed(() => userStore.isAuthenticated);
const showCommonButton = computed(() => {
  return route.path === "/" || route.path === "/generator";
});
const showGenerateButton = computed(() => route.path === "/");

const logout = () => {
  userStore.logout();
};
</script>

<style lang="scss" scoped>
.header {
  background-color: $secondary !important;

  .inner-container {
    display: flex;
    justify-content: space-between;

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: white;
    }

    .header-title {
      font-weight: 600;
      font-size: 2rem !important;
    }

    .button-container {
      display: flex;
      gap: 1rem;
    }
  }
}
</style>
