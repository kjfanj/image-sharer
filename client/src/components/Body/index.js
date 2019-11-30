import React, { Component } from 'react';
import styled from 'styled-components';

import SearchBar from 'components/SearchBar';
import ImageContainer from 'components/ImageContainer';

const Body = styled.div`
height:90vh;
display:flex;
align-items: center;
justify-content:center;
`;


export default class index extends Component {
    render() {
        return (
            <React.Fragment>
                <Body>
                    {/* <SearchBar /> */}
                    <ImageContainer />
                </Body>
            </React.Fragment>
        );
    };
};
