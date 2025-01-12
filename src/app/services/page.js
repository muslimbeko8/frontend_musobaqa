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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useRouter } from "next/navigation";
import api, {
  useGetServicesQuery,
  useCreateServiceMutation,
  useGetServiceTypesQuery,
} from "@/lib/service/api";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
  const dispatch = useDispatch();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTypeId("");
  };

  const handleCreateService = async () => {
    try {
      console.log(typeId);
      await createService({ type: typeId }).unwrap();
      toast("Service created successfully!");
      // alert("Service created successfully!");
      dispatch(api.util.resetApiState());
      handleClose();
    } catch (err) {
      console.error("Error creating service:", err);
      alert("Failed to create service. Please try again.");
      toast("Failed to create service. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <div className="flex justify-between pb-4">
        <Typography variant="h4">Services</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Service
        </Button>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="create-service-dialog"
      >
        <DialogTitle id="create-service-dialog">Create New Service</DialogTitle>
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
              </TextField>
            </>
          ) : (
            <Typography sx={{ color: "text.secondary" }}>
              No service types available. Please add a new service type first.
            </Typography>
          )}
        </DialogContent>
        <div className="flex justify-around pb-4">
          <Button
            onClick={() => router.push("/addtype")}
            variant="outlined"
            color="primary"
          >
            Add Type
          </Button>

          <div className="flex gap-2">
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
                disabled={true}
                onClick={handleCreateService}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            )}
          </div>
        </div>
      </Dialog>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">
          Error: {error?.data?.message || "Failed to fetch services"}
        </Typography>
      ) : (
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
                  <Typography variant="h6">{service.type.name}</Typography>
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
      )}
    </Box>
  );
};

export default Services;
