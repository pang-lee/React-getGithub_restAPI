import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'

let hasMore = true

export default function Content(props) {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);


  async function fetchMoreData(){
    if(!hasMore) console.log('false trigger')
    const more_R_data = await axios.get(`https://api.github.com/users/${props.userInfo.U_data.data.login}/repos`, { params: { per_page: props.userInfo.R_data.data.length + 10 }})
    props.userInfo.R_data.data = more_R_data.data
    if(more_R_data.data.length >= props.userInfo.U_data.data.public_repos) hasMore = false
    forceUpdate()
  }

  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        {props.userInfo.U_data.data.login} Github Repository List
      </Typography>

      <InfiniteScroll dataLength={props.userInfo.R_data.data.length} next={fetchMoreData} hasMore={hasMore} scrollThreshold={1} 
          loader={
            <h3 style={{ textAlign: "center" }}>
              <b>Loading ...</b>
            </h3>}
          endMessage={
            <h3 style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </h3>
          }>

        {props.userInfo.R_data.data.map((repo_item) => {
          return <Card key={repo_item.id} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {repo_item.full_name}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {repo_item.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      stargazers_count {repo_item.stargazers_count}
                    </Typography>
                    <Typography variant="button" display="block">
                      <span>created_at</span>&nbsp;&nbsp;{repo_item.created_at}
                    </Typography>
                    <Typography variant="button" display="block">
                      <span>last_update </span>&nbsp;&nbsp;{repo_item.updated_at}                  
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={async () => {
                      let repo_data = await axios.get(`https://api.github.com/repos/${repo_item.owner.login}/${repo_item.name}`)
                      props.owner_data(repo_data.data)}
                    }>Learn More</Button>
                  </CardActions>
                </Card>
            })
      }

      </InfiniteScroll>
    </Paper>
  );
}