<!--
  Aesthetic: tactical-comic / chevron HUD.
  Top nav mirroring the in-game shell: HOME / PLAY / SEASON /
  HEROES / STORE / TOURNAMENT / GALLERY in heavy condensed caps,
  signal-yellow underline on the active item, theme toggle on the
  far right.
-->
<script setup lang="ts">
import { useAppearance } from '../composables/useAppearance';

const { appearance, toggle } = useAppearance();

const items = [
  { key: 'home', label: 'Home' },
  { key: 'play', label: 'Play' },
  { key: 'season', label: 'Season' },
  { key: 'heroes', label: 'Heroes' },
  { key: 'store', label: 'Store' },
  { key: 'tournament', label: 'Tournament' },
  { key: 'gallery', label: 'Gallery' },
] as const;

const active = 'heroes';
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
        class="mr-6 font-display text-2xl font-black uppercase
               tracking-tight text-[color:var(--color-accent)]"
      >
        Rivals
      </span>
      <a
        v-for="item in items"
        :key="item.key"
        href="#"
        :aria-current="item.key === active ? 'page' : undefined"
        class="relative px-4 py-2 font-display text-sm font-bold
               uppercase tracking-widest transition
               hover:text-[color:var(--color-accent)]
               focus:outline-none focus-visible:ring-2
               focus-visible:ring-[color:var(--color-accent)]"
        :class="
          item.key === active
            ? 'text-[color:var(--color-accent)]'
            : 'text-[color:var(--color-text-on-dark-muted)]'
        "
      >
        {{ item.label }}
        <span
          v-if="item.key === active"
          aria-hidden="true"
          class="absolute inset-x-3 -bottom-px h-0.5
                 bg-[color:var(--color-accent)]"
        />
      </a>
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
