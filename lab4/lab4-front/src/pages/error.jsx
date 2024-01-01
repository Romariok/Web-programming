import * as React from 'react';
import StyleButton from '../assets/components/StyleButton';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import '/src/assets/css/signIn.css'
import { colors } from '@mui/material';
import Typography from '@mui/material/Typography';

function Error() {
   return (
      <>
         <Container component="main" maxWidth="xs">
            <div style={{ margin: '200px' }} />
            <Box>
               <Box component="form" noValidate sx={{
                  mt: 1, marginTop: '8',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px',
                  textAlign: 'center', borderColor: 'white', borderWidth: '6px', borderStyle: 'solid',
               }}>
                  <img src="/public/breaken_heart.png" style={{ width: '50px', height: '45px' }} />
                  <Typography variant="h6" color="white" fontFamily="Undertale" sx={{mt:4}}>To be determined you have to login</Typography>
               </Box>
            </Box>
         </Container>

      </>
   )
}

export default Error