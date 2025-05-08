import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api.service';
import { useCrud } from '../../hooks/useCrud';
import Modal from '../common/Modal';
import Table from '../../examples/Tables/Table';
import { Box, Button, Card } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DynamicForm from 'components/DynamicForm';
import FormDetail from "./formdetails";
import FormBuilder  from "./FormBuilder";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import { Modal as MuiModal } from '@mui/material';


const formsService = {
  getAll: apiService.getForms,
  create: apiService.createForm,
  update: apiService.updateForm,
  delete: apiService.deleteForm,
};

const formFields = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
    placeholder: 'Enter form title',
  },
  {
    name: 'instructions',
    label: 'Instructions',
    type: 'text',
    required: true,
    placeholder: 'Enter instructions',
  },
  {
    name: 'hr_id',
    label: 'HR',
    type: 'select',
    required: true,
    foreignKey: {
      endpoint: '/hr/',
      displayField: 'name',
    },
    placeholder: 'Select HR',
    noGradient: true,
  },
  {
    name: 'dept_id',
    label: 'Department',
    type: 'select',
    required: true,
    foreignKey: {
      endpoint: '/departments/',
      displayField: 'name',
    },
    placeholder: 'Select Department',
    noGradient: true,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'checkbox',
    required: false,
    placeholder: '',
  },
];

const FormsList = () => {
  const { items: forms, loading, error, fetchItems, createItem, updateItem, deleteItem } = useCrud(formsService);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formMode, setFormMode] = useState('create');
  const [formData, setFormData] = useState({ title: '', instructions: '', status: false });

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleOpenModal = (form = null) => {
    if (form) {
      setFormData({
        title: form.title || '',
        instructions: form.instructions || '',
        hr_id: form.hr_id || '',
        dept_id: form.dept_id || '',
        status: !!form.status,
      });
      setSelectedForm(form);
      setFormMode('edit');
    } else {
      setFormData({
        title: '',
        instructions: '',
        hr_id: '',
        dept_id: '',
        status: false,
      });
      setSelectedForm(null);
      setFormMode('create');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedForm(null);
    setFormMode('create');
    setFormData({
      title: '',
      instructions: '',
      hr_id: '',
      dept_id: '',
      status: false,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'edit' && selectedForm) {
        await updateItem(selectedForm.id, formData);
      } else {
        await createItem(formData);
      }
      handleCloseModal();
    } catch (err) {
      console.error('Form operation failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await deleteItem(id);
      } catch (err) {
        console.error('Failed to delete form:', err?.message || err);
      }
    }
  };

  const tableColumns = [
    { name: "title", align: "left" },
    { name: "description", align: "left" },
    { name: "actions", align: "right" },
  ];

  const tableRows = forms.map((form) => ({
    title: form.title,
    description: form.description,
    actions: (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleOpenModal(form)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(form.id)}
        >
          Delete
        </Button>
      </Box>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card sx={{ borderRadius: 4, background: 'rgba(17, 25, 42, 0.94)', boxShadow: '0px 4px 32px rgba(0,0,0,0.12)' }}>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <VuiTypography variant="lg" color="white">
                Forms
              </VuiTypography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenModal()}
                sx={{
                  backgroundColor: '#0075FF',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#0056b3',
                  },
                }}
              >
                Add Form
              </Button>
            </VuiBox>
            <VuiBox px={3} pb={3}>
              <Table columns={tableColumns} rows={tableRows} />
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
      <MuiModal
  open={isModalOpen}
  onClose={handleCloseModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    }
  }}
>
<div style={{ width: '90%', maxWidth: '1200px', maxHeight: '90vh', overflow: 'hidden' }}>
    <FormBuilder 
      initialData={selectedForm} 
      mode={formMode}
      onSubmit={(formData) => {
        if (formMode === 'edit') {
          updateItem(selectedForm.id, formData);
        } else {
          createItem(formData);
        }
        handleCloseModal();
      }}
    />
  </div>
</MuiModal>
    </DashboardLayout>
  );
};

export default FormsList; 