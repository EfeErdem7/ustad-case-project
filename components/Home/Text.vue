<template>
  <div class="home-text">
    <h1 class="home-text-title">
      Hey,{{ !isAuth ? " Guest" : userName ? ` ${userName}` : ""
      }}{{ isAuth && !userName ? "" : "!" }}
    </h1>
    <p class="mb-4">
      Welcome to the Cat Generator! Create unique, adorable cat images with just
      a click. Discover endless quirky and cute felines waiting for you to
      explore!
    </p>
    <p v-if="!isAuth">
      Simply <NuxtLink to="/login">sign in</NuxtLink>, and a new, unique cat
      picture will appear at your command. Who knows what kind of cute or quirky
      feline you'll discover next?
    </p>
    <p v-else class="logged">
      You're logged in! Click <NuxtLink to="/generator">Generate</NuxtLink> to
      uncover your next adorable cat companion!
    </p>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();

const isAuth = computed(() => userStore.isAuthenticated);
const userName = computed(() => userStore.user?.name);
</script>

<style lang="scss" scoped>
.home-text {
  flex: 3;

  &-title {
    font-size: 64px;
    margin-bottom: 1rem;
  }

  p {
    font-size: 32px;
    font-weight: 600;
  }

  a {
    color: $primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.logged {
  color: $secondary;
}
</style>
