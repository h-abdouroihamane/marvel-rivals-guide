<!--
  Aesthetic: tactical-comic / chevron HUD.
  Hero roster page. Sub-tabs (HEROES / TEAM-UPS), the role filter
  chip on the right, and the hero card grid with staggered entrance.
  Background uses a periwinkle radial gradient + diagonal line
  texture (chevron grid utility in style.css).
-->
<script setup lang="ts">
import { computed, ref } from 'vue';
import { heroes } from '../data/heroes';
import type { Role } from '../types/hero';
import HeroCard from './HeroCard.vue';
import RoleFilter from './RoleFilter.vue';

const subtab = ref<'heroes' | 'team-ups'>('heroes');
const roleFilter = ref<Role | 'all'>('all');

const visible = computed(() => {
  if (roleFilter.value === 'all') return heroes;
  return heroes.filter((h) => h.role === roleFilter.value);
});
</script>

<template>
  <main class="bg-chevron-grid min-h-[calc(100vh-3.5rem)]">
    <div class="mx-auto max-w-[1400px] px-6 py-8">
      <!-- Sub-tab row + filter -->
      <div
        class="flex flex-wrap items-end justify-between gap-4 pb-6"
      >
        <div
          class="flex items-end gap-8"
          role="tablist"
          aria-label="Hero sections"
        >
          <button
            type="button"
            role="tab"
            :aria-selected="subtab === 'heroes'"
            @click="subtab = 'heroes'"
            class="relative pb-2 font-display text-2xl font-black
                   uppercase tracking-wide transition
                   focus:outline-none focus-visible:ring-2
                   focus-visible:ring-[color:var(--color-accent)]"
            :class="
              subtab === 'heroes'
                ? 'text-[color:var(--color-text)] dark:text-[color:var(--color-text-on-dark)]'
                : 'text-[color:var(--color-text-muted)]'
            "
          >
            Heroes
            <span
              v-if="subtab === 'heroes'"
              aria-hidden="true"
              class="absolute inset-x-0 -bottom-px h-1
                     bg-[color:var(--color-accent)]"
            />
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="subtab === 'team-ups'"
            @click="subtab = 'team-ups'"
            class="relative pb-2 font-display text-2xl font-black
                   uppercase tracking-wide transition
                   focus:outline-none focus-visible:ring-2
                   focus-visible:ring-[color:var(--color-accent)]"
            :class="
              subtab === 'team-ups'
                ? 'text-[color:var(--color-text)] dark:text-[color:var(--color-text-on-dark)]'
                : 'text-[color:var(--color-text-muted)]'
            "
          >
            Team-Ups
            <span
              v-if="subtab === 'team-ups'"
              aria-hidden="true"
              class="absolute inset-x-0 -bottom-px h-1
                     bg-[color:var(--color-accent)]"
            />
          </button>
        </div>
        <RoleFilter v-model="roleFilter" />
      </div>

      <!-- Heroes grid -->
      <section
        v-if="subtab === 'heroes'"
        aria-label="Heroes"
        class="grid grid-cols-2 gap-4
               sm:grid-cols-3 md:grid-cols-4
               lg:grid-cols-5 xl:grid-cols-7"
      >
        <HeroCard
          v-for="(hero, index) in visible"
          :key="hero.id"
          :hero="hero"
          :delay-ms="Math.min(index * 30, 600)"
        />
      </section>

      <!-- Team-Ups placeholder -->
      <section
        v-else
        aria-label="Team-Ups"
        class="flex min-h-[40vh] items-center justify-center"
      >
        <p
          class="font-display text-xl font-bold uppercase
                 tracking-widest
                 text-[color:var(--color-text-muted)]"
        >
          Team-Ups coming soon
        </p>
      </section>
    </div>
  </main>
</template>
