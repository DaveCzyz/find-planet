<template>
  <div class="planet-table">
    <SearchInput
      :search="search"
      @update:search="handleSearch"
    />
    <SortList @update:sort="sortBy"/>

    <template v-if="!errors">
      <Loading v-if="isLoading" />
      <div class="planet-table__rows">
        <PlanetCard
          v-for="planet in getSortedPlanets"
          :key="planet.url"
          :planet="planet"
        />
      </div>
    </template>
    <ErrorDisplay v-else :message="errors" />

    <Pagination
      v-if="!isLoading && !errors"
      :hasPrev="!!prev"
      :hasNext="!!next"
      @change-page="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { SortOrder } from '../types/types';
import type { Planet, Field } from '../types/types';

import SearchInput from './SearchInput.vue';
import SortList from './SortComponent.vue';
import ErrorDisplay from './ErrorComponent.vue';
import PlanetCard from './PlanetCard.vue';
import Pagination from './PaginationComponent.vue';
import Loading from './LoadingComponent.vue';

import { useFetch } from '../composables/useFetch';

const {
  planets,
  next,
  prev,
  errors,
  fetchPlanets,
} = useFetch();

const search = ref<string>("");
const currentPage = ref<number>(1);
const sortKey = ref<keyof Field | null>(null);
const sortOrder = ref<SortOrder>(SortOrder.Ascending);

const handleSearch = (searchValue: string) => {
  search.value = searchValue;
  currentPage.value = 1;
  fetchPlanets(search.value, currentPage.value);
};

const sortBy = (key: keyof Field) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === SortOrder.Ascending
      ? SortOrder.Descending
      : SortOrder.Ascending;
  } else {
    sortKey.value = key;
    sortOrder.value = SortOrder.Ascending;
  }
};

const getSortedPlanets = computed(() => {
  const key = sortKey.value as keyof Planet;
  const direction = sortOrder.value === SortOrder.Ascending ? 1 : -1;

  return planets.value.slice().sort((a, b) => {
    const valA = String(a[key]);
    const valB = String(b[key]);
    return valA.localeCompare(valB) * direction;
  });
});

const isLoading = computed(() =>  getSortedPlanets.value.length === 0);

const changePage = (dir: number) => {
  if (dir === 1 && next.value) {
    currentPage.value++;
    fetchPlanets(search.value, currentPage.value);
  } else if (dir === -1 && prev.value) {
    currentPage.value--;
    fetchPlanets(search.value, currentPage.value);
  }
};

onMounted( () => {
  fetchPlanets(search.value, currentPage.value);
});
</script>
