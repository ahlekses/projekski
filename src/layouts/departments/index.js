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

import Actionskie from 'components/Actionskie';
import DynamicForm from 'components/DynamicForm';

import { DataGrid } from '@mui/x-data-grid';
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
import { ACCESS_TOKEN } from "constants";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');

const handleEdit = (department) => {
    setSelectedDepartment(department);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleDelete = (department) => {
    setSelectedDepartment(department);
    setFormMode('delete');
    setFormOpen(true);
  };

  const handleView = (department) => {
    setSelectedDepartment(department);
    setFormMode('view');
    setFormOpen(true);
  };

  const handleFormSuccess = async () => {
    await fetchDepartments();
    setFormOpen(false);
    setSelectedDepartment(null);
  };

 const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
     {
      field: 'name',
      headerName: 'Department Name',
      width: 150,
      editable: true,
    },

    {
      field: 'description',
      headerName: 'Department Description',
      width: 150,
      editable: true,
    },
    
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params) => (
        <Actionskie
          onEdit={() => handleEdit(params.row)}
          onDelete={() => handleDelete(params.row)}
          onView={() => handleView(params.row)}
        />
      ),
    },
  ];

  const rows = departments.map((department) => ({
    id: department.id,
    name: department.name,
     description: department.description,
    
  }));

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
             <VuiBox
                         sx={{
                           height: 400,
                           width: '100%',
                           '& .MuiDataGrid-root': {
                             border: 'none',
                             color: 'white',
                           },
                         }}
                       >
                         <DataGrid
                           rows={rows}
                           columns={columns}
                           pageSize={5}
                           rowsPerPageOptions={[5]}
                           disableSelectionOnClick
           
                           sx={{
                           
                             '& .MuiDataGrid-columnHeaders': {
                              borderBottom: '0.0625rem solid #2d3748',
                             },
                             '& .MuiDataGrid-columnHeaderTitle': {
                               color: '#fff',
                               fontWeight: 'bold',
                             },
                             '& .MuiDataGrid-cell': {
                               color: '#a0aec0',
                                 borderBottom: 'none',
                             },
                             '& .MuiDataGrid-cell.Mui-selected': {
                               color: '#222',
                               backgroundColor: '#222',
                                 borderBottom: 'none',
                             },
                             '& .MuiDataGrid-cell:focus': {
                               outline: '#222',
                             },
                             '& .MuiDataGrid-footerContainer': {
                               
                               color: '#fff',
                                 borderTop: '0.0625rem solid #2d3748',
                             },
                             '& .MuiTablePagination-root': {
                               color: '#fff',
                             },
                             '& .MuiInputBase-root': {
                             
                             },
                             '& .MuiSvgIcon-root': {
                               color: '#a0aec0',
                             },
                             '& .MuiTablePagination-selectIcon': {
                               color: '#fff',
                             },
           
                             
                           }}
                         />
                       </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
      

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
