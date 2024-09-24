<template>
  <p class="signature">
    Designed and developed by
    <NuxtLink to="https://www.linkedin.com/in/efe-erdem7" target="_blank">
      Efe Erdem
    </NuxtLink>
  </p>
</template>

<style lang="scss" scoped>
.signature {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%, 0);
  font-weight: 600;
  color: $secondary;

  a {
    color: $primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
