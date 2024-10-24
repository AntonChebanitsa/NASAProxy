interface Asteroid {
  id: string;
  name: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  is_sentry_object: boolean;
  close_approach_data: Array<{
    close_approach_date_full: string;
    relative_velocity: {
      kilometers_per_second: string;
    };
  }>;
}

interface AsteroidData {
  near_earth_objects: Record<string, Asteroid[]>;
}

interface ResponseData {
  data: any[];
  wereDangerousMeteors?: boolean;
  sentryObjectsCount?: number;
}

export { AsteroidData, ResponseData, Asteroid };