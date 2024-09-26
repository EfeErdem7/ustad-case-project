<template>
  <div class="d-flex justify-center">
    <v-btn-toggle v-model="localIsLogin" class="login-toggle">
      <v-btn :value="true" @click.stop="preventToggle(true)">Login</v-btn>
      <v-btn :value="false" @click.stop="preventToggle(false)">Sign Up</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isLogin"]);

const localIsLogin = ref(props.isLogin);

const preventToggle = (value) => {
  if (localIsLogin.value === value) return;
  localIsLogin.value = value;
};

watch(localIsLogin, (newValue) => {
  emit("update:isLogin", newValue);
});
</script>

<style scoped lang="scss">
.login-toggle {
  display: flex;
  gap: 8px;
  padding: 8px 10px;
  background-color: $secondary;
  height: 64px !important;
  border-radius: 50px;
  margin-bottom: 2rem;

  @include devices(md) {
    height: 56px !important;
  }

  :deep(.v-btn--active) {
    background-color: $primary;

    .v-btn__overlay {
      opacity: 1 !important;
      background-color: unset !important;
    }
  }

  button {
    width: 120px;
    text-transform: none;
    letter-spacing: normal;
    background-color: transparent;
    flex: 1;
    color: white;
    border-radius: 50px !important;
    font-size: 20px;

    @include devices(md) {
      font-size: 16px;
      width: 100px;
    }
  }
}
</style>
