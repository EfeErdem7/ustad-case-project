<template>
  <v-card class="login" flat rounded :loading="loading">
    <v-card-text>
      <AuthToggle v-model:isLogin="isLogin" />

      <v-form
        @submit.prevent="handleSubmit"
        ref="form"
        class="d-flex flex-column ga-4"
      >
        <v-text-field
          v-if="!isLogin"
          v-model="name"
          :key="isLogin"
          label="Name"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          :key="isLogin"
          label="Email"
          type="email"
          variant="outlined"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[rules.required]"
          :key="isLogin"
          label="Password"
          type="password"
          variant="outlined"
          required
        ></v-text-field>

        <v-text-field
          v-if="!isLogin"
          v-model="confirmPassword"
          :rules="[rules.required, rules.matchPassword]"
          :key="isLogin"
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
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "~/stores/userStore";
import useValidationRules from "~/composables/useValidationRules";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLogin = ref(true);
const router = useRouter();
const userStore = useUserStore();
const form = ref(null);
const loading = ref(false);

const rules = useValidationRules(password);

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

const resetForm = () => {
  name.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  userStore.error = null;
  if (form.value) {
    form.value.resetValidation();
  }
};

watch(isLogin, () => {
  resetForm();
});
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  padding: 12px 24px;
  border-radius: 8px;

  @include devices(lg) {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
