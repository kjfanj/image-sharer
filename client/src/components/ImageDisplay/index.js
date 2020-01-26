import React from 'react';
import styled from 'styled-components';

const ImageDisplayContainer = styled.div`
    background-color:${props => props.theme.backgroundSecondary};
`;

const ImageTitle = styled.p`
    display: flex;
    /* align-items: center; */
    justify-content: center;
    color:${props => props.theme.text};
    font-size: 25px;
`;

const ImageDisplay = styled.img`
    width:100%;
    max-width:80vw;
    height:100%;
    padding:10px;
`;

const ImageDescriptionBox = styled.div`

`;

const ImageDescription = styled.p`
    
`;


const index = (props) => {
    return (
        <ImageDisplayContainer>
            <ImageTitle>{props.imageData.imageName.split(".")[0]}</ImageTitle>
            <ImageDisplay src={`http://${props.imageData.storeLocation}`} />

            <ImageDescriptionBox>
                <ImageDescription>{props.imageData.imageDescription}</ImageDescription>
            </ImageDescriptionBox>
        </ImageDisplayContainer>
    );
}

export default index;
