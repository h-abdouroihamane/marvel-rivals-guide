<!--
  Aesthetic: tactical-comic / chevron HUD.
  Root layout: dark nav bar on top, light periwinkle main area with
  chevron-line texture, role-filtered hero grid below.
-->
<script setup lang="ts">
import AppNav from './components/AppNav.vue';
import HeroesView from './components/HeroesView.vue';
</script>

<template>
  <AppNav />
  <HeroesView />
</template>
