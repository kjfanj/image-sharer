import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';

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
    position: fixed;
    font-size:15px;
`;




export default class index extends Component {
    handleAddImage = async () => {
        try {
            const response = await axios.post('/test', { data: "123123123" });
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <AddImagePlaceholder onClick={this.handleAddImage}>
                CLICK OR DRAG AN IMAGE HERE
            </AddImagePlaceholder>
        )
    }
}
