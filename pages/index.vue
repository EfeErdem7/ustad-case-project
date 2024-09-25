<template>
  <div class="homepage-content">
    <HomeText />
    <NuxtImg src="/images/home-cat.png" />
  </div>
</template>

<style lang="scss" scoped>
.homepage-content {
  display: flex;
  justify-content: center;
  align-items: center;

  @include devices(lg) {
    flex-direction: column;
  }
}

img {
  flex: 2;
  max-width: 500px;

  @include devices(xl) {
    width: 600px;
  }

  @include devices(lg) {
    display: none;
  }
}
</style>
