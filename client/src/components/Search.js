import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl"

const Search = () => {
  let handleChange = (event) => {
    // setText(event.target.value);
    // console.log(textFieldValue);
  };

  let artistSearch = (event) => {
    if (event.key === "Enter") {
    //   event.preventDefault();

    //   let capLine = textFieldValue[0].toUpperCase() + textFieldValue.slice(1);

    //   setname(capLine);
    //   setrenderSearch(true);
    }
  };

  return (
    <Container
      maxWidth="md"
      height={1}
      style={{ color: "#164626", paddingBottom: "2rem" }}
    >
      <Paper elevation={15} style={{ marginTop: "1rem", padding: "0.5rem" }}>
        <Typography variant="h6" style={{ display: "inline-block",paddingTop:"0.75rem",marginRight:"1rem" }}>
          Search by Artist:
        </Typography>
        <FormControl>
          <TextField
            id="filled-basic"
            color="secondary"
            label="Search"
            variant="filled"
            onKeyDown={artistSearch}
            onChange={handleChange}
          />
        </FormControl>
      </Paper>
    </Container>
  );
};

export default Search;

/* {renderSearch && <PokeCard name={name} id={pokemonID} type={pokemonTypes} moves={pokemonMoves} pic={pokemonPic} stats={stats} />} */
