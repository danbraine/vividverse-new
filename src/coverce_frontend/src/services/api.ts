const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper to get auth token
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

// Auth
export const register = async (email: string, password: string, username?: string) => {
  const data = await apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, username }),
  });
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const login = async (email: string, password: string) => {
  const data = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getMe = async () => {
  return apiCall('/auth/me');
};

// Scripts
export const submitScript = async (
  title: string,
  format: 'PDF' | 'Fountain' | 'Text',
  content: Uint8Array,
  summary?: string
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('format', format);
  formData.append('file', new Blob([content]), 'script');
  if (summary) {
    formData.append('summary', summary);
  }

  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/scripts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to submit script' }));
    throw new Error(error.error || 'Failed to submit script');
  }

  const data = await response.json();
  return data.ok;
};

export const getScript = async (scriptId: number) => {
  const data = await apiCall(`/scripts/${scriptId}`);
  return data.ok;
};

export const getPendingScripts = async () => {
  return apiCall('/scripts/pending');
};

export const getAllScripts = async () => {
  return apiCall('/scripts');
};

// Validations
export const registerValidator = async () => {
  return apiCall('/validations/register', { method: 'POST' });
};

export const isValidator = async (userId: string) => {
  return apiCall(`/validations/validator/${userId}`);
};

export const submitValidation = async (
  scriptId: number,
  scores: Array<{ category: string; score: number }>,
  comments?: string
) => {
  const data = await apiCall(`/validations/${scriptId}`, {
    method: 'POST',
    body: JSON.stringify({ scores, comments }),
  });
  return data.ok;
};

export const getValidations = async (scriptId: number) => {
  return apiCall(`/validations/${scriptId}`);
};

export const getAggregatedScore = async (scriptId: number) => {
  const data = await apiCall(`/validations/${scriptId}/score`);
  return data.ok;
};

export const getTopScript = async () => {
  return apiCall('/validations/top');
};

// Movies
export const startMovieGeneration = async (scriptId: number) => {
  const data = await apiCall(`/movies/${scriptId}/generate`, { method: 'POST' });
  return data.ok;
};

export const getMovie = async (scriptId: number) => {
  const data = await apiCall(`/movies/${scriptId}`);
  return data.ok;
};

