import React, { Component } from 'react';
import styled from 'styled-components';

import ImageContainer from 'components/ImageContainer';
const Body = styled.div`
    padding-top:10vh;
`;

export default class index extends Component {
    render() {
        return (
            <React.Fragment>
                <Body>
                    <ImageContainer />
                </Body>
            </React.Fragment>
        );
    };
};
