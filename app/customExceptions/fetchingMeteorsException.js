class fetchingMeteorsException extends Error {
    constructor() {
        super('Error fetching meteors data from NASA API');
        this.statusCode = 500;
    }
}

module.exports = fetchingMeteorsException;