import React from 'react';
import { useParams } from 'react-router-dom';
import EventForm from '../components/EventForm';

const AddEditEventPage = () => {
  const { eventId } = useParams();

  return (
    <div>
      <EventForm eventId={eventId} />
    </div>
  );
};

export default AddEditEventPage;
