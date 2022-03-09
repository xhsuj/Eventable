import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveAppBar from './newnavbar';
import BasicCard from './card';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import './CreateEventForm.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate as useHistory } from 'react-router-dom';
const drawerWidth = 240;



function EditEventForm(props) {
  let history = useHistory();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />

      <Divider />

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const signal = 1;

  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    
    const creator_id = localStorage.getItem('user_id');
    const newevent = new FormData(event.currentTarget);
    const myobj1 = {
      creator_id: creator_id,
      original_event_name: newevent.get('original_event_name'),
    };

    axios
      .get("http://localhost:5000/events/edit", {
        params: myobj1
      })
      .then((res) => {
        console.log(res.data);
        var event = res.data;
        localStorage.setItem('edit_event', event);
      });

    console.log(localStorage.getItem('edit_event'));
    const event_id = localStorage.getItem('edit_event')._id;
    const myobj2 = {
      event_id: event_id,
      new_event_name: newevent.get('new_event_name'),
      new_date: newevent.get('new_date'),
      new_address: newevent.get('new_address'),
      new_status: false,
      new_planned_start_time: newevent.get('new_planned_start_time'),
      new_planned_end_time: newevent.get('new_planned_end_time'),
      new_description: newevent.get('new_description'),
    };  
    
    axios
      .post(
        "http://localhost:5000/events/update/:id", {
        params: myobj2
      })
      .then((res) => console.log(res.data));
      history(
        '../myEvent',
     );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <ResponsiveAppBar />
        <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 4, width: '45ch' },
        }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        >
          <div>
            <TextField id='name' name="original_event_name" label="Original_Event_Name*" variant="filled" />
            <TextField id='name' name="new_event_name" label="New_Event_Name*" variant="filled" />
          </div>
          <div>
            <TextField id="address" name="new_address" label="New_Address*" variant="filled" />
          </div>
          <div>
            <TextField id="date" name="new_date" label="New_Planned_Date*" placeholder="Enter in the form of yyyy-mm-dd" variant="filled" />
          </div>
          <div>
            <TextField id="starttime" name="new_planned_start_time" label="New_Planned_Start_Time*" placeholder="Enter in the form of hh:mm" variant="filled" />
            <TextField id="endtime" name="new_planned_end_time" label="New_Planned_End_Time*" placeholder="Enter in the form of hh:mm" variant="filled" />
          </div>
          <div>
            <TextField
            id="description"
            name="new_description"
            label="New_Description"
            rows={5}
            multiline
            variant="filled"
            />
          </div>
          <div>
            <Button className='formbutton' type="submit" variant="contained">update</Button>
          </div>
        </Box>
      </Grid>
    </Box>
  );
}

EditEventForm.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default EditEventForm;