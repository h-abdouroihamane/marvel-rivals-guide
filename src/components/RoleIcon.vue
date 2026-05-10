<!--
  Aesthetic: tactical-comic / chevron HUD.
  Three role icons matching the game's bottom-right card glyph:
    - vanguard:   shield (tank)
    - duelist:    crossed swords (DPS)
    - strategist: cross / plus (support)
  Stroked glyphs in the role accent color.
-->
<script setup lang="ts">
import type { Role } from '../types/hero';

defineProps<{
  role: Role;
  size?: number;
}>();
</script>

<template>
  <svg
    :width="size ?? 18"
    :height="size ?? 18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="shrink-0"
  >
    <template v-if="role === 'vanguard'">
      <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
    </template>
    <template v-else-if="role === 'duelist'">
      <path d="M4 4l8 8M20 4l-8 8M4 20l6-6M20 20l-6-6" />
    </template>
    <template v-else-if="role === 'strategist'">
      <path d="M12 4v16M4 12h16" />
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v8M8 12h8" />
    </template>
  </svg>
</template>
