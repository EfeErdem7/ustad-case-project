<template>
  <v-app-bar :elevation="0" class="header" app>
    <v-container class="px-4 py-0">
      <v-row align="center" justify="space-between" no-gutters>
        <v-col cols="auto" class="d-flex align-center">
          <NuxtLink to="/" class="d-flex align-center">
            <v-toolbar-title class="header-title">{{ title }}</v-toolbar-title>
            <NuxtImg src="/images/kitty.png" width="32" class="header-title-kitty" />
          </NuxtLink>
        </v-col>

        <v-col class="d-none d-md-flex justify-end">
          <div class="button-container">
            <NuxtLink v-if="!isHomePage" to="/">
              <CommonButton background="blue">Home</CommonButton>
            </NuxtLink>
            <NuxtLink v-if="isAuth && isHomePage" to="/generator">
              <CommonButton background="green">Generate</CommonButton>
            </NuxtLink>
            <NuxtLink v-if="!isAuth && showCommonButton" to="/login">
              <CommonButton background="secondary-light">Login</CommonButton>
            </NuxtLink>
            <NuxtLink v-if="isAuth && showCommonButton" to="/" @click="logout">
              <CommonButton background="primary">Logout</CommonButton>
            </NuxtLink>
          </div>
        </v-col>

        <v-col cols="auto" class="d-flex d-md-none">
          <v-app-bar-nav-icon
            color="white"
            @click.stop="toggleDrawer"
          ></v-app-bar-nav-icon>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
  <AppMobileDrawer
    v-model="drawer"
    :isAuth="isAuth"
    :isHomePage="isHomePage"
    :showCommonButton="showCommonButton"
    :logout="logout"
  />
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
const showCommonButton = computed(
  () => route.path === "/" || route.path === "/generator"
);
const isHomePage = computed(() => route.path === "/");

const logout = () => {
  userStore.logout();
};

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<style lang="scss" scoped>
.header {
  background-color: $secondary !important;

  :deep(.v-toolbar__content) {
    height: 100px !important;

    @include devices(lg) {
      height: 64px !important;
    }
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: white;
  }

  .header-title {
    font-weight: 600;
    font-size: 2rem !important;

    &-kitty {
      @include devices(lg) {
        width: 24px !important;
      }
    }
  }

  .button-container {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  @include devices(lg) {
    .header-title {
      font-size: 1.25rem !important;
    }
  }

}
</style>
