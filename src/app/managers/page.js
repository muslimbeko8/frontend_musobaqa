import React from "react";
import {
  Table,
  TableBody,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Pagination,
  TextField,
  Box,
  Typography,
} from "@mui/material";

export default function EmployeeTable() {
  const rows = [
    {
      name: "Петренко Владимир",
      role: "Manager",
      phone: "+7 900 000-00-00",
      email: "v.petrenko@mail.ru",
    },
    {
      name: "Новиков Иван",
      role: "Hodim",
      phone: "+7 900 000-00-00",
      email: "i.novikov@mail.ru",
    },
    // Add more rows as needed
  ];

  return (
    <Box sx={{ padding: 3 }}>
      {/* Top bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button variant="contained" color="success">
          + Hodim qo'shish
        </Button>
        <TextField
          variant="outlined"
          placeholder="Поиск по фамилии"
          size="small"
          sx={{ width: "300px" }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фамилия Имя</TableCell>
              <TableCell>Turi</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell align="right">Amallar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    O'zgartirish
                  </Button>
                  <Button variant="contained" color="error" size="small">
                    O'chirish
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="body2">1–10 из 28</Typography>
        <Pagination count={3} color="primary" />
      </Box>
    </Box>
  );
}
