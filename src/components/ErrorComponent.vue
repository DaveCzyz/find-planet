<template>
  <div class="errors">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
interface ErrorProps {
  message: string,
}

defineProps<ErrorProps>();
</script>
