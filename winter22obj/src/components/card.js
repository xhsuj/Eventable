import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Popup from './eventCard';
import { useState } from 'react';
import BackdropUnstyled from '@mui/base/BackdropUnstyled';
import Histogram from 'react-chart-histogram';
import { GrFormView } from 'react-icons/gr';
import "./card.css"

export default function BasicCard(props) {
  const item = props.it;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }


  const handleClick = () => {
    setIsOpen2(!isOpen2);
  }

  return <div>
    <button className='eventCardButton' onClick={togglePopup}><Card style={{display: 'inline-block'}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Time: {it.date}
            </Typography>
            <Typography variant="h5" component="div">
            Event_name: {it.event_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Address: {it.address}
            </Typography>
            <Typography variant="body2">
              Comment
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
    </Card></button>
    {isOpen && 
      <Popup
        content={<>
          <b>Event_Name:</b>
          <p>Planned Time:</p>
          <p>Address:</p>
          <p>Creator:</p>
          <p>Participants:</p>
          <p>Has Passed:</p>
          <p>Comments:</p>
          <button className="timeSlotButton" onClick={handleClick}>Potential Time Slots <GrFormView /> </button>
        </>}
        handleClose={togglePopup}
      />
    }
    {isOpen2 && 
      <Popup
        content={<>
          <div>
            <Histogram
              xLabels={['2016', '2017', '2018']}
              yValues={[324, 45, 672]}
              width='410'
              height='450'
              options={{ fillColor: '#FFFFFF', strokeColor: '#0000FF' }}
            />
          </div>
        </>}
        handleClose={handleClick}
      />
    }
  </div>
}
