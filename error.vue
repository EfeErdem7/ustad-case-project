<template>
  <NuxtLayout>
    <div class="error">
      <div class="error-inner">
        <h1 class="error-inner-title">{{ error?.statusCode }}</h1>
        <div class="error-inner-content">
          <p>
            It seems a cat took this page!
            <NuxtLink to="/">Click here</NuxtLink> to return home and continue
            generating more cats!
          </p>
          <NuxtImg src="/images/sad-cat.png" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &-inner {
    max-width: 1000px;

    @include devices(md) {
      max-width: 100%;
    }

    &-title {
      font-size: 64px;
    }

    &-content {
      display: flex;
      align-items: center;
      font-size: 40px;
      font-weight: 600;

      @include devices(md) {
        flex-direction: column;
        font-size: 24px;
        gap: 24px;
      }

      p {
        flex: 2;
        line-height: 140%;

        @include devices(md) {
          flex: 1;
        }
      }

      a {
        color: $primary;

        &:hover {
          text-decoration: underline;
        }
      }

      img {
        flex: 1;

        @include devices(md) {
          width: 400px;
        }

        @include devices(sm) {
          width: 80%;
        }
      }
    }
  }
}
</style>
