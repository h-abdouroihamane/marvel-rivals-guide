<!--
  Aesthetic: tactical-comic / chevron HUD.
  Role glyphs traced (potrace) from the user-supplied 48x48 PNGs:
    - duelist:    single clenched fist
    - vanguard:   two fists with crossed forearms (defensive guard)
    - strategist: hand making a peace / V sign (healer)
  All three share a 48x48 viewBox and the same potrace y-flip
  transform; fill="currentColor" lets the role color flow through.
-->
<script setup lang="ts">
import { computed } from 'vue';
import type { Role } from '../types/hero';

const props = defineProps<{
  role: Role;
  size?: number;
}>();

const DUELIST_PATHS = [
  'M232 401 c-20 -28 -20 -28 -1 -45 19 -16 21 -16 39 6 24 29 25 40 1 55 -15 10 -21 7 -39 -16z',
  'M280 355 c-23 -24 -23 -26 -6 -43 16 -16 19 -16 41 13 18 21 21 32 13 42 -15 18 -21 17 -48 -12z',
  'M162 343 c-48 -17 -46 -8 -21 -125 9 -39 15 -48 32 -49 53 -1 60 -13 25 -38 -18 -13 -27 -18 -20 -10 18 20 15 27 -15 31 -20 2 -29 9 -31 26 -7 49 -62 6 -62 -49 l0 -39 103 1 c108 0 129 10 153 72 6 16 -61 45 -74 33 -5 -6 -62 76 -62 90 0 4 11 -1 25 -10 28 -18 35 -19 54 -7 13 8 -42 92 -59 90 -3 0 -24 -7 -48 -16z',
  'M301 291 c-38 -45 -39 -49 -23 -63 9 -9 23 -13 31 -10 8 2 11 0 8 -6 -4 -5 0 -15 7 -21 17 -14 97 64 89 86 -6 16 -25 17 -43 1 -8 -7 -6 -2 5 10 19 23 19 24 0 38 -27 20 -29 19 -74 -35z',
];

const VANGUARD_PATHS = [
  'M111 383 c-6 -10 -11 -14 -11 -9 0 14 -37 -28 -43 -50 -8 -24 16 -53 70 -87 l41 -26 27 29 c17 17 23 30 16 34 -6 4 -11 20 -11 35 0 36 -25 59 -48 44 -23 -14 -30 -48 -8 -40 10 4 16 1 16 -9 0 -8 -12 -19 -26 -25 -31 -11 -47 -2 -21 13 14 8 16 13 6 24 -9 11 -8 18 5 32 9 10 16 24 16 30 0 20 -19 23 -29 5z',
  'M335 387 c-5 -11 -1 -25 10 -37 14 -16 15 -22 5 -35 -10 -12 -9 -16 4 -21 9 -3 16 -10 16 -16 0 -12 -42 1 -52 16 -12 17 -9 26 6 20 23 -9 27 12 5 32 -28 25 -52 8 -60 -41 -3 -20 -10 -40 -15 -44 -40 -27 -204 -154 -204 -157 0 -2 38 -4 85 -4 l84 0 52 65 c29 36 61 67 71 70 34 12 79 66 72 88 -7 22 -44 66 -44 52 0 -5 -6 0 -14 11 -14 18 -15 18 -21 1z',
  'M285 149 c-33 -51 -34 -50 61 -47 l78 3 -56 42 -56 42 -27 -40z',
];

const STRATEGIST_PATHS = [
  'M290 360 c-23 -12 -55 -19 -93 -20 -53 0 -157 -37 -157 -56 0 -25 67 -95 85 -89 11 4 29 9 40 11 11 3 76 -18 144 -46 68 -28 126 -48 129 -45 11 11 -34 46 -90 72 -75 33 -107 93 -60 110 9 4 32 18 50 32 32 23 33 26 16 38 -22 16 -22 16 -64 -7z',
  'M287 249 c3 -12 29 -32 64 -50 69 -34 78 -36 54 -9 -10 11 -14 20 -9 20 9 1 -96 59 -108 60 -3 0 -4 -9 -1 -21z',
];

const paths = computed(() => {
  switch (props.role) {
    case 'duelist':
      return DUELIST_PATHS;
    case 'vanguard':
      return VANGUARD_PATHS;
    case 'strategist':
      return STRATEGIST_PATHS;
    default:
      return [];
  }
});
</script>

<template>
  <svg
    :width="size ?? 18"
    :height="size ?? 18"
    viewBox="0 0 48 48"
    fill="currentColor"
    aria-hidden="true"
    class="shrink-0"
  >
    <g
      v-if="paths.length"
      transform="translate(0,48) scale(0.1,-0.1)"
    >
      <path v-for="d in paths" :key="d" :d="d" />
    </g>
    <!-- Flex (Deadpool): three-dot triad, drawn in normal coords -->
    <template v-else>
      <circle cx="24" cy="12" r="5" />
      <circle cx="12" cy="34" r="5" />
      <circle cx="36" cy="34" r="5" />
    </template>
  </svg>
</template>
