"use client"
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

export default function TaskTable() {
  const [tasks, setTasks] = useState([
    { task: "Xodim qabul qilish", role: "Manager" },
    { task: "Hodim bo'shatish", role: "manager" },
    { task: "Product qabul qilish", role: "Hodim" },
    { task: "Product tushurish", role: "Hodim" },
    { task: "Product qadoqlash", role: "Hodim" },
    { task: "Product olib borish", role: "Hodim" },
    { task: "Hodim lavozimini o'zgartirish", role: "Manager" },
    { task: "Tozalikka qarash", role: "Hodim" },
  ]);

  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({ task: "", role: "" });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = () => {
    if (newTask.task && newTask.role) {
      setTasks([...tasks, newTask]);
      setNewTask({ task: "", role: "" });
      handleClose();
    }
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
        <Button variant="contained" color="success" onClick={handleOpen}>
          + Vazifa qo'shish
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
              <TableCell sx={{ fontWeight: "bold" }}>Vazifa</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Turi</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Amallar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.task}</TableCell>
                <TableCell>{task.role}</TableCell>
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

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
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
            Vazifa qo'shish
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Hodim turi</InputLabel>
            <Select
              value={newTask.role}
              onChange={(e) => setNewTask({ ...newTask, role: e.target.value })}
            >
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Hodim">Hodim</MenuItem>
              <MenuItem value="manager">manager</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Vazifa nomi"
            fullWidth
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="success" onClick={handleAddTask}>
              Qo'shish
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Bekor qilish
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
