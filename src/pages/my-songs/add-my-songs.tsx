import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useFormik } from "formik";
import MainBasicCard from "../../components/card/main-basic-card";
import { SongService } from "../../services/song-service";
import { useSelector } from "react-redux";

import DraggableDialog from "../../components/DraggableDialog/draggable-dialog";
export const AddMySongPage = (props: any) => {
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("Confirmation");
  const [open, setOpen] = React.useState(false);
  const [confirmButtonTitle, setConfirmButtonTitle] = useState("Ok");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const openPopup = (
    title: string,
    message: string,
    confirmButtonTitle: string
  ) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setConfirmButtonTitle(confirmButtonTitle);
    handleOpen();
  };

  const user = useSelector((state: any) => state.user.user);
  const initialFormData = {
    songId: "",
    songName: "",
    artistName: "",
    songDetails: "",
    releaseYear: "",
    songUrl: "",
  };

  const formik = useFormik({
    initialValues: initialFormData,
    onSubmit: (values) => {
      handleAddUpdate(values);
    },
  });

  const handleAddUpdate = async (formData: any) => {
    let request: any = {
      songId: formData.songId ? formData.songId : "",
      songName: formData.songName,
      artistName: formData.artistName,
      songDetails: formData.songDetails,
      releaseYear: formData.releaseYear ? parseInt(formData.releaseYear) : 0,
      songUrl: formData.songUrl,
    };

    let requests = [request];
    await SongService.addOrUpdateSongToUserCatalog({
      userId: user.id,
      request: requests,
      handleResponse: (response: any) => {
        if (response.status !== undefined && response.status !== "SUCCESS") {
          openPopup("Error", response.errorMessage, "OK");
        } else {
          formik.setValues(initialFormData)
          props.getAllSongs();
        }
      },
      handleError: (error: any) => {
        openPopup("Error", error["response"]["data"]["message"], "OK");
        console.log("error {}", error);
      },
    });
  };

  return (
    <>
      {props.showEditSongContainer && (
        <>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Add/Update Song</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainBasicCard sx={{ mt: 2 }} content={true}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item lg={6} xs={12}>
                    <TextField
                      name="songId"
                      label="Song Id"
                      disabled
                      fullWidth
                      value={formik.values.songId}
                      onChange={formik.handleChange}
                      InputLabelProps={{
                        shrink: formik.values.songId !== "" ? true : false,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <TextField
                      name="songName"
                      label="Song Name"
                      fullWidth
                      value={formik.values.songName}
                      onChange={formik.handleChange}
                      InputLabelProps={{
                        shrink: formik.values.songName !== "" ? true : false,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <TextField
                      name="artistName"
                      label="Artist Name"
                      fullWidth
                      value={formik.values.artistName}
                      onChange={formik.handleChange}
                      InputLabelProps={{
                        shrink: formik.values.artistName !== "" ? true : false,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <TextField
                      name="songDetails"
                      label="Song Details"
                      fullWidth
                      value={formik.values.songDetails}
                      onChange={formik.handleChange}
                      InputLabelProps={{
                        shrink: formik.values.songDetails !== "" ? true : false,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <TextField
                      name="releaseYear"
                      label="Release Year"
                      fullWidth
                      value={formik.values.releaseYear}
                      onChange={formik.handleChange}
                      InputLabelProps={{
                        shrink: formik.values.releaseYear !== "" ? true : false,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <TextField
                      name="songUrl"
                      label="Song Url"
                      fullWidth
                      value={formik.values.songUrl}
                      onChange={formik.handleChange}
                      InputLabelProps={{
                        shrink: formik.values.songUrl !== "" ? true : false,
                      }}
                    />
                  </Grid>
                  <Grid style={{ textAlign: "right" }} item lg={6} xs={12}>
                    <Button
                      type="submit"
                      data-action="add-update"
                      variant="contained"
                      color="primary"
                      style={{
                        justifyContent: "right",
                        alignItems: "right",
                        marginTop: "16px",
                      }}
                    >
                      Add/Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </MainBasicCard>
          <DraggableDialog
            open={open}
            setOpen={handleClose}
            title={popupTitle}
            message={popupMessage}
            confirmButtonTitle={confirmButtonTitle}
            confirm={handleClose}
          />
        </>
      )}
    </>
  );
};
