import React from "react";
import MainBasicCard from "../../components/card/main-basic-card";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state: any) => state.user.user);

  return (
    <MainBasicCard sx={{ padding: '10px' }} elevation={2}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Typography variant="h5" component="h2" sx={{ margin: '10px' }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ margin: '10px' }}>
            Total Songs: 100
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ margin: '10px' }}>
            Most Favourite Song: "Song Name"
          </Typography>
        </div>
        <div>
        <Typography variant="body2" sx={{ margin: '10px', textAlign: 'right' }}>
            User Details
          </Typography>
          <Typography variant="body2" sx={{ margin: '10px', textAlign: 'right' }}>
            ID: {user.id}
          </Typography>
          <Typography variant="body2" sx={{ margin: '10px', textAlign: 'right' }}>
            Username: {user.userName}
          </Typography>
          <Typography variant="body2" sx={{ margin: '10px', textAlign: 'right' }}>
            Role: {user.role}
          </Typography>
          <Typography variant="body2" sx={{ margin: '10px', textAlign: 'right' }}>
            Email: {user.emailId}
          </Typography>
          <Typography variant="body2" sx={{ margin: '10px', textAlign: 'right' }}>
            Mobile: {user.mobileNumber}
          </Typography>
        </div>
      </div>
    </MainBasicCard>
  );
};

export default Dashboard;
