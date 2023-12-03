import React, { useState, useEffect } from 'react';
import { getNextLiveEvents } from '../../components/Api/ApiRequest';
import '../../style/Home/HomeComps.css'; // Import your CSS file

function NextLiveEvents() {
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let leagueId = '4328'; // Currently using only the Premier League

    const fetchData = async () => {
      try {
        const data = await getNextLiveEvents(leagueId);
        const nextLiveEvent = data.events[0].strTimestamp;

        if (isMounted) {
          setNextEvent(nextLiveEvent);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error getting next live events');
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  function formatDateTime(string) {
    const options = {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      timeZone: 'America/Los_Angeles',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(string));
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='blink' id='next-live-events'>
      Next Games: {formatDateTime(nextEvent)}
    </div>
  );
}

export default NextLiveEvents;
