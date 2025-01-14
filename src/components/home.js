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
  Modal,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  useGetEmployeesQuery,
  useGetManagersQuery,
  useDeleteManagerMutation,
  useDeleteEmployesMutation,
} from "@/lib/service/api";

export default function HomePage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [loading, setLoading] = useState(false);
  const {
    data: employeesData,
    error: employeesError,
    isLoading: isEmployeesLoading,
  } = useGetEmployeesQuery({
    limit: pageSize,
    page: currentPage,
  });

  const {
    data: managersData,
    error: managersError,
    isLoading: isManagersLoading,
  } = useGetManagersQuery({
    limit: pageSize,
    page: currentPage,
  });

  const [deleteManager] = useDeleteManagerMutation();
  const [deleteEmloyes] = useDeleteEmployesMutation();

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (employeesError?.status === 401 || managersError?.status === 401) {
      router.push("/login");
    }
  }, [employeesError, managersError, router]);

  useEffect(() => {
    if (employeesData && managersData) {
      const combined = [...employeesData, ...managersData];
      const filtered = combined.filter(
        (employee) =>
          employee.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setEmployees(filtered);
    }
  }, [employeesData, managersData, searchQuery]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleDeleteEmployee = async () => {
    if (!selectedEmployee?.id) return;

    setLoading(true);

    try {
      const a = await deleteEmloyes(selectedEmployee.id);
      console.log(a);

      console.log(
        `Employee with ID: ${selectedEmployee.id} deleted from managers.`
      );
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          await deleteManager(selectedEmployee.id);
        } catch (err) {
          console.error("Failed to delete employee from employees:", err);
        }
      } else {
        console.error("Failed to delete employee from managers:", error);
      }
    } finally {
      setLoading(false);
      setOpenDeleteModal(false);
    }
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

  if (isEmployeesLoading || isManagersLoading || loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
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
        <TextField
          variant="outlined"
          placeholder="Search by name"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "300px" }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>E-mail</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id || `${employee.name}-${employee.tel_number}`}
              >
                <TableCell>
                  {employee.name} {employee.last_name}
                </TableCell>
                <TableCell>{employee.type}</TableCell>
                <TableCell>{employee.tel_number}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{renderStatus(employee.isActive)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() =>
                      setSelectedEmployee(employee) || setOpenDeleteModal(true)
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={employeesData?.length + managersData?.length || 0}
        page={currentPage - 1}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
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
            Confirm deletion of this employee?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteEmployee}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
