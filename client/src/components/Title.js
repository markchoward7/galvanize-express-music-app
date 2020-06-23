import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Title = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">
              <span className="titlebar-text">
                🎵 Totally Not Itunes 🎵
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container
        maxWidth="md"
        height={1}
        style={{ color: "#164626" }}
      >
        <Paper
          elevation={10}
          style={{ marginTop: "1rem", width: "fit-content", padding: "0.5rem" }}
        >
          <Typography variant="caption">
            Product proudly brought to you by <b>Mark Howard</b> and{" "}
            <b>Harry Randazzo </b>( Razzle-Dazzle )<br></br>
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Title;
