import api from '../api';

export const apiService = {
  // User operations
  getUsers: () => api.get('/users/'),
  getUser: (id) => api.get(`/users/${id}/`),
  createUser: (data) => api.post('/users/', data),
  updateUser: (id, data) => api.put(`/users/${id}/`, data),
  deleteUser: (id) => api.delete(`/users/${id}/`),

  // Department operations
  getDepartments: () => api.get('/departments/'),
  getDepartment: (id) => api.get(`/departments/${id}/`),
  createDepartment: (data) => api.post('/departments/', data),
  updateDepartment: (id, data) => api.put(`/departments/${id}/`, data),
  deleteDepartment: (id) => api.delete(`/departments/${id}/`),

  // Evaluation operations
  getEvaluations: () => api.get('/evaluations/'),
  getEvaluation: (id) => api.get(`/evaluations/${id}/`),
  createEvaluation: (data) => api.post('/evaluations/', data),
  updateEvaluation: (id, data) => api.put(`/evaluations/${id}/`, data),
  deleteEvaluation: (id) => api.delete(`/evaluations/${id}/`),
  getMyEvaluations: () => api.get('/evaluations/my_evaluations/'),
  getEvaluationsGiven: () => api.get('/evaluations/evaluations_given/'),

  // Factor operations
  getFactors: () => api.get('/factors/'),
  getFactor: (id) => api.get(`/factors/${id}/`),
  createFactor: (data) => api.post('/factors/', data),
  updateFactor: (id, data) => api.put(`/factors/${id}/`, data),
  deleteFactor: (id) => api.delete(`/factors/${id}/`),

  // Turnover operations
  getTurnovers: () => api.get('/turnovers/'),
  getTurnover: (id) => api.get(`/turnovers/${id}/`),
  createTurnover: (data) => api.post('/turnovers/', data),
  updateTurnover: (id, data) => api.put(`/turnovers/${id}/`, data),
  deleteTurnover: (id) => api.delete(`/turnovers/${id}/`),

  // Training operations
  getTrainings: () => api.get('/trainings/'),
  getTraining: (id) => api.get(`/trainings/${id}/`),
  createTraining: (data) => api.post('/trainings/', data),
  updateTraining: (id, data) => api.put(`/trainings/${id}/`, data),
  deleteTraining: (id) => api.delete(`/trainings/${id}/`),

  // Forms operations
  getForms: () => api.get('/forms/'),
  getForm: (id) => api.get(`/forms/${id}/`),
  createForm: (data) => api.post('/forms/', data),
  updateForm: (id, data) => api.put(`/forms/${id}/`, data),
  deleteForm: (id) => api.delete(`/forms/${id}/`),

  // Questions operations
  getQuestions: () => api.get('/questions/'),
  getQuestion: (id) => api.get(`/questions/${id}/`),
  createQuestion: (data) => api.post('/questions/', data),
  updateQuestion: (id, data) => api.put(`/questions/${id}/`, data),
  deleteQuestion: (id) => api.delete(`/questions/${id}/`),
}; 