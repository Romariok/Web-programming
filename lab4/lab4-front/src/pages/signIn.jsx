import StyleButton from '../assets/components/StyleButton';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, loginSelector, clearState } from '../storage/slices/LoginSlice';
import '/src/assets/css/signIn.css'

function SignIn() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { register, handleSubmit } = useForm();
   const { isFetching, isSuccess, isError, errorMessage } = useSelector(loginSelector);
   const [openError, setOpenError] = useState(false);

   const onSubmit = (data) => {
      dispatch(loginUser(data));
   };

   const handleFormSubmit = (data) => {
      onSubmit(data);
   };

   useEffect(() => {
      if (isError) {
         setOpenError(true);
         setTimeout(() => {
            setOpenError(false);
            dispatch(clearState());
         }, 3000);
      }

      if (isSuccess) {
         dispatch(clearState());
         navigate('/app');
      }
   }, [isError, isSuccess, dispatch, navigate]);

   const isDesktop = useMediaQuery('(min-width: 1260px)');
   const isTablet = useMediaQuery('(min-width: 781px) and (max-width: 1259px)');
   const isMobile = useMediaQuery('(max-width: 780px)');
   return (
      <>
         <Container component="main" maxWidth={'xs'}         
         sx={{ height: isDesktop ? '100vh' : isTablet ? '50vh' : isMobile ? '40vh' : '40vh',
         width: isDesktop ? '100vw' : isTablet ? '100vw' : isMobile ? '100vw' : '100vw'}}>
            <div style={{ margin: '200px' }} />
            <Box>
               <Box component="form" noValidate sx={{
                  mt: 1, marginTop: '8',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px',
                  textAlign: 'center', borderColor: 'white', borderWidth: '6px', borderStyle: 'solid',
               }} onSubmit={handleSubmit(handleFormSubmit)}>
                  <img src="/public/undertale-red.svg" style={{ width: '50px', height: '80px' }} />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="username"
                     label="User name"
                     name="username"
                     {...register('username', { required: true })}
                     autoComplete="username"
                     color='secondary'
                     autoFocus
                     variant='filled'
                     sx={{ backgroundColor: 'white' }}
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     {...register('password', { required: true })}
                     id="password"
                     color='secondary'
                     variant='filled'
                     autoComplete="current-password"
                     sx={{ backgroundColor: 'white' }}
                  />
                  <StyleButton text="Sign In" action={() => { }} disabled={isFetching} type={"submit"} />
                  <Link href="/register" variant="body1" color='primary' sx={{ fontFamily: "Undertale", color: 'orange' }}>
                     {"Don't have an account? Sign Up"}
                  </Link>
                  <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
                     <Alert severity="error" sx={{fontFamily:"Undertale"}}>
                        {errorMessage}
                     </Alert>
                  </Snackbar>

               </Box>
            </Box>
         </Container>

      </>
   )
}

export default SignIn