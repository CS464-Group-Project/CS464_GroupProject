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
        console.log('data received: ', data);

        // Sort the events.  The returned array has the time for each day is in descending order
        const sortedEvents = data.events.sort((a, b) => {
          const dateA = new Date(a.strTimestamp);
          const dateB = new Date(b.strTimestamp);
          return dateA - dateB;
        });

        // Find the next upcoming event
        const currentDate = new Date();
        const nextLiveEvent = sortedEvents.find((event) => {
          const eventDate = new Date(event.strTimestamp);
          return eventDate > currentDate;
        });

        if (nextLiveEvent) {
          if (isMounted) {
            setNextEvent(nextLiveEvent.strTimestamp);
            setLoading(false);
          }
        } else {
          // No upcoming events
          if (isMounted) {
            setNextEvent(null);
            setLoading(false);
          }
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

  function formatDateTime(date) {
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
    console.log('returned date format: ', date);
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!nextEvent) {
    return <p>No Upcoming Events</p>;
  }

  return (
    <div className='blink' id='next-live-events'>
      Next Games: {formatDateTime(nextEvent)}
    </div>
  );
}

export default NextLiveEvents;
