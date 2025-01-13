import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  Paper,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import useLocalStorage from '../../hooks/useLocalStorage';

export default function AuthForm() {
  const localstorage = useLocalStorage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 0) {
      const user = localstorage.getValue('user');
      if (!user) {
        alert('Usuário não encontrado!');
        setFormData({ email: '', password: '', confirmPassword: '' });
        return;
      }
      if(user.email != formData.email || user.password != formData.password) {
        alert('Usuário ou senha inválidos!');
        return;
      }

      localstorage.setValue('isLoggedIn', true);
      alert('Sucesso!');
      navigate('/');
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('As senhas são diferentes!');
        return;
      }
      localstorage.setValue('user', { email: formData.email, password: formData.password });
      localstorage.setValue('isLoggedIn', true);
      alert('Usuário criado!');
      navigate('/');
    }
  };

  return (
    <Paper elevation={0} sx={{ background: 'transparent', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', alignItemscenter: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" align="center" fontFamily={'Roboto'} fontWeight={'bold'} color={'primary'} margin={2}>
        GeoConnect
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Entrar" />
        <Tab label="Criar Conta" />
      </Tabs>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '2rem' }}
      >
        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <TextField
          label="Senha"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          fullWidth
          required
        />

        {activeTab === 1 && (
          <TextField
            label="Confirmar Senha"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            type="password"
            fullWidth
            required
          />
        )}

        <Button variant="contained" type="submit" fullWidth>
          {activeTab === 0 ? 'Entrar' : 'Criar Conta'}
        </Button>
      </Box>
    </Paper>
  );
}
