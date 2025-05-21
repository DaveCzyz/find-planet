<template>
  <div class="pagination">
    <div class="pagination__wrapper">
      <button
        class="pagination__button"
        :disabled="!hasPrev"
        aria-label="Previous page"
        :aria-disabled="!hasPrev"
        @click="changePage(-1)"
      >
        Previous
      </button>
    </div>
    <div class="pagination__wrapper">
      <button
        class="pagination__button"
        :disabled="!hasNext"
        aria-label="Next page"
        :aria-disabled="!hasNext"
        @click="changePage(1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface PaginationProps {
  hasPrev: boolean;
  hasNext: boolean;
}

interface PaginationEmits {
  (e: 'changePage', value: number): void
}

defineProps<PaginationProps>();
const emit = defineEmits<PaginationEmits>();

const changePage = (dir: number) => emit('changePage', dir);
</script>
