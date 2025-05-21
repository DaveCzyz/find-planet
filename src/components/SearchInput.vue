<template>
  <div class="search">
    <input
      v-model="searchQuery"
      class="search__input"
      placeholder="Find planet"
      @input="updateQuery"
    />
    <button
      v-if="searchQuery"
      class="search__clear"
      aria-label="Clear search"
      @click="clearQuery"
    >
      x
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface SearchInputProps {
  search: string,
}

interface SearchInputEmits {
  (e: 'update:search', value: string): void
}

const props = defineProps<SearchInputProps>();
const emit = defineEmits<SearchInputEmits>();

const searchQuery = ref<string>(props.search);

const updateQuery = (evt: Event) => {
  const searchValue = evt.target as HTMLInputElement;
  emit('update:search', searchValue.value);
};

const clearQuery = () => {
  searchQuery.value = '';
  emit('update:search', '');
};
</script>
