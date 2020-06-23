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
    maxWidth: 500,
    minWidth: 400,
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

  const [beetlesList, setbeetlesList] = useState("");

  let callbeetlesList = (artistName) => {
    fetch(`http://localhost:9000/songs?artist=${artistName}`)
      .then((res) => res.text())
      .then((res) => setbeetlesList(res));
  };

  useEffect(() => {
    callbeetlesList('The+Beatles');
  }, []);

  // END FETCH DATA SECTION

  return (
    <Box style={{ display: "flex", justifyContent: "center", marginBottom:"1rem" }}>
      <Card className={classes.root}>
        <CardHeader title="Artist Name Here" subheader="Data Here" />
        <CardMedia
          className={classes.media}
          image="LINK_TO_IMAGE"
          title="Album Title Here"
        />
        {/* <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent> */}
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
                {beetlesList}
                </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default Beetles;
