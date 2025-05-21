<template>
  <p class="planet-cell__detail">
    <strong>{{ title }}: </strong>
    <slot>
      {{ value }}
    </slot>
  </p>
</template>

<script setup lang="ts">
interface PlanetDetailProps {
  title: string,
  value?: string,
}

defineProps<PlanetDetailProps>();
</script>
