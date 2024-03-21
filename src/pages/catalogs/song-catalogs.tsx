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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Box, Button } from "@mui/material";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component

import { SongService } from "../../services/song-service";
import { useSelector, useDispatch } from "react-redux";
import { AddOrUpdateSongPage } from "./add-or-update-song-page";
import DraggableDialog from "../../components/DraggableDialog/draggable-dialog";

const SongsCatalog = () => {
  const gridRef = useRef<AgGridReact<never>>(null);
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
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState<any[]>();
  const user = useSelector((state: any) => state.user.user);
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);
  const [showEditSongContainer, setShowEditSongContainer] = useState(false);

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
    await SongService.deleteSong({
      songId: rowData["songId"],
      handleResponse: (response: any) => {
        if (response.status !== 200) {
          console.log("DELETION FAILED");
          openPopup('Error', response['data']['message'],'OK')
        } else {

          getAllSongs();
        }
      },
      handleError: (error: any) => {
        console.log("error {}", error);
        openPopup('Error', error['response']['data']['message'],'OK')
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
        checkboxSelection: true,
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
    await SongService.getAllSongs({
      handleResponse: (response: any) => {
        setRowData(response);
      },
      handleError: (error: any) => {},
    });
  };

  const handleNew = () => {
    setShowEditSongContainer(true);
  };

  const addSongsToMyCatalog = async () =>{

    if(gridRef.current != null && gridRef.current.api != null){
      const selectedRows = gridRef.current.api.getSelectedRows();
      const selectedSongs = selectedRows.map((row: any) => {
        return {
          songId: row.songId,
          songName: row.songName,
          songDetails: row.songDetails,
          artistName: row.artistName,
          releaseYear: row.releaseYear,
          songUrl: row.songUrl,
        };
      });

      await SongService.addOrUpdateSongToUserCatalog({
        userId: user.id,
        request: selectedSongs,
        handleResponse: (response: any) => {
         if(response.status !== undefined && response.status !== 'SUCCESS'){
            openPopup('Error', response.errorMessage, 'OK');
         }else{
          openPopup('Success', "Songs added to your catalog", 'OK');
         }
        },
        handleError: (error: any) => {
            openPopup('Error', error['response']['data']['message'], 'OK');
          console.log('error {}', error)
        },
      });
    }
  }


  const handleRefresh = async () => {
    getAllSongs();
  };

  return (
    <MainBasicCard sx={{ padding: "10px" }} elevation={2}>
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
            Refresh
          </Button>
          {user.role === 'ADMIN' && <Button
            sx={{ mr: 1, mt: 1 }}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleNew}
          >
            Add Song
          </Button>}
          <Button
            sx={{ mr: 1, mt: 1 }}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addSongsToMyCatalog}
          >
            Add Song To My Catalog
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
            rowSelection={"multiple"}
            enableCellTextSelection={true}
            ensureDomOrder={true}
            paginationPageSize={20}
            onGridReady={onGridReady}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={12} lg={12} sx={{ mt: "10px" }}>
        <AddOrUpdateSongPage
          showEditSongContainer={showEditSongContainer}
          setShowEditSongContainer={setShowEditSongContainer}
          getAllSongs={getAllSongs}
        />
      </Grid>
      <DraggableDialog
            open={open}
            setOpen={handleClose}
            title={popupTitle}
            message={popupMessage}
            confirmButtonTitle={confirmButtonTitle}
            confirm={handleClose}
          />
    </MainBasicCard>
  );
};

export default SongsCatalog;
