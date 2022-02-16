import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
  const { userInfo } = props;
  let navigate = useNavigate()

  return (
    <React.Fragment>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1" align="center" onClick={() => navigate('/')}>
                Github username {userInfo.U_data.data.login}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1" align="center">
                <Link
                  href={userInfo.U_data.data.html_url}
                  variant="body2"
                  sx={{
                    textDecoration: 'none',
                    color: lightColor,
                    '&:hover': {
                      color: 'common.white',
                    },
                  }}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  My Github Page
                </Link>&nbsp;&nbsp;
                <IconButton color="inherit" sx={{ p: 0.5 }} onClick={() => setTimeout(navigate.goBack, 0)}>
                  <Avatar src={userInfo.U_data.data.avatar_url} alt="My Avatar" />
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;