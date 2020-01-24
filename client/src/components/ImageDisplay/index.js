import React from 'react';
import styled from 'styled-components';

const ImageDisplayContainer = styled.div`
    background-color:${props => props.theme.backgroundSecondary};
`;

const ImageTitle = styled.p`
    color:${props => props.theme.text};

`;

const ImageDisplay = styled.img`
    width:100%;
    max-width:80vw;
    height:100%;
    padding:10px;
`;


const index = (props) => {
    return (
        <ImageDisplayContainer>
            <ImageTitle>{props.title}</ImageTitle>
            <ImageDisplay src={props.src} />
        </ImageDisplayContainer>
    );
}

export default index;
