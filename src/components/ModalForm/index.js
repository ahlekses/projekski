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
    const getFormData = async () => {
      const response = await axios.get("/api/forms/" + formId);
      const { name, sections } = response.data;
      setFormName(name);
      setSections(sections);
    };
    if (formId) getFormData();
  }, [formId]);

  

  const handleAddSection = () => {
    const newSection = {
      name: "",
      form_fields: [],
    };
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections.splice(sectionIndex, 1);
    setSections(updatedSections);
  };

  const handleSectionNameChange = (e, sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].name = e.target.value;
    setSections(updatedSections);
  };

  const handleFieldChange = (e, sectionIndex, fieldIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields[fieldIndex][e.target.name] =
      e.target.value;
    setSections(updatedSections);
  };

  const handleAddField = (sectionIndex) => {
    const newField = {
      label: "",
      field_type: "text",
      choices: [],
    };
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields.push(newField);
    setSections(updatedSections);
  };

  const handleDeleteField = (sectionIndex, fieldIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields.splice(fieldIndex, 1);
    setSections(updatedSections);
  };

  const handleAddOption = (sectionIndex, fieldIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields[fieldIndex].choices.push({});
    setSections(updatedSections);
  };

  const handleOptionChange = (e, sectionIndex, fieldIndex, optionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields[fieldIndex].choices[optionIndex] =
      { choice_text: e.target.value };
    setSections(updatedSections);
  };

  const handleDeleteOption = (sectionIndex, fieldIndex, optionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].form_fields[fieldIndex].choices.splice(
      optionIndex,
      1
    );
    setSections(updatedSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formName,
      sections: sections,
    };
    console.log(data);
    if (formId) {
      axios.put(`/api/forms/${formId}/`, data).then((response) => {
        console.log("Form Updated Successfully");
        navigate("/");
      });
    } else {
      axios.post(`/api/forms/`, data).then((response) => {
        console.log("Form Created Successfully");
        setFormName("");
        setSections([]);
        navigate("/");
      });
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
           Create
          </VuiTypography>
          <IconButton onClick={onClose} color="inherit">
            <CloseIcon />
          </IconButton>
        </VuiBox>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
           
              <Grid item xs={12} md={field.gridSize || 6} key="formName">
               Form Name
              </Grid>
          


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