<!--
  Aesthetic: tactical-comic / chevron HUD.
  Class filter chip mirroring the in-game "ALL CLASSES" dropdown:
  dark navy chip, condensed all-caps label, grid icon, chevron
  caret. Native <select> wrapped in a styled chassis for keyboard
  accessibility.
-->
<script setup lang="ts">
import type { Role } from '../types/hero';

defineProps<{
  modelValue: Role | 'all';
}>();

defineEmits<{
  'update:modelValue': [value: Role | 'all'];
}>();
</script>

<template>
  <label
    class="relative inline-flex items-center gap-3
           bg-[color:var(--color-plate)]
           text-[color:var(--color-text-on-dark)]
           h-12 min-w-[200px] cursor-pointer pl-3 pr-10
           font-display text-sm font-bold uppercase tracking-wide
           focus-within:ring-2
           focus-within:ring-[color:var(--color-accent)]"
    :style="{
      clipPath:
        'polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
    }"
  >
    <span aria-hidden="true" class="text-[color:var(--color-accent)]">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    </span>
    <span class="sr-only">Filter heroes by class</span>
    <select
      :value="modelValue"
      @change="
        $emit(
          'update:modelValue',
          ($event.target as HTMLSelectElement).value as Role | 'all',
        )
      "
      class="cursor-pointer appearance-none bg-transparent pr-2
             text-inherit outline-none"
    >
      <option value="all">All Classes</option>
      <option value="vanguard">Vanguard</option>
      <option value="duelist">Duelist</option>
      <option value="strategist">Strategist</option>
      <option value="flex">Flex</option>
    </select>
    <span
      aria-hidden="true"
      class="pointer-events-none absolute right-3 top-1/2
             -translate-y-1/2 text-[color:var(--color-accent)]"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  </label>
</template>
