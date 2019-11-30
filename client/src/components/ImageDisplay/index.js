import React from 'react';
import styled from 'styled-components';

const ImageDisplayContainer = styled.div`

    background-color:${props => props.theme.backgroundSecondary};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImageDisplay = styled.img`
    width:100%;
    max-width:80vw;
    height:100%;
`;

const index = () => {
    return (
        <ImageDisplayContainer>
            <ImageDisplay src="https://via.placeholder.com/1200x900" />
        </ImageDisplayContainer>
    );
}

export default index;
