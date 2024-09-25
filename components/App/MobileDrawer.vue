<template>
  <v-navigation-drawer
    v-model="localDrawer"
    location="right"
    app
    temporary
    class="d-md-none h-screen drawer"
  >
    <v-list class="drawer-list">
      <NuxtLink
        v-if="isAuth && showGenerateButton"
        to="/generator"
        @click="closeDrawer"
      >
        <v-list-item>
          <v-list-item-title class="mobile-link">
            <CommonButton background="green">Generate</CommonButton>
          </v-list-item-title>
        </v-list-item>
      </NuxtLink>
      <NuxtLink
        v-if="!isAuth && showCommonButton"
        to="/login"
        @click="closeDrawer"
      >
        <v-list-item>
          <v-list-item-title class="mobile-link">
            <CommonButton background="secondary-light">Login</CommonButton>
          </v-list-item-title>
        </v-list-item>
      </NuxtLink>
      <NuxtLink v-if="isAuth && showCommonButton" to="/" @click="handleLogout">
        <v-list-item>
          <v-list-item-title class="mobile-link">
            <CommonButton background="primary">Logout</CommonButton>
          </v-list-item-title>
        </v-list-item>
      </NuxtLink>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  isAuth: {
    type: Boolean,
    required: true,
  },
  showGenerateButton: {
    type: Boolean,
    required: true,
  },
  showCommonButton: {
    type: Boolean,
    required: true,
  },
  logout: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const localDrawer = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const closeDrawer = () => {
  localDrawer.value = false;
};

const handleLogout = () => {
  props.logout();
  closeDrawer();
};
</script>

<style lang="scss" scoped>
.mobile-link {
  text-align: center;
  font-size: 20px;
  color: $primary;
}

.drawer {
  background-color: $secondary;

  &-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
