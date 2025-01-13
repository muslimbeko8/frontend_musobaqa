"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Paper,
  Modal,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([
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
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
  });

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (index) => {
    setSelectedIndex(index);
    setNewEmployee(employees[index]);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedIndex(null);
    setNewEmployee({ name: "", role: "", phone: "", email: "" });
    setOpenEditModal(false);
  };

  const handleOpenDeleteModal = (index) => {
    setSelectedIndex(index);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedIndex(null);
    setOpenDeleteModal(false);
  };

  const handleAddEmployee = () => {
    if (
      newEmployee.name &&
      newEmployee.role &&
      newEmployee.phone &&
      newEmployee.email
    ) {
      setEmployees([...employees, newEmployee]);
      setNewEmployee({ name: "", role: "", phone: "", email: "" });
      handleCloseAddModal();
    }
  };

  const handleEditEmployee = () => {
    const updatedEmployees = [...employees];
    updatedEmployees[selectedIndex] = newEmployee;
    setEmployees(updatedEmployees);
    handleCloseEditModal();
  };

  const handleDeleteEmployee = () => {
    const updatedEmployees = employees.filter((_, i) => i !== selectedIndex);
    setEmployees(updatedEmployees);
    handleCloseDeleteModal();
  };

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
        <Button
          variant="contained"
          color="success"
          onClick={handleOpenAddModal}
        >
          + Xodim qo'shish
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
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>F.I.O</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Hodim turi</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Telefon</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.email}</TableCell>
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
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Xodim qo'shish
          </Typography>
          <TextField
            label="F.I.O"
            fullWidth
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Hodim turi</InputLabel>
            <Select
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, role: e.target.value })
              }
            >
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Hodim">Hodim</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Telefon"
            fullWidth
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="E-mail"
            fullWidth
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleAddEmployee}
            >
              Qo'shish
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseAddModal}
            >
              Bekor qilish
            </Button>
          </Box>
        </Box>
      </Modal>

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
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Xodimni o'zgartirish
          </Typography>
          <TextField
            label="F.I.O"
            fullWidth
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Hodim turi</InputLabel>
            <Select
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, role: e.target.value })
              }
            >
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Hodim">Hodim</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Telefon"
            fullWidth
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="E-mail"
            fullWidth
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleEditEmployee}
            >
              Saqlash
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCloseEditModal}
            >
              Bekor qilish
            </Button>
          </Box>
        </Box>
      </Modal>

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
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            O'chirasizmi?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteEmployee}
            >
              Ha
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCloseDeleteModal}
            >
              Yo'q
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
