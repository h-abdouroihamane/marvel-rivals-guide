<!--
  Aesthetic: tactical-comic / chevron HUD.
  Role glyphs traced from the user-supplied Marvel Rivals icons:
    - duelist:    single clenched fist with motion arrows (image 1)
    - vanguard:   paired chevron-wings forming a shield (image 2)
    - strategist: bold upward chevron (image 3)
  Filled silhouettes via `fill="currentColor"` so the role color
  applied by the parent flows through.
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
    fill="currentColor"
    aria-hidden="true"
    class="shrink-0"
  >
    <template v-if="role === 'duelist'">
      <!-- Fist + 2 motion arrows -->
      <path
        d="M3 11h2v4H3zM5 9h7v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"
      />
      <path d="M14.5 9.5l3.5 2-3.5 2zM14.5 13.5l3.5 2-3.5 2z" />
    </template>
    <template v-else-if="role === 'vanguard'">
      <!-- Two chevron-wings forming a kite shield -->
      <path d="M12 3 4 9l3 11 5-3z" />
      <path d="M12 3l8 6-3 11-5-3z" />
    </template>
    <template v-else-if="role === 'strategist'">
      <!-- Bold upward chevron -->
      <path d="M12 4l9 14h-4l-5-8.5L7 18H3z" />
    </template>
    <template v-else>
      <!-- Flex (Deadpool): three-dot triad -->
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="6" cy="17" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
    </template>
  </svg>
</template>
