<template>
  <v-card class="login" flat rounded :loading="loading">
    <v-card-text>
      <div class="d-flex justify-center">
        <v-btn-toggle v-model="isLogin" class="login-toggle">
          <v-btn :value="true" @click.stop="preventToggle(true)">Login</v-btn>
          <v-btn :value="false" @click.stop="preventToggle(false)"
            >Sign Up</v-btn
          >
        </v-btn-toggle>
      </div>

      <v-form
        @submit.prevent="handleSubmit"
        ref="form"
        class="d-flex flex-column ga-4"
      >
        <v-text-field
          v-if="!isLogin"
          v-model="name"
          label="Name"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="Email"
          type="email"
          variant="outlined"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[rules.required]"
          label="Password"
          type="password"
          variant="outlined"
          required
        ></v-text-field>

        <v-text-field
          v-if="!isLogin"
          v-model="confirmPassword"
          :rules="[rules.required, rules.matchPassword]"
          label="Confirm Password"
          type="password"
          variant="outlined"
          required
        ></v-text-field>

        <CommonForgotPassword v-if="isLogin" />

        <CommonButton
          class="w-100"
          height="52px"
          type="submit"
          :loading="loading"
        >
          {{ isLogin ? "Login" : "Sign Up" }}
        </CommonButton>

        <v-alert type="error" v-if="userStore.error" class="mt-2">
          {{ userStore.error }}
        </v-alert>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "~/stores/userStore";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLogin = ref(true);
const router = useRouter();
const userStore = useUserStore();
const form = ref(null);
const loading = ref(false);

const rules = {
  required: (value) => !!value || "Required.",
  email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
  matchPassword: (value) =>
    value === password.value || "Passwords do not match.",
};

const handleSubmit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  try {
    loading.value = true;
    if (!isLogin.value) {
      await userStore.register(name.value, email.value, password.value);
    } else {
      await userStore.login(email.value, password.value);
    }
    if (userStore.isAuthenticated) {
      router.push("/");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    loading.value = false;
  }
};

const preventToggle = (value) => {
  if (isLogin.value === value) return;
  isLogin.value = value;
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  padding: 12px 24px;
  border-radius: 8px;

  &-toggle {
    display: flex;
    gap: 8px;
    padding: 8px 10px;
    background-color: $secondary;
    height: 64px;
    border-radius: 50px;
    margin-bottom: 2rem;

    &:deep(.v-btn--active) {
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
    }
  }
}
</style>
