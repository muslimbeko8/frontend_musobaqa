// src/components/Login.js
"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/lib/service/api";

export default function Login() {
  const [phone, setPhone] = useState("+998333932580");
  const [password, setPassword] = useState("admin");
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ phone, password }).unwrap();
      localStorage.setItem("authToken", JSON.stringify(response));
      router.push("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "100%",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error?.data?.message || "Login failed"}
            </Typography>
          )}
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{
              height: 48,
              fontWeight: "bold",
              textTransform: "none",
            }}
            startIcon={isLoading && <CircularProgress size={20} />}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
