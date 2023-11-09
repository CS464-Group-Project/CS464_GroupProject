import React, { useState, useEffect } from 'react';
import thesportsdb from 'thesportsdb';

const Api = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await thesportsdb.getLeagueList();
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>API data</h1>
            <ul>
                {data.map((league) => (
                    <li key={league.idLeague}>{league.strLeague}</li>
                ))}
            </ul>
        </div>
    );
};

export default Api;
