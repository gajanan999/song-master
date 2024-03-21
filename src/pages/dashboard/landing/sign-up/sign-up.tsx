import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Select, MenuItem, FormControl, InputLabel,Snackbar, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { UserService } from "../../../../services/user-service";
import { useNavigate } from "react-router-dom";
import DraggableDialog from "../../../../components/DraggableDialog/draggable-dialog";

export default function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [snackMessage, setsSnackMessage] = React.useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const initialFormData = {
    username: "",
    mobileNumber: "",
    emailId: "",
    password: "",
    role: "",
  };

  const formik = useFormik({
    initialValues: initialFormData,
    onSubmit: async (values) => {
      let request = {
        userName: values.username,
        password: values.password,
        emailId: values.emailId,
        mobileNumber: values.mobileNumber,
        role: values.role ? values.role : "USER",
      };
      await UserService.registerUser({
        request: request,
        handleResponse: (response) => {
          if (response.status !== undefined && response.status !== "SUCCESS") {
          } else {
            setsSnackMessage('User Registered successfully')
            handleClick()
            setTimeout(()=>{
                navigate('/singin')
            }, 5000)
          }
        },
        handleError: (error) => {
            setsSnackMessage('User Registration failed')
            handleClick()
        },
      });
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
    });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            autoComplete="mobileNumber"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={formik.values.emailId}
            onChange={formik.handleChange}
            id="emailId"
            label="Email Id"
            name="emailId"
            autoComplete="emailId"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            id="password"
            label="password"
            name="password"
            autoComplete="password"
            autoFocus
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.role}
              name="role"
              label="Role"
              onChange={formik.handleChange}
            >
              <MenuItem value={"USER"}>User</MenuItem>
              <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="signin" variant="body2">
                Back to Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

       <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackMessage}
        action={action}
      />
    </Container>
  );
}
