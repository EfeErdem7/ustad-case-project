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
  bottom: 16px;
  left: 50%;
  transform: translate(-50%, 0);
  font-weight: 600;
  padding: 8px 12px;
  background: $bg-color;
  border-radius: 80px;
  color: $secondary;
  white-space: nowrap;

  a {
    color: $primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
