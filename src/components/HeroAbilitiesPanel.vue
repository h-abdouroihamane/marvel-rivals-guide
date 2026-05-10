<!--
  Aesthetic: tactical-comic / chevron HUD.
  Sticky right-side dossier panel. Sections mirror the official
  marvelrivals.com hero detail layout (NORMAL ATTACK / ABILITIES /
  TEAM-UP ABILITIES). Body copy is placeholder until the data
  layer is wired.
-->
<script setup lang="ts">
import type { Hero } from '../types/hero';
import { ROLE_LABEL } from '../types/hero';
import RoleIcon from './RoleIcon.vue';

defineProps<{
  hero: Hero | null;
}>();

const roleColorVar: Record<Hero['role'], string> = {
  vanguard: 'var(--color-vanguard)',
  duelist: 'var(--color-duelist)',
  strategist: 'var(--color-strategist)',
  flex: 'var(--color-accent)',
};

const placeholderText =
  'Placeholder description. Replace with real ability copy once ' +
  'the data layer is wired.';

const slots = [
  { key: 'LMB', label: 'Normal Attack' },
  { key: 'RMB', label: 'Ability' },
  { key: 'Q', label: 'Ability' },
  { key: 'E', label: 'Movement' },
  { key: 'X', label: 'Ultimate' },
  { key: 'Passive', label: 'Passive' },
] as const;

const teamUps = [
  { name: 'Placeholder Team-Up', anchor: 'Anchor Hero' },
  { name: 'Second Synergy', anchor: 'Other Hero' },
];
</script>

<template>
  <aside
    aria-label="Hero abilities"
    class="bg-[color:var(--color-plate)]
           text-[color:var(--color-text-on-dark)]
           sticky top-20 self-start
           max-h-[calc(100vh-6rem)] w-full overflow-y-auto"
    :style="{
      clipPath:
        'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)',
    }"
  >
    <!-- Empty state -->
    <div
      v-if="!hero"
      class="flex h-[60vh] flex-col items-center justify-center
             gap-3 px-6 text-center"
    >
      <span
        class="font-display text-2xl font-black uppercase
               tracking-wide
               text-[color:var(--color-text-on-dark-muted)]"
      >
        Select a hero
      </span>
      <span
        class="text-sm
               text-[color:var(--color-text-on-dark-muted)]"
      >
        Click any card to view its abilities.
      </span>
    </div>

    <!-- Hero header + abilities -->
    <div v-else class="flex flex-col">
      <header
        class="border-b border-white/5 px-6 py-5"
        :style="{
          borderLeft: `4px solid ${roleColorVar[hero.role]}`,
        }"
      >
        <div
          class="flex items-center gap-2 text-xs font-bold
                 uppercase tracking-widest"
          :style="{ color: roleColorVar[hero.role] }"
        >
          <RoleIcon :role="hero.role" :size="14" />
          {{ ROLE_LABEL[hero.role] }}
        </div>
        <h2
          class="font-display mt-2 text-3xl font-black uppercase
                 leading-tight tracking-wide"
        >
          {{ hero.name }}
        </h2>
      </header>

      <section class="px-6 py-5">
        <h3
          class="font-display text-xs font-bold uppercase
                 tracking-widest
                 text-[color:var(--color-accent)]"
        >
          Abilities
        </h3>
        <ul class="mt-3 flex flex-col gap-3">
          <li
            v-for="slot in slots"
            :key="slot.key"
            class="flex gap-3 border-l-2 border-white/10 pl-3"
          >
            <span
              class="font-display flex h-7 min-w-[2.25rem]
                     items-center justify-center px-1.5 text-xs
                     font-extrabold uppercase tracking-wider
                     text-[color:var(--color-plate)]
                     bg-[color:var(--color-accent)]"
            >
              {{ slot.key }}
            </span>
            <div class="flex-1">
              <div
                class="font-display text-sm font-bold uppercase
                       tracking-wide"
              >
                {{ slot.label }}
              </div>
              <p
                class="mt-0.5 text-xs leading-relaxed
                       text-[color:var(--color-text-on-dark-muted)]"
              >
                {{ placeholderText }}
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section class="border-t border-white/5 px-6 py-5">
        <h3
          class="font-display text-xs font-bold uppercase
                 tracking-widest
                 text-[color:var(--color-accent)]"
        >
          Team-Up Abilities
        </h3>
        <ul class="mt-3 flex flex-col gap-3">
          <li
            v-for="teamUp in teamUps"
            :key="teamUp.name"
            class="flex flex-col gap-1 border-l-2 border-white/10
                   pl-3"
          >
            <div
              class="font-display text-sm font-bold uppercase
                     tracking-wide"
            >
              {{ teamUp.name }}
            </div>
            <div
              class="text-xs
                     text-[color:var(--color-text-on-dark-muted)]"
            >
              with
              <span
                class="font-display font-bold uppercase
                       tracking-wide
                       text-[color:var(--color-text-on-dark)]"
              >
                {{ teamUp.anchor }}
              </span>
            </div>
            <p
              class="text-xs leading-relaxed
                     text-[color:var(--color-text-on-dark-muted)]"
            >
              {{ placeholderText }}
            </p>
          </li>
        </ul>
      </section>
    </div>
  </aside>
</template>
