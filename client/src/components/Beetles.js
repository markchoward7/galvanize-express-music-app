import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
    maxWidth: 700,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Beetles = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // FETCH DATA SECTION + UPDATE STATE

  const [beetlesList, setbeetlesList] = useState(null);

  let callbeetlesList = (artistName) => {
    fetch(`http://localhost:9000/136975`)
      .then((res) => res.text())
      // .then(res => console.log(Array.isArray(JSON.parse(res))))
      .then((res) => setbeetlesList(JSON.parse(res)));
  };

  useEffect(() => {
    callbeetlesList();
  }, []);

  // END FETCH DATA SECTION

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      <Card className={classes.root}>
        <CardHeader title="The Beatles" subheader="Data Here" />
        <CardMedia
          className={classes.media}
          image="LINK_TO_IMAGE"
          title="Album Title Here"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            “You may say I'm a dreamer, but I'm not the only one. I hope someday
            you'll join us. And the world will live as one.” ― John Lennon
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {Array.isArray(beetlesList) && beetlesList.map((ele) => (
                <div>
                  <b>Album Name: </b>
                  {ele.albumName}, <b>ID: </b>
                  {ele.albumId}
                </div>
              ))}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default Beetles;
