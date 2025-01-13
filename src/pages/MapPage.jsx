import Map from '../components/Map';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Grid2,
  Paper,
  Stack,
  Typography,
  Tab,
  Tabs,
} from '@mui/material';
import Table from '../components/Table';
import ContactForm from '../components/ContactForm';
import ContactsContext from '../contexts/ContactsContext';

export default function MapPage() {
  const columns = [
    { field: 'contact_name', headerName: 'Nome', width: 150 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    { field: 'phone', headerName: 'Telefone', width: 150 },
    { field: 'uf', headerName: 'UF', width: 100 },
    { field: 'address', headerName: 'Endereço', width: 150 },
    { field: 'cep', headerName: 'CEP', width: 150 },
    { field: 'lat_lon', headerName: 'Lat/Lon', width: 150 },
  ];

  const [rows, setRows] = useState([])
  
  const [contacts, setContacts] = useContext(ContactsContext);
  const navigate = useNavigate();
  const localstorage = useLocalStorage();
  const [user, setUser] = useState(null);
  const [markersToDisplay, setMarkersToDisplay] = useState({});
  const [activeTab, setActiveTab] = useState(0);


  useEffect(() => {
    if(!localstorage.getValue('isLoggedIn') || !localstorage.getValue('user')){
      navigate('/signup');
    }
    const temp_user = localstorage.getValue('user');
    if(temp_user){
      setUser(temp_user);
    }

    const contacts_from_storage = localstorage.getValue('contacts');
    setContacts(contacts_from_storage);
    
    setTimeout(() => {
      setMarkersToDisplay({id: 'teste', lngLat:[-50.57, -25.0], method: 'add'});
    }, 2000);
  }, []);

  useEffect(() => {
    contacts.forEach((contact, index) => {
      setRows([...rows, {
        id: index,
        contact_name: contact.name,
        cpf: contact.cpf,
        phone: contact.phone,
        uf: contact.uf,
        address: contact.address,
        cep: contact.cep,
        lat_lon: contact.lat_lon,
        lon_lat: contact.lon_lat,
      }])
    });
  }, [contacts]);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  function handleDeleteAccount() {
    const response =  window.prompt("Digite sua senha para concluir:");
    if(response === user.password){
      localstorage.removeValue('user');
      localstorage.removeValue('isLoggedIn');
      navigate('/signup');
    }
  }

  function handleLogout() {
    localstorage.removeValue('isLoggedIn');
    navigate('/signup');
  }

  return (
    <Grid2 container spacing={2} padding={0} height={'100vh'}>
        <Grid2 size={{xs: 12, md: 5}} height={'100%'}>
          <Paper elevation={0} sx={{ background: 'transparent', height: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', alignItemscenter: 'flex-start', justifyContent: 'flex-start' }}>
            <Typography variant="h4" align="center" fontFamily={'Roboto'} fontWeight={'bold'} color={'white'} margin={2}>
              GeoConnect
            </Typography>
            <Typography variant="body1" align="left" fontFamily={'Roboto'} fontWeight={'bold'} color={'white'}>
              Bem-vindo,
            </Typography>
            <Typography color={'primary'} marginBottom={2}>{user?.email ?? null}</Typography>

            <Stack direction="row" spacing={2} alignContent='center' marginBottom={2}>
              <Button onClick={handleLogout} variant="contained" size='small' color="primary" sx={{width: 'fit-content' }}>
                Sair
              </Button>
              <Button onClick={handleDeleteAccount} variant="outlined" size='small' color="primary" sx={{width: 'fit-content' }}>
                Apagar conta
              </Button>
            </Stack>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Adicionar Contatos" />
              <Tab label="Listar Contatos" />
            </Tabs>
            {
              activeTab === 0 ? (
                <ContactForm />
              )
              : (
                <Table rows={rows} columns={columns}/>
              )
            }
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 7 }} height={'100%' }>
          <Map center={[-50.57, -25.0]} zoom={5} markersToDisplay={markersToDisplay} />
        </Grid2>
    </Grid2>
  )
}
