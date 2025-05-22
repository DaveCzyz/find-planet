import { ref } from 'vue';
import axios from 'axios';
import {
  Errors,
  FetchPlanets,
  Planet,
} from '../shared/shared.ts';

export function useFetch(): FetchPlanets {
  const url = import.meta.env.VITE_API_BASE_URL;

  const planets = ref<Planet[]>([]);

  const next = ref<string | null>(null);
  const prev = ref<string | null>(null);

  const errors = ref<string>("");

  const fetchPlanets = async (search: string, page: number) => {
    try {
      await axios.get(`${url}/planets/?search=${search}&page=${page}`).then((response) => {
        planets.value = response.data.results;
        next.value = response.data.next;
        prev.value = response.data.previous;
      });

      errors.value = planets.value.length === 0
        ? Errors.NO_RESULTS
        : '';

    } catch (error) {
      planets.value = [];
      next.value = null;
      prev.value = null;
      errors.value = Errors.API_FAILED;
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
