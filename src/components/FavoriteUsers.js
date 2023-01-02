import styled from "styled-components";

export const StyledFavoriteUsers = styled.div`
    padding: 0 32px;
    display: flex;
    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-bottom: 16px;
    }
    .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 20px 20px 0;
    }
`;