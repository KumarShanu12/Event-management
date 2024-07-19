import {React , useState} from 'react';
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
  TextField
} from '@mui/material';

const EventsList = () => {
  const events = useSelector((state) => state.events);



  const [setFilterTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);


  const filterHandler = (e) =>{

    const searchTerm = e.target.value;
    setFilterTerm(searchTerm);

    const filtered = events.filter(event =>
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
     
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Events List
      </Typography>
      <Grid  container spacing={2}>
          <Grid  style={{ marginBottom: '3rem' }} item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Search Event"
              name="search"
            
              onChange={(e)=>filterHandler(e)}
               
            />
          </Grid>
          </Grid>  
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
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
