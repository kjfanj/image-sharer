import React, { Component } from 'react';
import styled from 'styled-components';
import AddImageDisplay from 'components/AddImageDisplay';
import ImageDisplay from 'components/ImageDisplay';

const ImageContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
`;

const ImageDisplayContainter = styled.div`
    margin:1rem;
    width:80vw;
    height:100%;
    background-color:${props => props.theme.backgroundSecondary};
    color:${props => props.theme.text};
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
`;



export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageList: [12, 3, 4, 56, 7, 89,]
        }
    }
    render() {
        return (
            <ImageContainer>
                <AddImageDisplay />
                {this.state.imageList.map((i) => {
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
