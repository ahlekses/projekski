import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import VuiButton from "components/VuiButton";
import { Input, Checkbox, Select, MenuItem } from "@mui/material";
import axios from "axios";

const CrudModal = ({
  open,
  handleClose,
  title,
  endpoint,
  action = "create",
  currentData = {},
  onSuccess,
  requestOptions = {},
  fieldOverrides = {},
}) => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const loadFields = async () => {
      setLoading(true);
      setError(null);
      try {
        if (action === "edit" && Object.keys(currentData).length > 0) {
          setFormData({ ...currentData });
        } else {
          setFormData({});
        }

        const res = await axios.options(`/api/${endpoint}/`, {
          ...requestOptions,
          signal: controller.signal,
        });
        const metadata = res.data.actions[action.toUpperCase()] || {};
        const fieldsArray = Object.entries(metadata)
          .map(([name, meta]) => ({
            name,
            ...meta,
            ...fieldOverrides[name],
          }))
          .filter((field) => !field.hidden);

        setFormFields(fieldsArray);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err);
          setError("Failed to load form metadata.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadFields();
    return () => controller.abort();
  }, [open, endpoint, action, currentData, requestOptions, fieldOverrides]);

  useEffect(() => {
    setFormData((prev) => {
      const updated = { ...prev };
      formFields.forEach((f) => {
        if (f.type === "boolean" && !(f.name in updated)) {
          updated[f.name] = false;
        }
      });
      return updated;
    });
  }, [formFields]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/api/${endpoint}/${action === "edit" ? currentData.id + "/" : ""}`;
    const method = action === "edit" ? "put" : "post";

    try {
      const res = await axios[method](url, formData, requestOptions);
      onSuccess(res.data);
      handleClose();
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case "boolean":
        return (
          <Checkbox
            key={field.name}
            name={field.name}
            checked={formData[field.name] || false}
            onChange={handleChange}
          />
        );
      case "choice":
        return (
          <Select
            key={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            fullWidth
          >
            {field.choices.map(([val, label]) => (
              <MenuItem key={val} value={val}>
                {label}
              </MenuItem>
            ))}
          </Select>
        );
      default:
        return (
          <Input
            key={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            type={field.type || "text"}
            placeholder={field.label || field.name}
            fullWidth
          />
        );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {action === "create" ? `Create ${title}` : `Edit ${title}`}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {loading
            ? "Loading..."
            : formFields.map((field) => (
                <div key={field.name} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 4 }}>
                    {field.label}
                  </label>
                  {renderField(field)}
                </div>
              ))}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <VuiButton onClick={handleClose} color="secondary">
            Cancel
          </VuiButton>
          <VuiButton type="submit" color="info">
            {action === "create" ? "Create" : "Update"}
          </VuiButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CrudModal;
