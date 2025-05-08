import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api.service';
import { useCrud } from '../../hooks/useCrud';
import Modal from '../common/Modal';

const evaluationService = {
  getAll: apiService.getEvaluations,
  create: apiService.createEvaluation,
  update: apiService.updateEvaluation,
  delete: apiService.deleteEvaluation,
};

const EvaluationList = () => {
  const { items: evaluations, loading, error, fetchItems, createItem, updateItem, deleteItem } = useCrud(evaluationService);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [formData, setFormData] = useState({
    user: '',
    evaluator: '',
    rating: '',
    comments: '',
  });

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleOpenModal = (evaluation = null) => {
    if (evaluation) {
      setFormData({
        user: evaluation.user,
        evaluator: evaluation.evaluator,
        rating: evaluation.rating,
        comments: evaluation.comments,
      });
      setSelectedEvaluation(evaluation);
    } else {
      setFormData({
        user: '',
        evaluator: '',
        rating: '',
        comments: '',
      });
      setSelectedEvaluation(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvaluation(null);
    setFormData({
      user: '',
      evaluator: '',
      rating: '',
      comments: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEvaluation) {
        await updateItem(selectedEvaluation.id, formData);
      } else {
        await createItem(formData);
      }
      handleCloseModal();
    } catch (err) {
      console.error('Failed to save evaluation:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this evaluation?')) {
      try {
        await deleteItem(id);
      } catch (err) {
        console.error('Failed to delete evaluation:', err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Evaluations</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Evaluation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evaluations.map((evaluation) => (
          <div key={evaluation.id} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">
              User: {evaluation.user}
            </h3>
            <p className="text-gray-600 mb-2">Evaluator: {evaluation.evaluator}</p>
            <p className="text-gray-600 mb-2">Rating: {evaluation.rating}</p>
            <p className="text-gray-600 mb-4">Comments: {evaluation.comments}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleOpenModal(evaluation)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(evaluation.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedEvaluation ? 'Edit Evaluation' : 'Add Evaluation'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">User</label>
            <input
              type="text"
              value={formData.user}
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Evaluator</label>
            <input
              type="text"
              value={formData.evaluator}
              onChange={(e) => setFormData({ ...formData, evaluator: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Comments</label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
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
              {selectedEvaluation ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EvaluationList; 