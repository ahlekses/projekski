import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Card,
  IconButton,
  Menu,
  MenuItem,
  Button,} from '@mui/material';
import { MoreVert as MoreVertIcon, Add as AddIcon } from '@mui/icons-material';


import Icon from "@mui/material/Icon";

import { BsCheckCircleFill } from "react-icons/bs";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/emptraining/data/projectsTableData";
import Projects from "layouts/dashboard/components/Projects";
function Tables() {
  const [users, setUsers] = useState([]);
  const [trainings, settrainings] = useState([]);

  const [selectedTraining, setselectedTraining] = useState(null);
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



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
         
          </Card>
        </VuiBox>
       
      
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
