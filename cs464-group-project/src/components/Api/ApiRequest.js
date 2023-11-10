import axios from 'axios';

const url =
    'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League';

async function fetchData() {
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from API');
        throw error;
    }
}

export { fetchData };
