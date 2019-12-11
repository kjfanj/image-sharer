import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const NoImage = styled.div`
    padding-top: 2vh;
    color:${props => props.theme.text};
`;

const AddImageInput = styled.input`
    display: none;
`;

const AddImageWrapper = styled.form`
    background-color:${props => props.theme.backgroundSecondary};
    margin: 1rem;

`;

const AddImagePlaceholder = styled.label`
    margin: 1rem;

    width:80vw;
    height:10vh;
    color:${props => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    font-size:15px;
    border: 1px solid black;
`;

const DescriptionInput = styled.textarea`
    margin: 1rem;
    resize: none;
    width:80vw;
    height:10vh;
    color:${props => props.theme.text};
    border-color:${props => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:15px;
`;

class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            imagePreviewUrls: [],
            file: '',
            imagePreviewUrl: ''
        }
    }

    handleAddImage = async () => {
        try {
            const response = await axios.post('/addimage', { data: "123123123" });
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    _handleSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];


        reader.onloadend = () => {
            this.setState({
                files: [file, ...this.state.files],
                imagePreviewUrls: [reader.result, ...this.state.imagePreviewUrls],
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        return (
            <ImageContainer>
                <AddImageWrapper>
                    <AddImagePlaceholder >
                        CHOOSE IMAGE HERE
                        <AddImageInput
                            type="file"
                            onChange={(e) => this._handleImageChange(e)}
                        />

                    </AddImagePlaceholder>
                    <DescriptionInput placeholder="Enter description here..." />

                </AddImageWrapper>
                {
                    this.state.imagePreviewUrls.length === 0 ?
                        <NoImage>No Image atm</NoImage> :
                        this.state.imagePreviewUrls.map((i) => {
                            return (
                                <React.Fragment key={i}>
                                    <ImageDisplayContainter>
                                        <ImageDisplay src={i} />
                                    </ImageDisplayContainter>
                                </React.Fragment>
                            )
                        })
                }
            </ImageContainer>
        )
    }
}

export default index;
