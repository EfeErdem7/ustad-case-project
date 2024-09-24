<template>
  <v-container class="text-center my-5">
    <h2>Hi! Click "Generate" to reveal your next furry friend!</h2>
    <v-btn
      @click="generateCatImage"
      :loading="loading"
      color="primary"
      class="my-4"
    >
      Generate
    </v-btn>

    <!-- Display the Cat Image -->
    <div v-if="catImageUrl">
      <NuxtImg :src="catImageUrl" width="500" />
    </div>
    {{ catImageUrl }}

    <!-- Error Message -->
    <v-alert type="error" v-if="error" class="mt-4">
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { catRepository } from "~/repositories/catRepository";

definePageMeta({
  middleware: "auth",
});

const catImageUrl = ref(null);
const loading = ref(false);
const error = ref(null);

const generateCatImage = async () => {
  loading.value = true;
  error.value = null;
  catImageUrl.value = null;
  try {
    const url = await catRepository.getRandomCat();
    catImageUrl.value = url;
  } catch (err) {
    console.error("Error fetching cat image:", err);
    error.value = "Failed to load cat image. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Add any custom styles here if necessary */
</style>
