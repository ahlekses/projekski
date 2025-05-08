import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import GradientBorder from "examples/GradientBorder";

const DynamicForm = ({
  open,
  onClose,
  title,
  data,
  fields,
  onSubmit,
  mode = 'create', // 'create', 'edit', or 'delete'
  api,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foreignKeys, setForeignKeys] = useState({});

  // Reset form when opening/closing
  useEffect(() => {
    if (open) {
      if ((mode === 'edit' || mode === 'delete') && data) {
        console.log(`Setting ${mode} mode data:`, data);
        setFormData(data);
      } else {
        console.log('Setting create mode data');
        const initialData = {};
        fields.forEach(field => {
          initialData[field.name] = '';
        });
        setFormData(initialData);
      }
    }
  }, [open, data, mode, fields]);

  useEffect(() => {
    // Load foreign key data for select fields
    const loadForeignKeyData = async () => {
      const fkData = {};
      for (const field of fields) {
        if (field.type === 'select' && field.foreignKey) {
          try {
            const response = await api.get(field.foreignKey.endpoint);
            fkData[field.name] = response.data;
          } catch (err) {
            console.error(`Error loading ${field.name} data:`, err);
          }
        }
      }
      setForeignKeys(fkData);
    };

    loadForeignKeyData();
  }, [fields, api]);

  const handleChange = (e) => {
    if (mode === 'delete') return; // Prevent changes in delete mode
    const { name, value } = e.target;
    console.log(`Field ${name} changed to:`, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submitData = { ...formData };
      if (mode === 'edit' || mode === 'delete') {
        // Remove id and created_at from form data before submission
        delete submitData.id;
        delete submitData.created_at;
      }
      
      console.log(`${mode} department with data:`, submitData);

      let response;
      try {
        if (mode === 'create') {
          response = await api.post(api.endpoint, submitData);
        } else if (mode === 'edit') {
          response = await api.put(api.endpoint, submitData);
        } else if (mode === 'delete') {
          response = await api.delete(`/departments/${data.id}/`);
        }
        console.log('API Response:', response);
      } catch (apiError) {
        console.error('API Error:', apiError);
        console.error('API Error Response:', apiError.response);
        throw apiError;
      }

      // Wait for the success callback to complete
      if (onSuccess) {
        await onSuccess();
      }
      
      // Only close if successful
      onClose();
    } catch (err) {
      console.error('Form Error:', err);
      const errorMessage = err.response?.data?.detail || 
                         err.response?.data?.message ||
                         err.message || 
                         'An error occurred';
      setError(errorMessage);
      // Keep the form open on error
      setLoading(false);
      if (err.response?.status === 401) {
        // Let the parent component handle the 401 error
        if (onError) {
          onError(err);
        }
      }
      return;
    }
    
    setLoading(false);
  };

  const renderField = (field) => {
    const value = formData[field.name] ?? '';
    console.log(`Rendering field ${field.name} with value:`, value);
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <VuiBox mb={2} key={field.name}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                {field.label}
              </VuiTypography>
            </VuiBox>
            <GradientBorder>
              <VuiInput
                type={field.type}
                name={field.name}
                value={value}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                fullWidth
                disabled={mode === 'delete'}
                sx={{
                  color: 'white',
                  '& .MuiInputBase-input': {
                    color: 'white',
                    '&.Mui-disabled': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
                    }
                  }
                }}
              />
            </GradientBorder>
          </VuiBox>
        );

      case 'select':
        return (
          <VuiBox mb={2} key={field.name}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                {field.label}
              </VuiTypography>
            </VuiBox>
            <GradientBorder>
              <FormControl fullWidth>
                <Select
                  name={field.name}
                  value={value}
                  onChange={handleChange}
                  required={field.required}
                  disabled={mode === 'delete'}
                  sx={{
                    color: 'white',
                    '& .MuiSelect-icon': {
                      color: 'white',
                    },
                    '&.Mui-disabled': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
                    }
                  }}
                >
                  {foreignKeys[field.name]?.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option[field.foreignKey.displayField]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </GradientBorder>
          </VuiBox>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(17, 25, 42, 0.94)',
          backgroundImage: 'none',
          borderRadius: '15px',
          boxShadow: '0 0 2rem 0 rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <DialogTitle>
        <VuiBox display="flex" justifyContent="space-between" alignItems="center">
          <VuiTypography variant="h5" color="white">
            {mode === 'create' ? `Create New ${title}` : mode === 'edit' ? `Edit ${title}` : `Delete ${title}`}
          </VuiTypography>
          <IconButton onClick={onClose} color="inherit">
            <CloseIcon />
          </IconButton>
        </VuiBox>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {fields.map(field => (
              <Grid item xs={12} md={field.gridSize || 6} key={field.name}>
                {renderField(field)}
              </Grid>
            ))}
          </Grid>
          {error && (
            <VuiBox mt={2}>
              <VuiTypography variant="button" color="error" fontWeight="medium">
                {error}
              </VuiTypography>
            </VuiBox>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          sx={{ 
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: mode === 'delete' ? '#dc3545' : '#0075FF',
            color: 'white',
            '&:hover': {
              backgroundColor: mode === 'delete' ? '#c82333' : '#0056b3',
            },
          }}
        >
          {loading ? 'Processing...' : mode === 'create' ? 'Create' : mode === 'edit' ? 'Save Changes' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicForm; 