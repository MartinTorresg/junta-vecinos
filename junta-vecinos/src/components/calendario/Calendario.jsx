import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { v4 as uuid} from 'uuid';

const Calendario = () => {
  const [date, setDate] = useState(new Date());
  const [activities, setActivities] = useState([]);

  const addActivity = () => {
    const newActivity = {
      id: uuid.v4(),
      date: date,
      description: prompt('Ingrese una actividad:'),
    };

    setActivities([...activities, newActivity]);
    // Guardar actividades en localStorage
    localStorage.setItem('activities', JSON.stringify([...activities, newActivity]));
  };

  return (
    <div>
      <Calendar onChange={setDate} value={date} />
      <button onClick={addActivity}>Agregar actividad</button>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            {activity.date.toLocaleDateString()} - {activity.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendario;