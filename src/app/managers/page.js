"use client"
import React, { useState } from "react";
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
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function EmployeeTable() {
  const [rows, setRows] = useState([
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
  ]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
  });

  // Modalni ochish va yopish funksiyalari
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setEmployeeData({ name: "", role: "", phone: "", email: "" });
    setOpenAddModal(false);
  };

  const handleOpenEditModal = (index) => {
    setSelectedIndex(index);
    setEmployeeData(rows[index]);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedIndex(null);
    setEmployeeData({ name: "", role: "", phone: "", email: "" });
    setOpenEditModal(false);
  };

  const handleOpenDeleteModal = (index) => {
    setSelectedIndex(index);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  // Xodim qo'shish
  const handleAddEmployee = () => {
    if (employeeData.name && employeeData.role && employeeData.phone && employeeData.email) {
      setRows([...rows, employeeData]);
      handleCloseAddModal();
    }
  };

  // Xodimni o'zgartirish
  const handleEditEmployee = () => {
    const updatedRows = [...rows];
    updatedRows[selectedIndex] = employeeData;
    setRows(updatedRows);
    handleCloseEditModal();
  };

  // Xodimni o'chirish
  const handleDeleteEmployee = () => {
    setRows(rows.filter((_, index) => index !== selectedIndex));
    setOpenDeleteModal(false);
  };

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
        <Button variant="contained" color="success" onClick={handleOpenAddModal}>
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
              <TableCell sx={{ fontWeight: "bold" }}>Фамилия Имя</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Turi</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Телефон</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>E-mail</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Amallar
              </TableCell>
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
                    onClick={() => handleOpenEditModal(index)}
                  >
                    O'zgartirish
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleOpenDeleteModal(index)}
                  >
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
        <Typography variant="body2">1–10 из {rows.length}</Typography>
        <Pagination count={Math.ceil(rows.length / 10)} color="primary" />
      </Box>

      {/* Add Employee Modal */}
      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Hodim qo'shish
          </Typography>
          <TextField
            fullWidth
            label="F.I.O"
            sx={{ mb: 2 }}
            value={employeeData.name}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, name: e.target.value })
            }
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Hodim turi</InputLabel>
            <Select
              value={employeeData.role}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, role: e.target.value })
              }
            >
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Hodim">Hodim</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Telefon"
            sx={{ mb: 2 }}
            value={employeeData.phone}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, phone: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="E-mail"
            sx={{ mb: 2 }}
            value={employeeData.email}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, email: e.target.value })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="success" onClick={handleAddEmployee}>
              Qo'shish
            </Button>
            <Button variant="outlined" color="error" onClick={handleCloseAddModal}>
              Bekor qilish
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Hodimni o'zgartirish
          </Typography>
          {/* Form is the same as Add */}
          <TextField
            fullWidth
            label="F.I.O"
            sx={{ mb: 2 }}
            value={employeeData.name}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, name: e.target.value })
            }
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Hodim turi</InputLabel>
            <Select
              value={employeeData.role}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, role: e.target.value })
              }
            >
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Hodim">Hodim</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Telefon"
            sx={{ mb: 2 }}
            value={employeeData.phone}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, phone: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="E-mail"
            sx={{ mb: 2 }}
            value={employeeData.email}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, email: e.target.value })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="success" onClick={handleEditEmployee}>
              Saqlash
            </Button>
            <Button variant="outlined" color="error" onClick={handleCloseEditModal}>
              Bekor qilish
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Employee Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Ushbu xodimni o'chirishni xohlaysizmi?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="contained" color="error" onClick={handleDeleteEmployee}>
              Ha
            </Button>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>
              Yo'q
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
