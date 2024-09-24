<template>
  <v-app>
    <AppHeader title="Cat Generator" />
    <v-main>
      <v-container class="h-100 d-flex align-center justify-center pb-16">
        <slot />
      </v-container>
    </v-main>
    <AppSignature />
  </v-app>
</template>
