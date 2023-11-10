import React, { useState, useEffect } from 'react';
import { fetchData } from '../components/Api/ApiRequest';

export function Team() {
    const [displayTeams, setDisplayTeams] = useState([]);

    useEffect(() => {
        fetchData()
            .then((data) => {
                setDisplayTeams(data.teams);
            })
            .catch((error) => {
                console.error('Error fetching teams: ', error);
            });
    }, []);

    return (
        <div>
            <h1>Hello Team</h1>;
            <ul>
                {displayTeams.map((team) => (
                    <li key={team.idTeam}>{team.strTeam}</li>
                ))}
            </ul>
        </div>
    );
}
