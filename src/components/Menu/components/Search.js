import React from "react";
import styled from "styled-components";

const StyledSearch = styled.div`

`;

export default function Search({ filterValue, setfilterValue }) {
    return (
        <StyledSearch>
            <input type="text" value={filterValue} onChange={(filterValue) => setfilterValue(filterValue.target.value)} />
            <button>🔍</button>
        </StyledSearch>
    )
}