"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useGetDoctorIdQuery } from "@/lib/service/api";

const DoctorDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: doctor, error, isLoading } = useGetDoctorIdQuery(id);

  if (!id) {
    return (
      <Typography color="error">
        Doctor ID is missing. Please provide a valid ID in the URL.
      </Typography>
    );
  }

  return (
    <Box sx={{ paddingTop: 4, paddingLeft: 2, paddingRight: 2 }}>
      <Button
        variant="outlined"
        onClick={() => router.push("/doctors")}
        sx={{ marginBottom: 3 }}
      >
        Back to Doctors List
      </Button>
      {isLoading && <Typography>Loading...</Typography>}
      {error && (
        <Typography color="error">
          Error: {error?.data?.message || "An error occurred."}
        </Typography>
      )}
      {doctor && (
        <Box
          sx={{
            border: "1px solid #ddd",
            padding: 3,
            borderRadius: 2,
            boxShadow: 2,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={doctor.image}
              alt={`${doctor.first_name} ${doctor.last_name}`}
              sx={{ width: 80, height: 80, marginRight: 3 }}
            />
            <Box>
              <Typography variant="h5">
                {doctor.first_name} {doctor.last_name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Specialization: {doctor.specialization}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {doctor.experience
                  ? `Experience: ${doctor.experience} years`
                  : "No experience data available."}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Rating: {doctor.rating || "Not rated yet"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">Biography</Typography>
            <Typography variant="body2" color="text.secondary">
              {doctor.bio || "No biography available."}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DoctorDetails;
