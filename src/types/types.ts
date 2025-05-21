import { Ref } from 'vue';

export enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}

export interface Field {
  key: string;
  value: string;
}

export interface Planet {
  name: string;
  climate: string;
  gravity: string;
  population: string;
  rotation_period: string;
  created: string;
  url: string;
}

export interface FetchPlanets {
  planets: Ref<Planet[]>;
  next: Ref<string | null>;
  prev: Ref<string | null>;
  errors: Ref<string>;
  fetchPlanets: (search: string, page: number) => Promise<void>;
}
