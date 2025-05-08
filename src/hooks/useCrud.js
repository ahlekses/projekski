import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useCrud = (service) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('USER_ROLE');
      navigate('/sign-in');
    }
  };

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await service.getAll();
      setItems(response.data);
      setError(null);
    } catch (err) {
      handleAuthError(err);
      setError(err.message);
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  }, [service, navigate]);

  const createItem = useCallback(async (data) => {
    try {
      setLoading(true);
      const response = await service.create(data);
      setItems((prev) => [...prev, response.data]);
      toast.success('Item created successfully');
      return response.data;
    } catch (err) {
      handleAuthError(err);
      setError(err.message);
      toast.error('Failed to create item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, navigate]);

  const updateItem = useCallback(async (id, data) => {
    try {
      setLoading(true);
      const response = await service.update(id, data);
      setItems((prev) => prev.map((item) => (item.id === id ? response.data : item)));
      toast.success('Item updated successfully');
      return response.data;
    } catch (err) {
      handleAuthError(err);
      setError(err.message);
      toast.error('Failed to update item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, navigate]);

  const deleteItem = useCallback(async (id) => {
    try {
      setLoading(true);
      await service.delete(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success('Item deleted successfully');
    } catch (err) {
      handleAuthError(err);
      setError(err.message);
      toast.error('Failed to delete item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, navigate]);

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
}; 