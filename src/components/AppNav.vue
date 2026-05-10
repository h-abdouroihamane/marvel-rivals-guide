<!--
  Aesthetic: tactical-comic / chevron HUD.
  Top nav: Rivals wordmark on the left, theme toggle on the right.
-->
<script setup lang="ts">
import { useAppearance } from '../composables/useAppearance';

const { appearance, toggle } = useAppearance();
</script>

<template>
  <header
    class="sticky top-0 z-20 border-b
           border-[color:var(--color-line)]
           bg-[color:var(--color-plate)]
           text-[color:var(--color-text-on-dark)]"
  >
    <nav
      class="mx-auto flex h-14 max-w-[1400px] items-center
             gap-1 px-6"
      aria-label="Primary"
    >
      <span
        class="font-display text-2xl font-black uppercase
               tracking-tight text-[color:var(--color-accent)]"
      >
        Rivals
      </span>
      <span class="ml-auto"></span>
      <button
        type="button"
        @click="toggle"
        class="inline-flex h-9 items-center gap-2 px-3
               font-display text-xs font-bold uppercase
               tracking-widest
               text-[color:var(--color-text-on-dark-muted)]
               transition hover:text-[color:var(--color-accent)]
               focus:outline-none focus-visible:ring-2
               focus-visible:ring-[color:var(--color-accent)]"
        :aria-label="
          appearance === 'dark'
            ? 'Switch to light theme'
            : 'Switch to dark theme'
        "
      >
        <svg
          v-if="appearance === 'light'"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4
               1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7
               6.3l1.4-1.4"
          />
        </svg>
        <svg
          v-else
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
        {{ appearance === 'light' ? 'Dark' : 'Light' }}
      </button>
    </nav>
  </header>
</template>
