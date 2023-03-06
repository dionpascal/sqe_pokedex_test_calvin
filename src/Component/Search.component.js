import React from "react";
import TextField from "@mui/material/TextField";

const Search = (props) => {
    const onChange = (event) => {
        props.onSearch(event.target.value);
    }
    return <TextField onChange={onChange}
        id="standard-basic" label="Search by Name" variant="standard" />
}

export default Search
