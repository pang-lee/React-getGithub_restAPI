import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function Repo(props) {
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
          <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center" variant="h5" component="div">
            Github Repository {props.repoInfo.name}
          </Typography>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom align="center">
                  {props.repoInfo.full_name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" align="center">
                  stargazers_count {props.repoInfo.stargazers_count}
                </Typography>
                <Typography variant="h5" component="div" align='center'>
                  {props.repoInfo.description}
                </Typography>
              </CardContent>
              <CardActions>
                  <Button size="large" onClick={()=> window.open(`${props.repoInfo.html_url}`, "_blank")}>Go website</Button>
              </CardActions>
            </Card>
        </Paper>
    );
}