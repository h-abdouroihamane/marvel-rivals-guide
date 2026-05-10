import { onMounted, ref, watch } from 'vue';

export type Appearance = 'light' | 'dark';

const STORAGE_KEY = 'mrg-appearance';

const apply = (mode: Appearance) => {
  const root = document.documentElement;
  root.classList.toggle('dark', mode === 'dark');
};

const readStored = (): Appearance | null => {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'light' || v === 'dark' ? v : null;
};

export function useAppearance() {
  const appearance = ref<Appearance>('light');

  onMounted(() => {
    appearance.value = readStored() ?? 'light';
    apply(appearance.value);
  });

  watch(appearance, (next) => {
    localStorage.setItem(STORAGE_KEY, next);
    apply(next);
  });

  const toggle = () => {
    appearance.value = appearance.value === 'light' ? 'dark' : 'light';
  };

  return { appearance, toggle };
}
