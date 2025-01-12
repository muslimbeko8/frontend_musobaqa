"use client";

import React from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  useGetServicesQuery,
  useCreateServiceMutation,
  useGetServiceTypesQuery,
} from "@/lib/service/api";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Services = () => {
  const router = useRouter();
  const { data: services = [], isLoading, error } = useGetServicesQuery();
  const { data: serviceTypes = [] } = useGetServiceTypesQuery();
  const [createService] = useCreateServiceMutation();
  const [open, setOpen] = React.useState(false);
  const [typeId, setTypeId] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTypeId("");
  };

  const handleCreateService = async () => {
    try {
      await createService({ type: typeId }).unwrap();
      alert("Service created successfully!");
      handleClose();
    } catch (err) {
      console.error("Error creating service:", err);
      alert("Failed to create service. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <div className="flex justify-between pb-4">
        <div className="text-4xl">Services</div>
        <React.Fragment>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add Service
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="create-service-dialog"
          >
            <DialogTitle id="create-service-dialog">
              Create New Service
            </DialogTitle>
            <DialogContent sx={{ minWidth: 400 }}>
              {serviceTypes.length > 0 ? (
                <>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: "text.secondary" }}
                  >
                    Please select a service type to create a new service.
                  </Typography>
                  <TextField
                    select
                    margin="dense"
                    id="type"
                    label="Service Type"
                    fullWidth
                    value={typeId}
                    onChange={(e) => setTypeId(e.target.value)}
                  >
                    {serviceTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                    <MenuItem
                      value="create-new"
                      onClick={() => router.push("/creatateservicetype")}
                    >
                      + Create New Service Type
                    </MenuItem>
                  </TextField>
                </>
              ) : (
                <Typography sx={{ color: "text.secondary" }}>
                  No service types available. Please add a new service type
                  first.
                </Typography>
              )}
            </DialogContent>
            <DialogActions className="flex">
              <Button onClick={handleClose} color="error">
                Cancel
              </Button>
              {serviceTypes.length > 0 ? (
                <Button
                  onClick={handleCreateService}
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/addtype")}
                  variant="contained"
                  color="primary"
                >
                  Add Type
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
      {isLoading && <Typography>Loading...</Typography>}
      {error && (
        <Typography color="error">
          Error: {error?.data?.message || "Failed to fetch services"}
        </Typography>
      )}
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} md={6} lg={4} key={service.id}>
            <Box
              sx={{
                border: "1px solid #ddd",
                padding: 2,
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{service.type.name}</Typography>
                </Box>
                <Avatar
                  src={service.type.icon}
                  alt={service.type.name}
                  sx={{ width: 40, height: 40 }}
                />
              </Box>

              <Button
                variant="outlined"
                onClick={() => router.push(`/services/${service.id}`)}
                sx={{ marginTop: 2 }}
              >
                View Details
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
