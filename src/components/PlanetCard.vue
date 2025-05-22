<template>
  <div class="planet-cell">
    <div class="planet-cell__title">{{ planet.name }}</div>

    <PlanetDetail
      title="Population"
      :value="formatNumber(planet.population)"
    />

    <PlanetDetail
      title="Rotation"
      :value="planet.rotation_period"
    />

    <PlanetDetail
      title="Climate"
      :value="planet.climate"
    />

    <PlanetDetail
      title="Gravity"
      :value="planet.gravity"
    />

    <PlanetDetail
      title="Created"
      :value="new Date(planet.created).toLocaleDateString()"
    />

    <PlanetDetail title="URL">
      <a
        :href="planet.url"
        class="planet-cell__link"
      >
        LINK
      </a>
    </PlanetDetail>
  </div>
</template>

<script lang="ts" setup>
import type { Planet } from '../shared/shared.ts';
import PlanetDetail from './PlanetDetail.vue';
import { formatNumber } from '../helpers/formatNumber';

interface PlanetProps {
  planet: Planet;
}

defineProps<PlanetProps>();
</script>
