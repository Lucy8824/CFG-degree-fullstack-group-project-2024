const API_KEY = 'qUN6pibGdfKllve7uHg5594VCNYL2iCT';

export const fetchFestivals = async () => {
    let festivals = [];
    let page = 0;
    let totalPages = 1;
    
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Festival&size=200&page=${page}&apikey=${API_KEY}`);
        const data = await response.json();
        return data._embedded.events;
    } catch (error) {
        console.error("Error fetching festivals: ", error);
        return[];
    }
};