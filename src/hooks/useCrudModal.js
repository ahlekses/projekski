// hooks/useCrudModal.js
import { useState } from 'react';
import axios from 'axios';

const useCrudModal = (endpoint) => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState('create');
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const openModal = (mode = 'create', item = null) => {
    setAction(mode);
    setCurrentItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };

  const handleCreate = async (formData, callbacks = {}) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/${endpoint}/`, formData);
      setLoading(false);
      closeModal();
      if (callbacks.onSuccess) callbacks.onSuccess(response.data);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || 'An error occurred');
      if (callbacks.onError) callbacks.onError(err);
      throw err;
    }
  };

  const handleUpdate = async (id, formData, callbacks = {}) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/${endpoint}/${id}/`, formData);
      setLoading(false);
      closeModal();
      if (callbacks.onSuccess) callbacks.onSuccess(response.data);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || 'An error occurred');
      if (callbacks.onError) callbacks.onError(err);
      throw err;
    }
  };

  const handleDelete = async (id, callbacks = {}) => {
    setLoading(true);
    try {
      await axios.delete(`/api/${endpoint}/${id}/`);
      setLoading(false);
      if (callbacks.onSuccess) callbacks.onSuccess();
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || 'An error occurred');
      if (callbacks.onError) callbacks.onError(err);
      throw err;
    }
  };

  return {
    modalState: {
      isOpen,
      action,
      currentItem,
      loading,
      error
    },
    modalActions: {
      openModal,
      closeModal,
      handleCreate,
      handleUpdate,
      handleDelete,
      setError
    }
  };
};

export default useCrudModal;