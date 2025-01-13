import { useState, useContext  } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import ContactsContext from '../../contexts/ContactsContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import { cpf as CPFValidator } from 'cpf-cnpj-validator'; 

export default function ContactForm() {
  const localstorage = useLocalStorage();
  // eslint-disable-next-line no-unused-vars
  const [_, setContacts] = useContext(ContactsContext);

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    address_number: '',
    location_data: null,
  });

  const handleGetCEP = async (cep) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if(name === 'cep' && value.length === 8){
      const addressData = await handleGetCEP(value);
      if(addressData) {
          setFormData({ ...formData, [name]: value, 'location_data': addressData, 'address': `${addressData.logradouro} - ${addressData.bairro}, ${addressData.localidade} - ${addressData.uf}` });
          return;
      }
    }
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const contacts = localstorage.getValue('contacts') || [];
    const contactData = {
        name: formData.name,
        cpf: formData.cpf,
        phone: formData.phone,
        uf: formData.location_data.uf,
        address: formData.address,
        cep: formData.cep,
        lat_lon: `${formData.location_data.lat}, ${formData.location_data.lon}`,
        lon_lat: [formData.location_data.lat, formData.location_data.lon],
    };
    contacts.push(contactData);
    localstorage.setValue('contacts', contacts);
    setContacts([...contacts, contactData]);
    alert('Contato cadastrado com sucesso!');
  };

  return (
    <Paper elevation={0} sx={{ background: 'transparent', height: '100%'}}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '2rem' }}
      >
        <TextField
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleInputChange}
          fullWidth
          required
          error={!CPFValidator.isValid(formData.cpf)}
          helperText={!CPFValidator.isValid(formData.cpf) ? 'CPF inválido' : '' }
        />
        <TextField
          label="Telefone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="CEP"
          name="cep"
          type="number"
          value={formData.postal_code}
          onBlur={handleInputChange}
          fullWidth
          required
          error={formData.cep.length !== 8}
          helperText={formData.cep.length !== 8 ? 'CEP inválido' : '' }
        />
        <TextField
          label="Endereço"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Número"
          name="address_number"
          value={formData.address_number}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <Button variant="contained" type="submit" fullWidth>
          Cadastrar Contato
        </Button>
      </Box>
    </Paper>
  );
}