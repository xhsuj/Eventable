import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
 
export default function CreateCard(props) {
 const [form, setForm] = useState({
    year: "",
    month: "",
    day: "",
    start_hr: 0, // 0-23
    start_min_index: 0, // 0 (00) or 1 (30)
    end_hr: 0,
    end_min_index: 0,
    coefficient: 0
 });
 const curPage = props.curPage

 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 const onSubmit = async (e) => {
   e.preventDefault();
  
   // When a post request is sent to the create url, we'll add a new time slot to the database.
   //const newTimeSlot = { ...form };
   const user_id = localStorage.getItem("user_id");
   const newTimeSlot = {
     year: form.year,
     month: form.month,
     day: form.day,
     start_index: form.start_hr*2+form.start_min_index,
     end_index: form.end_hr*2+form.end_min_index,
     coefficient: form.coefficient,
     user_id: user_id, // add to the slots owned by this user
   };
 console.log(newTimeSlot);
 // POST request automatically create an id
   await fetch("http://localhost:5000/time_slots/add", {
     method: "POST",
     headers: { "Content-Type": "application/json"},
     body: JSON.stringify(newTimeSlot),
   }).then(() => {
     console.log("new slot added");
     localStorage.setItem("time_slots", JSON.stringify(newTimeSlot));
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ year: "", month: "", day: "", 
            start_hr: 0, start_min_index: 0, 
            end_hr: 0, end_min_index: 0, coefficient: 0.0 });
   navigate(
     "/slothome",
    {state: curPage}
   ); // redirect to the next page
   window.location.reload(false);
 }
 
 // This following section will display the form that takes the input from the user.
 return (
    <Card style={{display: 'inline-block', height: '30vw', width: '15.5vw'}}>
    <CardContent>
      <TextField
          size="small"
          InputLabelProps={{ shrink: true }}
          id="filled-basic" 
          label="Year"
          value={form.year}
          onChange={(e) => updateForm({ year: e.target.value })}
          required
          variant="outlined"
      />
      <TextField
          size="small"
          InputLabelProps={{ shrink: true }}
          label="Month"
          value={form.month}
          onChange={(e) => updateForm({ month: e.target.value })}
          required
          variant="outlined"
      />
      <TextField
          size="small"
          InputLabelProps={{ shrink: true }}
          label="Day"
          value={form.day}
          onChange={(e) => updateForm({ day: e.target.value })}
          required
          variant="outlined"
      />
      <TextField
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Start Hour"
          onChange={(e) => updateForm({ start_hr: e.target.value })}
          value={form.start_hr}
          required
          variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Start Minutes
        </InputLabel>
        <Select
          value={form.start_min_index}
          label="Start Minutes"
          onChange={(e) => updateForm({ start_min_index: e.target.value })}
        >
          <MenuItem value={0}>00</MenuItem>
          <MenuItem value={1}>30</MenuItem>
        </Select>
      </FormControl>
      <TextField
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="End Hour"
          onChange={(e) => updateForm({ end_hr: e.target.value })}
          value={form.end_hr}
          required
          variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          End Minutes
        </InputLabel>
        <Select
          value={form.end_min_index}
          label="End Minutes"
          onChange={(e) => updateForm({ end_min_index: e.target.value })}
        >
          <MenuItem value={0}>00</MenuItem>
          <MenuItem value={1}>30</MenuItem>
        </Select>
      </FormControl>
      <TextField
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Coefficient"
          value={form.coefficient}
          onChange={(e) => updateForm({ coefficient: e.target.value })}
          required
          variant="outlined"
      />
    </CardContent>
    <CardActions>
        <Button 
            className='formbutton' variant="contained"
            onClick={onSubmit}
        >
          Create
        </Button>
    </CardActions>
    </Card>
 );
}

