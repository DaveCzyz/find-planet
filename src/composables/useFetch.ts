import { ref } from 'vue';
import axios from 'axios';
import {
  FetchPlanets,
  Planet,
} from '../types/types';

export function useFetch(): FetchPlanets {
  const planets = ref<Planet[]>([]);

  const next = ref<string | null>(null);
  const prev = ref<string | null>(null);

  const errors = ref<string>("");

  const fetchPlanets = async (search: string, page: number) => {
    try {
      await axios.get(`https://swapi.dev/api/planets/?search=${search}&page=${page}`).then((response) => {
        planets.value = response.data.results;
        next.value = response.data.next;
        prev.value = response.data.previous;
      });

      errors.value = planets.value.length === 0
        ? "No results. Try another one."
        : '';

    } catch (error) {
      planets.value = [];
      next.value = null;
      prev.value = null;
      errors.value = 'Oops, something went wrong. Please try again later.';
    }
  };

  return {
    planets,
    next,
    prev,
    errors,
    fetchPlanets,
  };
}
