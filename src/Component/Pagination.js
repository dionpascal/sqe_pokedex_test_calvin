import React from "react";
import Pagination from "@mui/material/Pagination";

const PaginationCard = (props) => (
    <div class="flex justify-center p-8">
        <Pagination count={props.pageCount} onChange={props.onChange}/>
    </div>
);

export default PaginationCard
