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
  IconButton,
  InputAdornment,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/lib/service/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#14B890",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(email, password);

      const response = await login({ email, password }).unwrap();
      localStorage.setItem("authToken", JSON.stringify(response));
      router.push("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "800px",
          padding: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: 480,
            margin: "0 auto",
            bgcolor: "background.paper",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography
              className="font-bold"
              variant="h4"
              gutterBottom
              sx={{ color: "text.primary" }}
            >
              Kirish
            </Typography>
            <br />
            {error && (
              <Typography color="error" variant="body2" align="center">
                {error?.data?.message || "Login failed"}
              </Typography>
            )}
            <TextField
              className="rounded-lg"
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              className="rounded-lg"
              id="outlined-password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "hide password" : "show password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              className="w-28 rounded-lg"
              disabled={isLoading}
              sx={{
                height: 48,
                fontWeight: "bold",
                textTransform: "none",
                mt: 2,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress
                  size={20}
                  sx={{ marginRight: 1, color: "#fff" }}
                />
              ) : (
                "войти"
              )}
              {isLoading ? "Loading..." : ""}
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
