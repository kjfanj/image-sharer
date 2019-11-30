import React, { Component } from 'react'
import styled from 'styled-components';


const AddImagePlaceholder = styled.div`
    width:80vw;
    height:20vh;
    background-color:${props => props.theme.backgroundSecondary};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
`;

export default class index extends Component {
    render() {
        return (
            <AddImagePlaceholder>
                CLICK OR DRAG AN IMAGE HERE
            </AddImagePlaceholder>
        )
    }
}
