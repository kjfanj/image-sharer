import React, { Component } from 'react';
import styled from 'styled-components';
import AddImageDisplay from 'components/AddImageDisplay';
import ImageDisplay from 'components/ImageDisplay';

const ImageContainer = styled.div`
display:flex;
flex-direction:column;
`;

const Padder = styled.div`
padding-top:5vh;

`;

const ImageDisplayContainter = styled.div`
    margin:1rem;
    width:80vw;
    height:100%;
    background-color:${props => props.theme.backgroundSecondary};
    color:${props => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:10vh;
`;

const imageList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


export default class index extends Component {
    render() {
        return (
            <ImageContainer>
                <AddImageDisplay />
                <Padder />
                {imageList.map((i) => {
                    return (
                        <React.Fragment key={i}>
                            <ImageDisplayContainter key={i}>
                                <ImageDisplay key={i} />
                            </ImageDisplayContainter>
                        </React.Fragment>
                    )
                })}
            </ImageContainer>
        )
    }
}
