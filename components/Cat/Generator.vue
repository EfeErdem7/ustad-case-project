<template>
  <div class="generator">
    <h2>
      Hi{{ userName ? ` ${userName}` : "" }}! Click "Generate" to reveal your
      next furry friend!
    </h2>

    <div class="generator-cat">
      <transition name="fade">
        <NuxtImg v-if="catImageUrl" :src="catImageUrl" width="500" />
      </transition>
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
import { catRepository } from "~/repositories/catRepository";
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();

const catImageUrl = ref(null);
const loading = ref(false);

const userName = computed(() => userStore.user?.name);

const generateCatImage = async () => {
  loading.value = true;
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

    img {
      width: 100%;
      object-fit: contain;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
