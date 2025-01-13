import {
    Grid2,
} from '@mui/material';
import AuthForm from '../components/AuthForm';

export default function SignupPage() {
  return (
    <Grid2 container spacing={{ xs: 2, md: 4 }} padding={4} height={'100vh'}>
        <Grid2 size={{xs: 12, md: 6}} height={{ xs: '50%', md: '100%' }}>
            <img
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '10px' }}
                src={'public/signup-bg.jpg'}
                alt={"Woman and a map"}
                loading="lazy"
            />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }} height={{ xs: 'fit-content', md: '100%' }}>
            <AuthForm />
        </Grid2>
    </Grid2>
  )
}
