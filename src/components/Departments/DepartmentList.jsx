import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api.service';
import { useCrud } from '../../hooks/useCrud';
import Modal from '../common/Modal';
import Table from '../../examples/Tables/Table';
import { TextField, Box, Button } from '@mui/material';
import { FilterList } from '@mui/icons-material';

const departmentService = {
  getAll: apiService.getDepartments,
  create: apiService.createDepartment,
  update: apiService.updateDepartment,
  delete: apiService.deleteDepartment,
};

const DepartmentList = () => {
  const { items: departments, loading, error, fetchItems, createItem, updateItem, deleteItem } = useCrud(departmentService);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    manager: '',
    description: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manager: '',
  });

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleOpenModal = (department = null) => {
    if (department) {
      setFormData({
        name: department.name,
        description: department.description,
        manager: department.manager,
      });
      setSelectedDepartment(department);
    } else {
      setFormData({
        name: '',
        description: '',
        manager: '',
      });
      setSelectedDepartment(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
    setFormData({
      name: '',
      description: '',
      manager: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedDepartment) {
        await updateItem(selectedDepartment.id, formData);
      } else {
        await createItem(formData);
      }
      handleCloseModal();
    } catch (err) {
      console.error('Failed to save department:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteItem(id);
      } catch (err) {
        console.error('Failed to delete department:', err);
      }
    }
  };

  const handleFilterChange = (field) => (event) => {
    setFilters({
      ...filters,
      [field]: event.target.value,
    });
  };

  const filteredDepartments = departments.filter((department) => {
    return (
      department.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      department.manager.toLowerCase().includes(filters.manager.toLowerCase()) &&
      department.description.toLowerCase().includes(filters.description.toLowerCase())
    );
  });

  const tableColumns = [
    { name: "name", align: "left" },
    { name: "manager", align: "left" },
    { name: "description", align: "left" },
    { name: "actions", align: "right" },
  ];

  const tableRows = filteredDepartments.map((department) => ({
    name: department.name,
    manager: department.manager,
    description: department.description,
    actions: (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleOpenModal(department)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(department.id)}
        >
          Delete
        </Button>
      </Box>
    ),
  }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <h1 className="text-2xl font-bold">Departments</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
        >
          Add Department
        </Button>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <FilterList sx={{ mr: 1 }} />
          <TextField
            size="small"
            fullWidth
            placeholder="Filter by Name"
            value={filters.name}
            onChange={handleFilterChange('name')}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <FilterList sx={{ mr: 1 }} />
          <TextField
            size="small"
            fullWidth
            placeholder="Filter by Manager"
            value={filters.manager}
            onChange={handleFilterChange('manager')}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <FilterList sx={{ mr: 1 }} />
          <TextField
            size="small"
            fullWidth
            placeholder="Filter by Description"
            value={filters.description}
            onChange={handleFilterChange('description')}
          />
        </Box>
      </Box>

      <Table columns={tableColumns} rows={tableRows} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedDepartment ? 'Edit Department' : 'Add Department'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Manager</label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {selectedDepartment ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </Box>
  );
};

export default DepartmentList; 