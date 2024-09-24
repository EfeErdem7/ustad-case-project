<template>
  <v-app>
    <AppHeader title="Cat Generator" />
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <AppSignature />
  </v-app>
</template>
