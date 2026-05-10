<!--
  Aesthetic: tactical-comic / chevron HUD.
  - Type pairing: Saira Condensed (display) + Nunito Sans (body).
  - Color: light periwinkle bg with dark navy plate; signal yellow
    (#fcd92d) for active state; role color for the small glyph.
  - Memorable element: diagonal chevron clip on portrait (bottom-right
    corner cut) and on plate (top-left corner cut), echoing the
    in-game card silhouette.
  - Motion: card-rise stagger on grid mount (delay set by parent).
-->
<script setup lang="ts">
import { ref } from 'vue';
import type { Hero } from '../types/hero';
import { ROLE_LABEL } from '../types/hero';
import RoleIcon from './RoleIcon.vue';

const props = defineProps<{
  hero: Hero;
  delayMs?: number;
}>();

const roleColorVar: Record<Hero['role'], string> = {
  vanguard: 'var(--color-vanguard)',
  duelist: 'var(--color-duelist)',
  strategist: 'var(--color-strategist)',
  flex: 'var(--color-accent)',
};

const portraitOk = ref(true);
const initials = props.hero.name
  .split(/\s+/)
  .filter((w) => w !== '&')
  .slice(0, 2)
  .map((w) => w[0])
  .join('');
</script>

<template>
  <a
    :href="`#/heroes/${hero.slug}`"
    class="group card-rise relative block focus:outline-none"
    :style="{ animationDelay: `${delayMs ?? 0}ms` }"
    :aria-label="`${hero.name}, ${ROLE_LABEL[hero.role]}`"
  >
    <!-- Portrait pane -->
    <div
      class="clip-card-portrait relative aspect-[3/4] overflow-hidden
             bg-[color:var(--color-bg-soft)] transition
             group-hover:translate-y-[-2px]
             group-focus-visible:ring-2 group-focus-visible:ring-[color:var(--color-accent)]
             dark:bg-[color:var(--color-surface)]"
    >
      <img
        v-if="portraitOk"
        :src="hero.portraitUrl"
        :alt="hero.name"
        loading="lazy"
        decoding="async"
        @error="portraitOk = false"
        class="absolute inset-0 h-full w-full object-cover object-top
               transition duration-500
               group-hover:scale-[1.04]"
      />
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center
               bg-gradient-to-b
               from-[color:var(--color-bg-soft)]
               to-[color:var(--color-bg)]
               dark:from-[color:var(--color-surface-2)]
               dark:to-[color:var(--color-surface)]"
        aria-hidden="true"
      >
        <span
          class="font-display text-7xl font-black tracking-tight
                 text-[color:var(--color-text-muted)] opacity-40"
        >
          {{ initials }}
        </span>
      </div>

      <!-- Diagonal line texture overlay -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0
               bg-[length:14px_14px] mix-blend-overlay opacity-20"
        style="
          background-image: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4) 0,
            rgba(255, 255, 255, 0.4) 1px,
            transparent 1px,
            transparent 14px
          );
        "
      ></div>

      <!-- Hover yellow chevron sweep -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -right-1 -top-1 h-10 w-10
               -translate-y-2 translate-x-2 opacity-0 transition
               group-hover:translate-y-0 group-hover:translate-x-0
               group-hover:opacity-100"
        style="
          background: var(--color-accent);
          clip-path: polygon(100% 0, 100% 60%, 40% 0);
        "
      ></div>
    </div>

    <!-- Name plate -->
    <div
      class="clip-card-plate relative -mt-3 flex items-center
             justify-between gap-3 bg-[color:var(--color-plate)]
             px-4 py-3 text-[color:var(--color-text-on-dark)]"
    >
      <span
        class="font-display text-sm font-extrabold uppercase
               leading-tight tracking-wide sm:text-base"
      >
        {{ hero.name }}
      </span>
      <span
        :style="{ color: roleColorVar[hero.role] }"
        class="shrink-0"
        :aria-label="ROLE_LABEL[hero.role]"
      >
        <RoleIcon :role="hero.role" :size="18" />
      </span>
    </div>
  </a>
</template>
