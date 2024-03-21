import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import MainBasicCard from "../../components/card/main-basic-card";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  Box,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component

import { useFormik } from "formik";
import { SongService } from "../../services/song-service";
import { useSelector } from "react-redux";
import moment from "moment";
import { AddMySongPage } from "./add-my-songs";

const MySongsCatalog = () => {
  const gridRef = useRef<AgGridReact<never>>(null);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState<any[]>();
  const user = useSelector((state: any) => state.user.user);
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);
  const [showEditSongContainer, setShowEditSongContainer] = useState(false);

  const initialFormData = {
    releaseYear: "",
    artistName: "",
    sortBy: "",
    sortByColumns: ""
  };

  const formik = useFormik({
    initialValues: initialFormData,
    onSubmit: (values) => {
      getAllSongs();
    },
  });

  const onFilterTextBoxChanged = useCallback(() => {
    if (gridRef.current) {
      const filterTextBox = document.getElementById(
        "filter-text-box"
      ) as HTMLInputElement;
      if (filterTextBox) {
        console.log(filterTextBox);
        gridRef.current.api.setGridOption(
          "quickFilterText",
          filterTextBox.value || ""
        );
      }
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    initializeComponent();
  };

  const handleEdit = (rowData: any) => {};

  const handleDelete = async (rowData: any) => {
    let songIds: string[] = [];
    songIds.push(rowData["songId"]);

    await SongService.deleteSongFromUserCatelog({
      userId: user.id,
      songId: rowData["songId"],
      handleResponse: (response: any) => {
        if (response.status !== "SUCCESS") {
          console.log("DELETION FAILED");
        } else {
          getAllSongs();
        }
      },
      handleError: (error: any) => {
        console.log("error {}", error);
      },
    });
  };

  const editColumnDef = {
    headerName: "Actions",
    field: "edit", // Use a unique field name
    width: 150,
    cellStyle: { textAlign: "left" },
    cellRenderer: (params: any) => (
      <>
        <IconButton onClick={() => handleDelete(params.data)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  };

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    }),
    []
  );

  const initializeComponent = () => {
    setColumnDefs([
      editColumnDef,
      {
        field: "songId",
        headerName: "Song Id",
      },
      {
        field: "songName",
        headerName: "Song Name",
        cellStyle: { textAlign: "left" },
      },
      {
        field: "artistName",
        headerName: "Artist Name",
        cellStyle: { textAlign: "left" },
      },
      {
        field: "songDetails",
        headerName: "Song Details",
        cellStyle: { textAlign: "left" },
      },
      {
        field: "releaseYear",
        headerName: "Release Year",
        cellStyle: { textAlign: "left" },
      },
      {
        field: "songUrl",
        headerName: "Song Url",
        cellStyle: { textAlign: "left" },
      },
    ]);
  };

  const onGridReady = useCallback(async (params: any) => {
    getAllSongs();
  }, []);

  const getAllSongs = async () => {
    console.log(formik.values.releaseYear);
    console.log(formik.values.artistName);
    console.log(formik.values.sortBy);

    await SongService.getAllSongsByUserId({
      userId: user.id,
      releaseYear:
        formik.values.releaseYear !== null
          ? formik.values.releaseYear.toString()
          : "",
      artistName: formik.values.artistName ? formik.values.artistName : "",
      sortBy: formik.values.sortBy ? formik.values.sortBy : "",
      sortByColumns: formik.values.sortByColumns ? formik.values.sortByColumns: "",
      handleResponse: (response: any) => {
        setRowData(response);
      },
      handleError: (error: any) => {},
    });
  };

  const handleNew = () => {
    setShowEditSongContainer(true);
  };

  const handleRefresh = async () => {
    getAllSongs();
  };

  return (
    <MainBasicCard sx={{ padding: "10px" }} elevation={2}>
      <Grid container spacing={2} sx={{ marginBottom: 1 }}>
        <Grid item xs={12} md={3} lg={3}>
          {/* Status Dropdown */}
          <FormControl fullWidth>
            <DatePicker
              label={"Release Year"}
              name="releaseYear"
              openTo="year"
              views={["year"]}
              value={
                formik.values.releaseYear
                  ? moment(`${formik.values.releaseYear}`, "YYYY")
                  : null
              }
              onChange={(date) =>
                formik.setFieldValue("releaseYear", moment(date).year())
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          {/* Status Dropdown */}
          <FormControl fullWidth>
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
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          {/* Status Dropdown */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.sortBy}
              name="sortBy"
              label="Sort By"
              onChange={formik.handleChange}
            >
              <MenuItem value={"None"}>None</MenuItem>
              <MenuItem value={"ASC"}>ASC</MenuItem>
              <MenuItem value={"DESC"}>DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          {/* Status Dropdown */}
          <FormControl fullWidth>
            <TextField
              name="sortByColumns"
              label="Sort By Columns comma separated"
              fullWidth
              value={formik.values.sortByColumns}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: formik.values.sortByColumns !== "" ? true : false,
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <Paper
            component="form"
            sx={{
              p: "2px 3px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              id="filter-text-box"
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search..." }}
              onInput={onFilterTextBoxChanged}
            />
            <IconButton type="button" sx={{ p: "8px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          {/* <IconButton sx={{ ml:1, mt:1 }} aria-label="refresh" onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton> */}
          <Button
            sx={{ mr: 1, mt: 1, ml: 1 }}
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Refresh / Filter
          </Button>
          <Button
            sx={{ mr: 1, mt: 1 }}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleNew}
          >
            Add Song
          </Button>
        </Box>
        <div className="ag-theme-alpine" style={gridStyle}>
          <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            pagination={true}
            enableCellTextSelection={true}
            ensureDomOrder={true}
            paginationPageSize={20}
            onGridReady={onGridReady}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={12} lg={12} sx={{ mt: "10px" }}>
        <AddMySongPage
          showEditSongContainer={showEditSongContainer}
          setShowEditSongContainer={setShowEditSongContainer}
          getAllSongs={getAllSongs}
        />
      </Grid>
    </MainBasicCard>
  );
};

export default MySongsCatalog;
