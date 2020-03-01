import React from 'react';
import styled from 'styled-components';

const ImageTitle = styled.p`
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    margin:10px;
    color:${props => props.theme.text};
    font-size: 34px;
`;

const ImageDisplay = styled.img`
    max-width:100%;
    padding:10px;
`;

const ImageDescriptionBox = styled.div`
    width:100%;
    padding:1rem;
    margin:10px;
`;

const ImageDescription = styled.p`
    font-size: 20px;

`;

const index = (props) => {
    return (
        <>
            <ImageTitle>Title: {props.imageData.imageName.split(".")[0]}</ImageTitle>
            <ImageDisplay src={`http://${props.imageData.storeLocation}`} />

            <ImageDescriptionBox>
                <ImageDescription>Description: {props.imageData.imageDescription}</ImageDescription>
            </ImageDescriptionBox>
        </>
    );
}

export default index;
