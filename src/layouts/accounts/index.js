import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Card,
  IconButton,
  Menu,
  MenuItem,
  Button,} from '@mui/material';
import { MoreVert as MoreVertIcon, Add as AddIcon } from '@mui/icons-material';
import VuiBox from "components/VuiBox";
import VuiTypography from 'components/VuiTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import api from 'api';
import { ACCESS_TOKEN } from 'constants';
import Actionskie from '../../components/Actionskie';
import DynamicForm from 'components/DynamicForm';

function Accounts() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [auth_group, setAuth_group] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');

  useEffect(() => {
    
    fetchDepartments();
    fetchUsers();
     fetchGroups();
  }, []);

  const fetchDepartments = async () => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const response = await api.get('/departments/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDepartments(response.data); // Assume response is a list of departments
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
};

const fetchGroups = async () => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const response = await api.get('/groups/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAuth_group(response.data); // Assume response is a list of departments
  } catch (error) {
    console.error('Error fetching groups:', error);
  }
};

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const response = await api.get('/users/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = '/sign-in';
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setFormMode('delete');
    setFormOpen(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setFormMode('view');
    setFormOpen(true);
  };

  const handleFormSuccess = async () => {
    await fetchUsers();
    setFormOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
     {
      field: 'username',
      headerName: 'Username',
      width: 150,
      editable: true,
    },
    
    {
      field: 'first_name',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'mid_name',
      headerName: 'Middle Name',
      width: 150,
      editable: true,
    },
    {
      field: 'last_namext',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
     
    {
      field: 'position',
      headerName: 'Position',
      width: 150,
      editable: true,
    },
     {
      field: 'appointment',
      headerName: 'Appointment',
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

  const rows = users.map((user) => ({
    id: user.id,
    username: user.username,
    password: user.password,
    first_name: user.profile?.first_name ?? '',
    mid_name: user.profile?.mid_name ?? '',
    last_namext: user.profile?.last_name + ' ' + user.profile?.ext_name ?? '',
    last_name: user.profile?.last_name ?? '',
    ext_name: user.profile?.ext_name ?? '',
    position: user.profile?.position ?? '',
    appointment: user.profile?.appointment ?? '',
     department: user.profile?.department?.id ?? user.profile?.department ?? '',
  auth_group: user.profile?.group_ids?.[0]?.id ?? '',


  }));

 const userFields = useMemo(() => [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
    placeholder: 'Enter user name',
  },
  {
    name: 'password',
    label: 'Reset Password',
    type: 'text',
    required: true,
    placeholder: 'Enter new password',
  },
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter first name',
  },
  {
    name: 'mid_name',
    label: 'Middle Name',
    type: 'text',
    required: true,
    placeholder: 'Enter middle name',
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter last name',
  },
  {
    name: 'ext_name',
    label: 'Extension Name',
    type: 'text',
    required: true,
    placeholder: 'Enter extension name',
  },
  {
    name: 'position',
    label: 'Position',
    type: 'text',
    required: true,
    placeholder: 'Enter position',
  },
  {
    name: 'appointment',
    label: 'Appointment',
    type: 'text',
    required: true,
    placeholder: 'Enter appointment',
  },
  {
    name: 'department',
    label: 'Department',
    type: 'select',
    required: true,
    options: departments.map((dept) => ({
      value: dept.id,
      label: dept.name,
    })),
  },
  {
    name: 'auth_group',
    label: 'Role',
    type: 'select',
    required: true,
    options: auth_group.map((group) => ({
      value: group.id,
      label: group.name,
    })),
  },
], [departments, auth_group]); // <- ✅ Fix here

  console.log('Roles:', auth_group);
console.log('Selected User Department:', selectedUser?.profile?.auth_group);
console.log('Mapped Options:', userFields.find(f => f.name === 'auth_group')?.options);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb="22px"
            >
              <VuiTypography variant="lg" color="white">
                User Accounts List
              </VuiTypography>

               <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setFormMode('create');
                  setSelectedUser(null);
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
            setSelectedUser(null);
          }}
          fields={userFields}
          title="User"
          data={selectedUser}
          
          mode={formMode}
          api={{
            endpoint: 'users',
            id: selectedUser?.id,
            post: (url, data) => {
              const token = localStorage.getItem(ACCESS_TOKEN);
              if (!token) {
                throw new Error('No authentication token found');
              }
              return api.post('/users/', data, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });
            },
            put: (url, data) => {
              const token = localStorage.getItem(ACCESS_TOKEN);
              if (!token) {
                throw new Error('No authentication token found');
              }
              return api.put(`/users/${selectedUser.id}/`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });
            },
            delete: (url) => {
              const token = localStorage.getItem(ACCESS_TOKEN);
              if (!token) {
                throw new Error('No authentication token found');
              }
              return api.delete(`/users/${selectedUser.id}/`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            },
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

export default Accounts;
