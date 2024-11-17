import React from 'react';
import { List, ListItem, ListItemText, Divider, Button } from '@mui/material';

const DoctorRequestList = ({ doctorRequests }) => {
  const handleApprove = (request) => {
    // Implement approve logic here
    console.log('Approved request:', request);
  };

  const handleDiscard = (request) => {
    // Implement discard logic here
    console.log('Discarded request:', request);
  };

  return (
    <List>
      {doctorRequests.map((request, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText
              primary={`Doctor Request ${index + 1}`}
              secondary={`Name: ${request.name}, Ailment: ${request.ailment}`}
            />
            <div>
              <Button variant="contained" color="primary" onClick={() => handleApprove(request)}>
                Approve
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDiscard(request)}>
                Discard
              </Button>
            </div>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default DoctorRequestList;