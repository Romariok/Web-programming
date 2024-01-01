import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, deleteTry, getTry, appSelector, sendTry } from "../storage/slices/AppSlice.jsx";
import { hidePointer } from '../storage/slices/PointerSlice.jsx';

import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import '/src/assets/css/main_page.css'

import StyleButton from '../assets/components/StyleButton';
import Graph from '../assets/components/Graph';
import PointTable from '../assets/components/Table';
function MainPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(appSelector);
  const [openError, setOpenError] = useState(false);
  const [RValid, setRValid] = useState(false);
  const [rows, setRows] = useState({ x: '', y: '', r: 'R' });
  const ring = new Audio('src/assets/sounds/ring.mp3');

  const playSound = () => {
    ring.play();
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRows(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === "r") {
      dispatch(hidePointer());
      if (value > 0) {
        setRValid(true);
      }
      else {
        setRows(prevState => ({
          ...prevState,
          [name]: 'R'
        }));
        setRValid(false);
      }
    }
  };


  const handleFormSubmit = async (e) => {
    playSound();
    e.preventDefault();
    try {
      await onSubmit(rows);
    } catch (error) {
      console.log('Error submitting form: ' + error.message);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    dispatch(sendTry(data)).then(() => {
      dispatch(getTry());
    });
  };

  const onDelete = () => {
    ring.play();
    dispatch(hidePointer());
    dispatch(deleteTry()).then(() => {
      dispatch(getTry());
    });
  };

  const logOut = () => {
    dispatch(clearState());
    dispatch(hidePointer());
    localStorage.removeItem('token');
  };


  useEffect(() => {
    return () => {
      dispatch(clearState());
      dispatch(getTry());
    };
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      setOpenError(true);
      setTimeout(() => {
        setOpenError(false);
        dispatch(clearState());
      }, 3000);
    }

    if (isError) {
      dispatch(clearState());
      navigate('/error');
      localStorage.removeItem('token');
      window.location.reload();
    }
  }, [isError, isSuccess]);

  const isDesktop = useMediaQuery('(min-width: 1260px)');
  const isTablet = useMediaQuery('(min-width: 781px) and (max-width: 1259px)');
  const isMobile = useMediaQuery('(max-width: 780px)');
  return (
    <>
      <Container
        component="app"
        maxWidth={'xs'}
        sx={{
          height: isDesktop ? '100vh' : isTablet ? '50vh' : isMobile ? '100vh' : '100vh',
          width: isDesktop ? '100vw' : isTablet ? '100vw' : isMobile ? '100vw' : '100vw'
        }}
      >
        <header><h1>Kobelev Roman, 2303</h1></header>

        <Box className="graph" sx={{ textAlign: 'center', borderColor: 'white', borderWidth: '6px', borderStyle: 'solid', margin: '20px' }}>
          <Graph R={rows.r} RValid={RValid} />
        </Box>


        <Box>
          <Box component="form" noValidate sx={{
            mt: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            background: 'black', padding: '20px', borderColor: 'white',
            borderWidth: '6px', textAlign: 'center', borderStyle: 'solid',
            marginTop: '30px', marginBottom: '30px',
          }}>
            <Box id='x'>
              <Grid container>
                <Grid item>
                  <IconButton
                    name="x"
                    id='x_5'
                    value='-5'
                    onChange={handleChange}
                    sx={{ color: 'white' }}
                  >-5</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="x"
                    id='x_4'
                    value='-4'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >-4</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="x"
                    id='x_3'
                    value='-3'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >-3</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="x"
                    id='x_2'
                    value='-2'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >-2</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="x"
                    id='x_1'
                    value='-1'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >-1</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="x"
                    id='x0'
                    value='0'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >0</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="x"
                    id='x1'
                    value='1'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >1</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="x"
                    id='x2'
                    value='2'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >2</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="x"
                    id='x3'
                    value='3'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >3</IconButton>
                </Grid>
              </Grid>
            </Box>
            <Input
              margin="dense"
              required
              fullWidth
              id="y"
              label="y"
              name="y"
              autoComplete="y"
              autoFocus
              sx={{ color: 'white' }}
              onChange={handleChange}
              inputProps={{ min: -5, max: 5 }}
              placeholder='-5...5'
              type='number'
            />
            <Box id='r'>
              <Grid container>
                <Grid item>
                  <IconButton
                    name="r"
                    id='r_5'
                    value='-5'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >-5</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="r"
                    id='r_4'
                    value='-4'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >-4</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="r"
                    id='r_3'
                    value='-3'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >-3</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="r"
                    id='r_2'
                    value='-2'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >-2</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="r"
                    id='r_1'
                    value='-1'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >-1</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="r"
                    id='r0'
                    value='0'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >0</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="r"
                    id='r1'
                    value='1'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >1</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="r"
                    id='r2'
                    value='2'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >2</IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    name="r"
                    id='r3'
                    value='3'
                    sx={{ color: 'white' }}
                    onClick={handleChange}
                  >3</IconButton>
                </Grid>
              </Grid>
            </Box>
            <Grid container>
              <Grid item sx={{ ml: 5 }}>
                <StyleButton action={handleFormSubmit} text={"Submit"} disabled={isFetching} type={"button"} />
              </Grid>
              <Grid item sx={{ ml: 13 }}>
                <StyleButton action={onDelete} text={"Clear"} disabled={isFetching} type={"button"} />
              </Grid>
            </Grid>
            <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
              <Alert severity="error" sx={{ fontFamily: "Undertale" }}>
                {errorMessage}
              </Alert>
            </Snackbar>
            <Link href="user" variant="body1" onClick={logOut} sx={{ color: 'white', fontFamily: "Undertale" }}>
              {"Log Out"}
            </Link>


          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'hidden' }}>
          <PointTable sx={{ maxWidth: '100%', overflowX: 'auto' }} />
        </Box>
      </Container>
    </>
  )
}

export default MainPage
