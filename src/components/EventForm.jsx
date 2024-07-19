import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
} from '@mui/material';
import { addEvent } from '../redux/eventsSlice';

const EventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    id: uuidv4(),
    eventName: '',
    eventType: '',
    startDate: null,
    endDate: null,
    description: '',
    handledBy: '',
    organisation: '',
    totalSubEvents: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEvent(eventData));
    setEventData({
      ...eventData,
      id: uuidv4(),
      eventName: '',
      eventType: '',
      startDate: null,
      endDate: null,
      description: '',
      handledBy: '',
      organisation: '',
      totalSubEvents: 0,
    });
    navigate('/events')
  };

  const handleCancel = () => {
    setEventData({
      ...eventData,
      id: uuidv4(),
      eventName: '',
      eventType: '',
      startDate: null,
      endDate: null,
      description: '',
      handledBy: '',
      organisation: '',
      totalSubEvents: 0,
    });
  };

  return (
    <Container>
      <Typography style={{display:"flex",justifyContent:"center",alignItems:"center" , marginBottom:"2rem"}} color="tomato" variant="h4" gutterBottom>
        ADD EVENT
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Name"
              name="eventName"
              value={eventData.eventName || ''}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={eventData.eventType}
                onChange={handleChange}
                name="eventType"
                required
              >
                <MenuItem value="sports">Sports</MenuItem>
                <MenuItem value="music">Music</MenuItem>
                <MenuItem value="general">General</MenuItem>
                <MenuItem value="children">Children</MenuItem>
                <MenuItem value="school">School</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Event Start Date"
              name="startDate"
              value={eventData.startDate || ''}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Event End Date"
              name="endDate"
              value={eventData.endDate || ''}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Event Description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Handled By"
              name="handledBy"
              value={eventData.handledBy}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Organisation"
              name="organisation"
              value={eventData.organisation}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Total Number of Sub-events"
              name="totalSubEvents"
              value={eventData.totalSubEvents}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item  style={{display:'flex',justifyContent:"center",alignItems:"center"}} xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Event
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EventForm;
