import React, { Component } from 'react'
import styled from 'styled-components';


const AddImagePlaceholder = styled.div`
    margin:1rem;
    width:80vw;
    height:10vh;
    background-color:${props => props.theme.backgroundSecondary};
    color:${props => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    font-size:15px;
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
