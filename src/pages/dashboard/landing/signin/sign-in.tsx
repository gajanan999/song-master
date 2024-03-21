import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; 


import { useAppContext } from '../../../../App';
import { AuthService } from '../../../../services/auth-service';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../../store/reducers/user';
import DraggableDialog from '../../../../components/DraggableDialog/draggable-dialog';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popupMessage, setPopupMessage] = useState('');
  const [popupTitle, setPopupTitle] = useState('Confirmation');
  const [open, setOpen] = React.useState(false);
  const [confirmButtonTitle, setConfirmButtonTitle] = useState('Ok');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const openPopup = (title: string, message: string, confirmButtonTitle: string) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setConfirmButtonTitle(confirmButtonTitle);
    handleOpen();
  };

  const { setAuthorization } = useAppContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleSignUp = () =>{
    navigate("/sign-up")
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      mobileNumber: data.get('mobile_no'),
      password: data.get('password')
    });

    await AuthService.login({
      mobileNumber: data.get('mobile_no')?.toString() || "",
      password: data.get('password')?.toString() || "",
      handleResponse: (response: any) => {
        // Handle successful login, e.g., store tokens or user data in state/contexts
        console.log('Login response', response);
        if (response.status !== undefined && response.status !== 'SUCCESS') {
          setAuthorization(false);
        } else {
          console.log(response);
            dispatch(loginUser(response));
            setAuthorization(true)
        }
      },
      handleError: (error: any, errorMessage: string) => {
        if(error.code === "ERR_NETWORK"){
          openPopup('Error', 'Server not responding', 'OK')
        }else{
          openPopup('Error', errorMessage, 'OK')
        }
        console.error('Login error:', error);
        setAuthorization(false);
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobile_no"
            label="Mobile Number"
            name="mobile_no"
            autoComplete="mobile_no"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility} onMouseDown={handleMouseDownPassword} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              )
            }}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Button onClick={handleSignUp} fullWidth   variant="contained" sx={{  color:"white",   backgroundColor: '#0063cc', borderColor: '#0063cc',mb: 2 }}>
            Sign up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="forget-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <DraggableDialog
            open={open}
            setOpen={handleClose}
            title={popupTitle}
            message={popupMessage}
            confirmButtonTitle={confirmButtonTitle}
            confirm={handleClose}
          />
    </Container>
  );
}
