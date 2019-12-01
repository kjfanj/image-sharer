import React from 'react';
import styled from 'styled-components';

const ImageDisplayContainer = styled.div`
    background-color:${props => props.theme.backgroundSecondary};
`;

const ImageDisplay = styled.img`
    width:100%;
    max-width:80vw;
    height:100%;
`;

const index = () => {
    return (
        <ImageDisplayContainer>
            <ImageDisplay src="https://via.placeholder.com/600x600" />
        </ImageDisplayContainer>
    );
}

export default index;
