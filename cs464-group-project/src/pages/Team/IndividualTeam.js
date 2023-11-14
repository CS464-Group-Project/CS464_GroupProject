import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../style/Team.css';
import { getAllPlayersByTeam } from '../../components/Api/ApiRequest';

export function IndividualTeam() {
    const location = useLocation();
    const [players, setPlayers] = useState([]);
    const [team, setTeam] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { team } = location.state;
                setTeam(team);
                console.log('Team: ' + team);

                const playerInfo = await getAllPlayersByTeam(team.strTeam);
                setPlayers(playerInfo.player);
                console.log('Players: ', playerInfo);
            } catch (err) {
                console.error('Error getting player information', err);
            }
        };
        fetchData();
    }, [location.state]);

    return (
        <>
            <h1>Welcome to {team.strAlternate} Page</h1>
            <div className=' flex container-md'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <img
                            className='team-logo image-fluid'
                            src={team.strTeamBadge}
                            alt={`${team.strTeam} badge logo`}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </div>
                    <div className='col'>
                        <h2>{team.strTeam}</h2>
                        <p>Country: {team.strCountry}</p>
                        <p>Formed Year: {team.intFormedYear}</p>
                        <p>Stadium: {team.strStadiumLocation}</p>
                        <p>Stadium Capacity: {team.intStadiumCapacity}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>Chart</div>
                    <div className='col-sm-4'>
                        <ul>
                            {players.map((player) => (
                                <li
                                    key={player.id}
                                    style={{ listStyleType: 'none' }}
                                >
                                    <p className='player-info'>
                                        <span>{player.strPlayer}</span>
                                        <span>{player.strPosition}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
