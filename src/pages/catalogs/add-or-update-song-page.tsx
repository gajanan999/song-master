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

export const AddOrUpdateSongPage = (props: any) => {
  const initialFormData = {
    songId: "",
    songName: "",
    songDetails: "",
    releaseYear: "",
    songUrl: "",
    artistName: "",
  };

  const formik = useFormik({
    initialValues: initialFormData,
    onSubmit: (values) => {
      handleAddUpdate(values);
    },
  });

  const handleAddUpdate = async (formData: any) => {
    let request: any = {
      "songId": formData.songId ? formData.songId : "",
      "songName": formData.songName,
      "songDetails": formData.songDetails,
      "releaseYear": formData.releaseYear ? parseInt(formData.releaseYear): 0,
      "songUrl": formData.songUrl
    }
    await SongService.addOrUpdateSong({
      request: request,
      handleResponse: (response: any) => {
       if(response.status !== undefined && response.status !== 'SUCCESS'){
          console.log('ADDITION FAILED')
       }else{
        formik.setValues(initialFormData)
        props.getAllSongs();
       }
      },
      handleError: (error: any) => {
        console.log('error {}', error)
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
                  <Grid  style={{ textAlign: "right"}} item lg={6} xs={12}>
                    <Button
                      type="submit"
                      data-action="add-update"
                      variant="contained"
                      color="primary"
                      style={{ justifyContent:'right', alignItems:'right', marginTop: "16px" }}
                    >
                      Add/Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </MainBasicCard>
        </>
      )}
    </>
  );
};
