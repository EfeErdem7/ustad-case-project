<template>
  <div class="generator">
    <h2>
      Hi{{ userName ? ` ${userName}` : "" }}! Click "Generate" to reveal your
      next furry friend!
    </h2>

    <div class="generator-cat">
      <transition-group name="fade" tag="div" class="image-container">
        <div v-if="showPlaceholder" key="placeholder" class="image-placeholder">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          ></v-progress-circular>
        </div>
        <NuxtImg
          v-show="!showPlaceholder"
          :src="catImageUrl"
          :key="catImageUrl"
          class="cat-image"
          @load="onImageLoad"
        />
      </transition-group>
    </div>

    <CommonButton
      @click="generateCatImage"
      :loading="loading"
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

const catImageUrl = ref(null);
const loading = ref(false);
const showPlaceholder = ref(true);

const userName = computed(() => userStore.user?.name);

const generateCatImage = async () => {
  loading.value = true;
  showPlaceholder.value = true;
  catImageUrl.value = null;
  try {
    const url = await catRepository.getRandomCat();
    catImageUrl.value = url;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const onImageLoad = () => {
  setTimeout(() => {
    showPlaceholder.value = false;
  }, 50);
};

onMounted(() => {
  generateCatImage();
});
</script>

<style lang="scss" scoped>
.generator {
  width: 100%;
  max-width: 60%;
  text-align: center;

  &-cat {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60vh;
    padding: 1rem;
  }
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cat-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
