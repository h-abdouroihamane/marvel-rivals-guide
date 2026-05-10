<!--
  Aesthetic: tactical-comic / chevron HUD.
  Hero roster page. Sub-tabs (HEROES / TEAM-UPS), the role filter
  chip on the right, the hero card grid on the left, and a sticky
  abilities panel on the right that mirrors the selected hero.
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { heroes } from '../data/heroes';
import type { Role } from '../types/hero';
import HeroCard from './HeroCard.vue';
import HeroAbilitiesPanel from './HeroAbilitiesPanel.vue';
import RoleFilter from './RoleFilter.vue';

const subtab = ref<'heroes' | 'team-ups'>('heroes');
const roleFilter = ref<Role | 'all'>('all');
const selectedSlug = ref<string | null>(null);

const visible = computed(() => {
  if (roleFilter.value === 'all') return heroes;
  return heroes.filter((h) => h.role === roleFilter.value);
});

const selectedHero = computed(() => {
  if (!selectedSlug.value) return null;
  return heroes.find((h) => h.slug === selectedSlug.value) ?? null;
});

// If the active filter hides the selected hero, clear the panel.
watch(visible, (next) => {
  if (
    selectedSlug.value &&
    !next.some((h) => h.slug === selectedSlug.value)
  ) {
    selectedSlug.value = null;
  }
});

const onSelect = (slug: string) => {
  selectedSlug.value = selectedSlug.value === slug ? null : slug;
};
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

      <!-- Heroes grid + abilities panel -->
      <div
        v-if="subtab === 'heroes'"
        class="flex flex-col gap-6 lg:flex-row"
      >
        <section
          aria-label="Heroes"
          class="grid flex-1 grid-cols-2 gap-4
                 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
        >
          <HeroCard
            v-for="(hero, index) in visible"
            :key="hero.id"
            :hero="hero"
            :selected="hero.slug === selectedSlug"
            :delay-ms="Math.min(index * 30, 600)"
            @select="onSelect"
          />
        </section>

        <div
          class="lg:w-[360px] lg:flex-shrink-0"
          :class="selectedHero ? 'block' : 'hidden lg:block'"
        >
          <HeroAbilitiesPanel :hero="selectedHero" />
        </div>
      </div>

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
