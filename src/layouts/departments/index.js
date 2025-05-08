/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from 'react';
import {
  Card,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { MoreVert as MoreVertIcon, Add as AddIcon } from '@mui/icons-material';
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/accounts/Table";
import api from "api";
import DynamicForm from "components/DynamicForm";
import { ACCESS_TOKEN } from "constants";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');

  const columns = [
    { name: "name", align: "left" },
    { name: "description", align: "left" },
    { name: "created_at", align: "left" },
    { name: "actions", align: "center" },
  ];

  const departmentFields = [
    {
      name: 'name',
      label: 'Department Name',
      type: 'text',
      required: true,
      placeholder: 'Enter department name',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: false,
      placeholder: 'Enter department description',
      gridSize: 12,
    },
  ];

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      console.log('Token used for fetching departments:', token);
      const response = await api.get('/departments/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      if (error.response?.status === 401) {
        // Token is invalid, redirect to login
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = '/sign-in';
      }
    }
  };

  const handleMenuOpen = (event, department) => {
    console.log('Department data received in handleMenuOpen:', department);
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      left: rect.left,
      top: rect.bottom + window.scrollY
    });
    setAnchorEl(event.currentTarget);
    
    // Create a clean copy of the department data
    const departmentData = {
      id: department.id,
      name: department.name,
      description: department.description || ''
    };
    console.log('Setting selected department:', departmentData);
    setSelectedDepartment(departmentData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFormSuccess = async () => {
    try {
      await fetchDepartments();
      setFormOpen(false);
      setSelectedDepartment(null);
    } catch (error) {
      console.error('Error refreshing departments:', error);
    }
  };

  const handleEdit = () => {
    console.log('Handling edit with department:', selectedDepartment);
    if (!selectedDepartment) return;
    
    setFormMode('edit');
    setFormOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log('Handling delete with department:', selectedDepartment);
    if (!selectedDepartment) return;
    
    setFormMode('delete');
    setFormOpen(true);
    handleMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorReference="anchorPosition"
      anchorPosition={menuPosition}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'rgba(17, 25, 42, 0.94)',
          color: 'white',
          minWidth: '120px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      }}
      MenuListProps={{
        sx: {
          py: 0.5,
        }
      }}
    >
      <MenuItem 
        onClick={handleEdit}
        sx={{
          fontSize: '0.875rem',
          py: 1,
          px: 2,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        Edit
      </MenuItem>
      <MenuItem 
        onClick={handleDelete}
        sx={{
          fontSize: '0.875rem',
          py: 1,
          px: 2,
          color: '#dc3545',
          '&:hover': {
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
          }
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );

  const rows = departments.map((department) => ({
    id: department.id,
    name: department.name,
    description: department.description || '',
    created_at: new Date(department.created_at).toLocaleDateString(),
    actions: (
      <IconButton
        onClick={(e) => handleMenuOpen(e, {
          id: department.id,
          name: department.name,
          description: department.description || ''
        })}
        size="small"
        sx={{
          width: 28,
          height: 28,
          borderRadius: '8px',
          color: 'white',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'scale(1.1)',
          }
        }}
      >
        <MoreVertIcon 
          sx={{ 
            color: 'white',
            fontSize: '20px'
          }} 
        />
      </IconButton>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <VuiTypography variant="lg" color="white">
                Departments
              </VuiTypography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setFormMode('create');
                  setSelectedDepartment(null);
                  setFormOpen(true);
                }}
              sx={{
                  backgroundColor: '#0075FF',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#0056b3',
                },
              }}
            >
                Create New
              </Button>
            </VuiBox>
            <Table columns={columns} rows={rows} />
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
      
      {renderMenu}

      {formOpen && (
        <DynamicForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setSelectedDepartment(null);
          }}
          title="Department"
          data={selectedDepartment}
          fields={departmentFields}
          mode={formMode}
          api={{
            endpoint: 'departments',
            id: selectedDepartment?.id,
            post: (url, data) => {
              const token = localStorage.getItem(ACCESS_TOKEN);
              console.log('Token for POST:', token);
              if (!token) {
                throw new Error('No authentication token found');
              }
              return api.post('/departments/', data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });
            },
            put: (url, data) => {
              const token = localStorage.getItem(ACCESS_TOKEN);
              console.log('Token for PUT:', token);
              if (!token) {
                throw new Error('No authentication token found');
              }
              console.log('Updating department with ID:', selectedDepartment.id);
              console.log('Update data:', data);
              return api.put(`/departments/${selectedDepartment.id}/`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              });
            },
            delete: (url) => {
              const token = localStorage.getItem(ACCESS_TOKEN);
              console.log('Token for DELETE:', token);
              if (!token) {
                throw new Error('No authentication token found');
              }
              return api.delete(`/departments/${selectedDepartment.id}/`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
            }
          }}
          onSuccess={handleFormSuccess}
          onError={(error) => {
            console.error('Form Error:', error);
            if (error.response?.status === 401) {
              console.log('Unauthorized, redirecting to login...');
              localStorage.removeItem(ACCESS_TOKEN);
              window.location.href = '/sign-in';
            }
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default Departments;
