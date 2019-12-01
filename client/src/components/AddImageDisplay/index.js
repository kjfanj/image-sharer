import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';

const AddImagePlaceholder = styled.div`
    margin-top:3vh;
    width:80vw;
    height:10vh;
    background-color:${props => props.theme.backgroundSecondary};
    color:${props => props.theme.text};
    border-color:${props => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    font-size:15px;
`;




export default class index extends Component {
    handleAddImage = async () => {
        try {
            const response = await axios.post('/addimage', { data: "123123123" });
            // todo check if image registered correctly

            // if correct add to db
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
