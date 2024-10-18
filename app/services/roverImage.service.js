const {fetchMostRecentRoverImage} = require("../repositories/roverImage.repository");

async function getMostRecentRoverImage(apiUrl, apiKey) {
    const data = await fetchMostRecentRoverImage(apiUrl, apiKey);

    if (data.latest_photos.length) {
        data.latest_photos.sort((a, b) => new Date(b.earth_date) - new Date(a.earth_date));
        
        return data.latest_photos[0].img_src;
    } else {
        throw new Error('No photos available');
    }
}

module.exports = { getMostRecentRoverImage };