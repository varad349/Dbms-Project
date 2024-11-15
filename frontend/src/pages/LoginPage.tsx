import React, { useState, ChangeEvent, FormEvent } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Updated import
export {}; // This makes the file a module
const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await loginUser(formData);
      localStorage.setItem('access_token', response.access_token); // Save token to localStorage
      setSuccess('Login successful!');
      setTimeout(() => navigate('/'), 2000); // Use navigate instead of history.push
    } catch (err: any) {
      setError(err.detail || 'Invalid credentials.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default LoginPage;
