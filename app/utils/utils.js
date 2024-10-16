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
    let startDate, endDate;

    if (start_date && end_date) {
        startDate = start_date;
        endDate = end_date;
    } else if (start_date) {
        startDate = start_date;
        const endDateObj = new Date(start_date);
        endDateObj.setDate(endDateObj.getDate() + 7);
        endDate = endDateObj.toISOString().split('T');
    } else if (end_date) {
        endDate = end_date;
        const startDateObj = new Date(end_date);
        startDateObj.setDate(startDateObj.getDate() - 7);
        startDate = startDateObj.toISOString().split('T');
    } else {
        ({ startDate, endDate } = getWeekDates());
    }

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
