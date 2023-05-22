import './App.css';
import { Calender } from './Calender/calender';
import { MockEvents } from './Calender/const';
import { useState , useEffect} from 'react';

function App() {
  const [events, setEvents] = useState(() => {
      const storedEvents = localStorage.getItem('events');
      return storedEvents ? JSON.parse(storedEvents) : MockEvents;
  });
  // const [events, setEvents] = useState(MockEvents);
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (date) => {
    const text = window.prompt('Enter event title:');
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    if(text!= null && text != ""){
      setEvents(prev => [...prev,{date: utcDate.toISOString(), title: text}]);
    }
  }
  
  const removeEvent = (date,title) => {
    const confirmed = window.confirm('Are you sure you want to remove this event?');
    if (confirmed) {
      setEvents(prev => prev.filter(event => event.title !== title || event.date !== date));
    }
  };

  return (
    <div className="App">
      <Calender startingDate = { new Date() } eventsArr = {events} addEvent = {addEvent} removeEvent = {removeEvent}/>
    </div>
  );
}

export default App;
