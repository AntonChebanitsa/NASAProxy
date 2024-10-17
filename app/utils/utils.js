const { DateTime } = require('luxon');

function getWeekDates() {
    const today = DateTime.now();
    const startOfWeek = today.startOf('week');
    const endOfWeek = startOfWeek.plus({ days: 4 });

    const startDate = startOfWeek.toFormat('yyyy-MM-dd');
    const endDate = endOfWeek.toFormat('yyyy-MM-dd');

    return { startDate, endDate };
}

function calculateDateRange(start_date, end_date) {
    const startDate = start_date || (end_date ? new Date(new Date(end_date).setDate(new Date(end_date).getDate() - 7)).toISOString().split('T') : getWeekDates().startDate);
    const endDate = end_date || (start_date ? new Date(new Date(start_date).setDate(new Date(start_date).getDate() + 7)).toISOString().split('T') : getWeekDates().endDate);

    return { startDate, endDate };
}

function formatAsteroidData(data) {
    return data.map(asteroid => {
        const closeApproachData = asteroid.close_approach_data[0];

        return {
            id: asteroid.id,
            name: asteroid.name || 'N/A',
            diameter_meters: asteroid.estimated_diameter.meters.estimated_diameter_max || 'N/A',
            is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
            close_approach_date_full: closeApproachData.close_approach_date_full || 'N/A',
            relative_velocity_kps: closeApproachData.relative_velocity.kilometers_per_second || 'N/A'
        };
    });
}

module.exports = { calculateDateRange, formatAsteroidData };
