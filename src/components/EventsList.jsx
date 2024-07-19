import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  Grid,
  TextField,
  TableSortLabel
} from '@mui/material';

const EventsList = () => {
  const events = useSelector((state) => state.events);

  // State for filtering
  const [filterTerm, setFilterTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  // State for sorting
  const [sortBy, setSortBy] = useState('eventName'); // Default sorting by eventName
  const [sortDirection, setSortDirection] = useState('asc'); // Default ascending order

  // Function to handle filtering
  const filterHandler = (e) => {
    const searchTerm = e.target.value;
    setFilterTerm(searchTerm);

    const filtered = events.filter(event =>
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
    sortEvents(sortBy);  
  };

  // Function to handle sorting
  const sortEvents = (property) => {
    const isAscending = sortBy === property && sortDirection === 'asc';
    const sorted = [...filteredEvents].sort((a, b) => {
      if (property === 'startDate' || property === 'endDate') {
        
        const dateA = new Date(a[property]);
        const dateB = new Date(b[property]);
        return isAscending ? dateA - dateB : dateB - dateA;
      } else {
         
        if (a[property] < b[property]) return isAscending ? -1 : 1;
        if (a[property] > b[property]) return isAscending ? 1 : -1;
        return 0;
      }
    });

    setFilteredEvents(sorted);
    setSortBy(property);
    setSortDirection(isAscending ? 'desc' : 'asc');
  };

  return (
    <Container>
      <Typography style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"2rem",marginTop:"2rem"}} variant="h4" gutterBottom>
        EVENTS LISTS
      </Typography>
      <Grid container spacing={2}>
        <Grid style={{ marginBottom: '3rem' }} item xs={12} sm={12}>
          <TextField
            fullWidth
            label="Search Event"
            name="search"
            value={filterTerm}
            onChange={(e) => filterHandler(e)}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'eventName'}
                  direction={sortDirection}
                  onClick={() => sortEvents('eventName')}
                >
                  Event Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'eventType'}
                  direction={sortDirection}
                  onClick={() => sortEvents('eventType')}
                >
                  Event Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'startDate'}
                  direction={sortDirection}
                  onClick={() => sortEvents('startDate')}
                >
                  Start Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'endDate'}
                  direction={sortDirection}
                  onClick={() => sortEvents('endDate')}
                >
                  End Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.eventType}</TableCell>
                <TableCell>{event.startDate}</TableCell>
                <TableCell>{event.endDate}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/edit-event/${event.id}`}
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EventsList;
