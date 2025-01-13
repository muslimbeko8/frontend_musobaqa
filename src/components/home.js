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

export default function HomePage() {
  const rows = [
    {
      id: 1,
      name: "manager1",
      email: "manager1@manager1",
      last_name: "manager1",
      tel_number: "+998944590628",
      type: "manager",
      isActive: true,
      tasks: [
        {
          id: 1,
          name: "hodim qabul qilish",
          type: "manager",
        },
        {
          id: 4,
          name: "hodim qabul qilish",
          type: "manager",
        },
      ],
    },
    {
      id: 2,
      name: "manager2",
      email: "manager2@manager2",
      last_name: "manager1",
      tel_number: "+998944590628",
      type: "manager",      
      isActive: true,
      tasks: [],
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
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
              <TableCell>Статус проверяющего</TableCell>
              <TableCell align="right">Amallar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {row.name} {row.last_name}
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.tel_number}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  {row.isActive ? <h1>blok</h1> : <h1>Active</h1>}
                </TableCell>

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
