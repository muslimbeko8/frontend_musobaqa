"use client";

import React from "react";
import { Box, Typography, Grid, Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useGeDoctorsQuery } from "@/lib/service/api";

const Doctors = () => {
  const { data: doctors, error, isLoading } = useGeDoctorsQuery();
  const router = useRouter();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Doctors
      </Typography>
      {isLoading && <Typography>Loading...</Typography>}
      {error && (
        <Typography color="error">
          {error?.data?.message || "An error occurred."}
        </Typography>
      )}
      <Grid container spacing={2}>
        {doctors?.map((doctor) => (
          <Grid item xs={12} md={6} lg={4} key={doctor.id}>
            <Box
              sx={{
                border: "1px solid #ddd",
                padding: 2,
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={doctor.image}
                  alt={`${doctor.first_name} ${doctor.last_name}`}
                  sx={{ width: 60, height: 60, marginRight: 2 }}
                />
                <Box>
                  <Typography variant="h6">
                    {doctor.first_name} {doctor.last_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.specialization}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                onClick={() => router.push(`/doctors/${doctor.id}`)}
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

export default Doctors;
