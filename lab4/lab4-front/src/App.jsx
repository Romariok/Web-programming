import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import AodIcon from '@mui/icons-material/Aod';

import {
  Link as RouterLink,
  Route,
  Routes
} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';




import SignIn from './pages/signIn.jsx'
import Register from './pages/Register.jsx'
import MainPage from './pages/main_page.jsx'
import Error from './pages/error.jsx'
import { Grid } from '@mui/material';



Router.propTypes = {
  children: PropTypes.node,
};

const Link = React.forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};


function App() {

  const switchTabs = new Audio('src/assets/sounds/switch_tabs.mp3');
  const switchPlay = () => {
    switchTabs.play();
  }

  return (
    <Router>
      <Box sx={{ width: '100%',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={0} >
          <List aria-label="main sections" sx={{
            color: 'white',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ListItemLink to="/user" primary="Log In" icon={<AccountCircleIcon color='primary' />}/>
            <ListItemLink to="/register" primary="Register" icon={<PersonAddAltRoundedIcon color='primary' />} />
            <ListItemLink to="/app" primary="App" icon={<AodIcon color='primary' />} />
          </List>
        </Paper>
      </Box>
      <Grid container maxWidth={'xs'}>
        <Grid item sx={{width: '100%',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Routes>
            <Route path="/app" element={<MainPage />}/>
          </Routes>
        </Grid>
        <Grid item sx={{width: '100%',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Routes>
            <Route path="/user" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/error" element={<Error />} />
          </Routes>
        </Grid>
      </Grid>


    </Router>

  )
}

export default App