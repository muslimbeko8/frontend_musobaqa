import React, { useState, useEffect } from "react";
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
  TablePagination,
} from "@mui/material";
import { useGetEmployeesQuery, useGetManagersQuery } from "@/lib/service/api";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: employeesData, isLoading: isEmployeesLoading } =
    useGetEmployeesQuery({
      limit: pageSize,
      page: currentPage,
    });

  const { data: managersData, isLoading: isManagersLoading } =
    useGetManagersQuery({
      limit: pageSize,
      page: currentPage,
    });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (employeesData && managersData) {
      setEmployees([...employeesData, ...managersData]);
    }
  }, [employeesData, managersData]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const renderStatus = (isActive) => {
    if (isActive) {
      return (
        <Button
          variant="outlined"
          color="success"
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "12px",
          }}
        >
          Active
        </Button>
      );
    }
    return (
      <Button
        variant="outlined"
        color="error"
        size="small"
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: "12px",
        }}
      >
        Block
      </Button>
    );
  };

  if (isEmployeesLoading || isManagersLoading) {
    return <div>Yuklanmoqda...</div>;
  }

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
          + Xodim qo'shish
        </Button>
        <TextField
          variant="outlined"
          placeholder="Поиск по фамилии"
          size="small"
          sx={{ width: "300px" }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Фамилия Имя</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Turi</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Телефон</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>E-mail</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Статус проверяющего
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>
                  {employee.name} {employee.last_name}
                </TableCell>
                <TableCell>{employee.type}</TableCell>
                <TableCell>{employee.tel_number}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{renderStatus(employee.isActive)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={100}
        page={currentPage - 1}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
}
