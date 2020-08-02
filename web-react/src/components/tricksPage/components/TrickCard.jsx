import React from "react";
import {
  CircularProgress,
  IconButton,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from "@material-ui/core";
import { Done, PlayArrow } from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";


export default function TrickCard({
  name,
  progress,
  loadingTricks,
  email,
  loadingCircularProgress
}) {
  return (
    <Link to={"/trick/" + name}>
      <Card>
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              {loadingTricks ? (
                <Skeleton variant="text">
                  <Typography >
                    {"x".repeat(20)}
                  </Typography>
                </Skeleton>
              ) : (
                  <Typography >{name}</Typography>
                )}
            </Grid>
            <Grid item>
              {email && (
                <TrickCircularProgress
                  progress={progress}
                  loading={loadingCircularProgress}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}



function TrickCircularProgress({ progress, loading }) {
  let circle;
  let message;
  if (loading) {
    circle = (
      <Skeleton variant="circle">
        <CircularProgress variant="static" value="100" />
      </Skeleton>
    );
  } else if (progress) {
    if (progress >= 100) {
      message = <Done />;
    } else {
      message = (
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(progress)}%`}</Typography>
      );
    }
    circle = (
      <CircularProgress variant="static" value={Math.min(progress, 100)} />
    );
  } else {
    circle = (
      <IconButton>
        <PlayArrow />
      </IconButton>
    );
  }
  return (
    <Box position="relative" display="inline-flex">
      {circle}
      {message && (
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {message}
        </Box>
      )}
    </Box>
  );
}