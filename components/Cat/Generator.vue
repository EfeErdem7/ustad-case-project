<template>
  <div class="generator">
    <h2>
      Hi{{ userName ? ` ${userName}` : "" }}! Click "Generate" to reveal your
      next furry friend!
    </h2>

    <div class="generator-cat">
      <div class="image-container">
        <div
          class="image-placeholder"
          :class="{ 'fade-out': !showPlaceholder }"
        >
          <v-progress-circular indeterminate color="primary" :size="64" />
        </div>
        <NuxtImg
          v-if="catImageUrl"
          :src="catImageUrl"
          :key="catImageUrl"
          class="cat-image"
          :class="{ 'fade-in': !showPlaceholder }"
          @load="onImageLoad"
        />
      </div>
    </div>

    <CommonButton
      @click="generateCatImage"
      :loading="isLoading"
      background="blue"
    >
      Generate
    </CommonButton>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { catRepository } from "~/repositories/catRepository";
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();

const catImageUrl = ref("");
const isLoading = ref(false);
const showPlaceholder = ref(true);

const userName = computed(() => userStore.user?.name ?? "");

const generateCatImage = async () => {
  isLoading.value = true;
  showPlaceholder.value = true;

  try {
    catImageUrl.value = await catRepository.getRandomCat();
  } catch (error) {
    console.error("Failed to fetch cat image:", error);
    showPlaceholder.value = false;
  } finally {
    isLoading.value = false;
  }
};

const onImageLoad = () => {
  setTimeout(() => {
    showPlaceholder.value = false;
  }, 100);
};

onMounted(generateCatImage);
</script>

<style lang="scss" scoped>
.generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 60%;
  text-align: center;

  @include devices(md) {
    gap: 12px;
    max-width: 100%;
  }

  &-cat {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60vh;
    padding: 1rem;

    @include devices(md) {
      height: 50vh;
      padding: 0;
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .image-placeholder,
  .cat-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.5s ease;
  }

  .image-placeholder {
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;

    &.fade-out {
      opacity: 0;
    }
  }

  .cat-image {
    object-fit: contain;
    opacity: 0;

    &.fade-in {
      opacity: 1;
    }
  }
}
</style>
