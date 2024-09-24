<template>
  <v-card class="pa-4" max-width="400">
    <v-card-title>{{ isLogin ? "Login" : "Sign Up" }}</v-card-title>
    <v-card-text>
      <!-- Toggle Buttons -->
      <v-btn-toggle v-model="isLogin" class="mb-4" color="primary">
        <v-btn :value="true">Login</v-btn>
        <v-btn :value="false">Sign Up</v-btn>
      </v-btn-toggle>

      <!-- Forms -->
      <v-form @submit.prevent="handleSubmit">
        <!-- Name Field for Sign Up -->
        <v-text-field
          v-if="!isLogin"
          v-model="name"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <!-- Confirm Password for Sign Up -->
        <v-text-field
          v-if="!isLogin"
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary" class="mt-4 w-100">
          {{ isLogin ? "Login" : "Sign Up" }}
        </v-btn>
        <!-- Error Message -->
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
const isLogin = ref(true); // true for login, false for signup
const router = useRouter();
const userStore = useUserStore();

const handleSubmit = async () => {
  if (!isLogin.value) {
    // Sign Up
    if (password.value !== confirmPassword.value) {
      userStore.error = "Passwords do not match.";
      return;
    }
    await userStore.register(name.value, email.value, password.value);
  } else {
    // Login
    await userStore.login(email.value, password.value);
  }
  if (userStore.isAuthenticated) {
    router.push("/");
  }
};
</script>

<style scoped>
/* Add any styles if necessary */
</style>
