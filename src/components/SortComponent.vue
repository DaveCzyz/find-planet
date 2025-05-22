<template>
  <div class="sort">
    <button
      v-for="{ key, value } in fields"
      :key="key"
      class="sort__button"
      :class="{ 'sort__button--active': activeSort === key }"
      @click="updateSort(key as keyof Field)"
    >
      {{ value }}
      <span
        v-if="direction && activeSort === key"
        class="sort__direction"
      >
        {{ direction === SortOrder.ASCENDING ? '↑' : '↓' }}
      </span>
    </button>
    <button
      v-if="activeSort"
      class="sort__button"
      @click="clearSort"
    >
      x
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Field } from '../types/types';
import { SortOrder } from '../types/types';

interface SortProps {
  direction?: SortOrder | null
}

interface SortEmits {
  (e: 'update:sort', value: keyof Field): void;
  (e: 'update:direction', direction: SortOrder | null): void;
}

defineProps<SortProps>();
const emit = defineEmits<SortEmits>();

const activeSort = ref<string | null>(null);

const fields: Field[] = [
  { key: "name", value: "Name" },
  { key: "climate", value: "Climate" },
  { key: "gravity", value: "Gravity" },
  { key: "population", value: "Population" },
  { key: "rotation_period", value: "Rotation" },
  { key: "created", value: "Created" },
];

const updateSort = (field: keyof Field) => {
  activeSort.value = field;
  emit('update:sort', field);
}

const clearSort = () => {
  activeSort.value = null;
  emit('update:direction', null);
};
</script>
