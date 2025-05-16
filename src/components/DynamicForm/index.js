import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
  Grid,
  IconButton,
  Select,
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
      if ((mode === 'edit' || mode === 'delete' || mode === 'view') && data) {
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

    if (api && api.get) {
      loadForeignKeyData();
    }
  }, [fields, api]);

  const handleChange = (e) => {
    if (mode === 'delete') return;

    const { name, type, files, value } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 🔐 Prevent submitting in view mode
    if (mode === 'view') {
      onClose();
      return;
    }

    try {
      const submitData = { ...formData };

      if (mode === 'edit' || mode === 'delete') {
        delete submitData.id;
        delete submitData.created_at;
      }

      let response;
      if (mode === 'create') {
        response = await api.post(api.endpoint, submitData);
      } else if (mode === 'edit') {
        response = await api.put(api.endpoint, submitData);
      } else if (mode === 'delete') {
        response = await api.delete(api.endpoint);
      }

      if (onSuccess) await onSuccess();
      onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.detail ||
                            err.response?.data?.message ||
                            err.message ||
                            'An error occurred';
      setError(errorMessage);
      setLoading(false);
      if (err.response?.status === 401 && onError) {
        onError(err);
      }
    }

    setLoading(false);
  };

  // Modern gradient styles
  const modernGradientStyle = {
    background: 'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
    borderRadius: '10px',
    border: 'none',
    position: 'relative',
    overflow: 'hidden',
    padding: '1px',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)',
      borderRadius: '10px',
      zIndex: -1,
    }
  };

  const modernInputStyle = {
    color: 'white',
    fontSize: { xs: '0.875rem', sm: '0.925rem', md: '1rem' }, // Responsive font size
    padding: { xs: '8px 12px', sm: '10px 14px', md: '12px 16px' }, // Responsive padding
    background: 'rgba(11, 20, 55, 0.5)',
    border: '1px solid rgba(226, 232, 240, 0.3)',
    borderRadius: '8px',
    transition: 'all 0.2s ease-in-out',
    backdropFilter: 'blur(4px)',
    '&:focus': {
      borderColor: '#0075FF',
      boxShadow: '0 0 0 2px rgba(0, 117, 255, 0.2)',
    },
    '&.Mui-disabled': {
      color: 'rgba(255, 255, 255, 0.5)',
      WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
      opacity: 0.7,
    }
  };

  const renderField = (field) => {
    const value = formData[field.name] ?? '';
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <VuiBox mb={2} key={field.name}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography 
                component="label" 
                variant="button" 
                color="white" 
                fontWeight="medium"
                sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' } 
                }}
              >
                {field.label}
              </VuiTypography>
            </VuiBox>
            <VuiInput
              type={field.type}
              name={field.name}
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              fullWidth
              disabled={mode === 'delete' || mode === 'view'}
              sx={modernInputStyle}
            />
          </VuiBox>
        );

      case 'select':
        return (
          <VuiBox mb={2} key={field.name}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography 
                component="label" 
                variant="button" 
                color="white" 
                fontWeight="medium"
                sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' } 
                }}  
              >
                {field.label}
              </VuiTypography>
            </VuiBox>
            <FormControl fullWidth>
              <Select
                name={field.name}
                value={value}
                onChange={handleChange}
                required={field.required}
                disabled={mode === 'delete' || mode === 'view'}
                displayEmpty
                sx={{
                  ...modernInputStyle,
                  color: 'white',
                  '& .MuiSelect-select': {
                    color: 'white',
                    fontSize: { xs: '0.875rem', sm: '0.925rem', md: '1rem' },
                    padding: { xs: '8px 12px', sm: '10px 14px', md: '12px 16px' },
                  },
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  }
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'rgba(17, 25, 42, 0.95)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                      '& .MuiMenuItem-root': {
                        color: 'white',
                        fontSize: { xs: '0.875rem', sm: '0.925rem', md: '1rem' },
                        padding: '8px 16px',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 117, 255, 0.1)',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(0, 117, 255, 0.2)',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 117, 255, 0.3)',
                          }
                        }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="" disabled>
                  Select {field.label}
                </MenuItem>
                {field.options && field.options.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                {foreignKeys[field.name]?.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option[field.foreignKey.displayField]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </VuiBox>
        );

      default:
        return null;
    }
  };

  const modeLabel = {
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
  }[mode] || '';

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(10, 16, 35, 0.97)',
          backgroundImage: 'none',
          borderRadius: '15px',
          boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <DialogTitle>
        <VuiBox display="flex" justifyContent="space-between" alignItems="center">
          <VuiTypography 
            variant="h5" 
            color="white"
            sx={{ fontSize: { xs: '1.25rem', sm: '1.375rem', md: '1.5rem' } }}
          >
            {modeLabel} {title}
          </VuiTypography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
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
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button 
          onClick={onClose} 
          sx={{ 
            color: 'white',
            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
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
            backgroundColor:
              mode === 'delete' ? '#dc3545' :
              mode === 'view' ? '#6c757d' :
              '#0075FF',
            color: 'white',
            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
            padding: { xs: '6px 12px', sm: '8px 16px', md: '8px 20px' },
            boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
            '&:hover': {
              backgroundColor:
                mode === 'delete' ? '#c82333' :
                mode === 'view' ? '#5a6268' :
                '#0056b3',
              boxShadow: '0 6px 15px 0 rgba(0, 0, 0, 0.35)',
            },
          }}
        >
          {loading
            ? 'Processing...'
            : mode === 'create'
            ? 'Create'
            : mode === 'edit'
            ? 'Save Changes'
            : mode === 'view'
            ? 'Close'
            : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicForm;