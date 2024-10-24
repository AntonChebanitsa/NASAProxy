import { DateTime } from 'luxon';
import { Asteroid } from '../services/types';

function getWeekDates(): { startDate: string; endDate: string }{
  const today = DateTime.now();
  const startOfWeek = today.startOf('week');
  const endOfWeek = startOfWeek.plus({ days: 4 });

  const startDate = startOfWeek.toFormat('yyyy-MM-dd');
  const endDate = endOfWeek.toFormat('yyyy-MM-dd');

  return { startDate, endDate };
}

function calculateDateRange(date?: DateTime | DateTime[]): { startDate: string; endDate: string } {
  const weekDates = getWeekDates();
  let startDate: DateTime;
  let endDate: DateTime;

  if (Array.isArray(date)) {
    startDate = date[0] ? (DateTime.isDateTime(date[0]) ? date[0] : DateTime.fromJSDate(new Date(date[0]))) : DateTime.now();
    endDate = date[1] ? (DateTime.isDateTime(date[1]) ? date[1] : DateTime.fromJSDate(new Date(date[1]))) : startDate;
  } else {
    startDate = date ? (DateTime.isDateTime(date) ? date : DateTime.fromJSDate(new Date(date))) : DateTime.now();
    endDate = startDate;
  }

  console.log({ startDate }, { endDate });

  return {
    startDate: startDate.toFormat('yyyy-MM-dd') || weekDates.startDate,
    endDate: endDate.toFormat('yyyy-MM-dd') || startDate.toFormat('yyyy-MM-dd') || weekDates.endDate,
  };
}

function formatAsteroidData(data: Asteroid[]): Array<{
  id: string;
  name: string;
  diameter_meters: number | string;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_date_full: string;
  relative_velocity_kps: string;
}>{
  return data.map(asteroid => {
    const closeApproachData = asteroid.close_approach_data[0];

    return {
      id: asteroid.id,
      name: asteroid.name || 'N/A',
      diameter_meters: asteroid.estimated_diameter.meters.estimated_diameter_max || 'N/A',
      is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
      close_approach_date_full: closeApproachData.close_approach_date_full || 'N/A',
      relative_velocity_kps: closeApproachData.relative_velocity.kilometers_per_second || 'N/A',
    };
  });
}

export { calculateDateRange, formatAsteroidData };
