import React, { Component } from 'react';
import styled from 'styled-components';
import AddImageDisplay from 'components/AddImageDisplay';

const ImageContainer = styled.div`
display:flex;
flex-direction:column;
`;


const ImageDisplay = styled.img`

`;

// const imageList = 


export default class index extends Component {
    render() {
        return (
            <ImageContainer>
                <AddImageDisplay />
            </ImageContainer>
        )
    }
}
