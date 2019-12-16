import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ImageDisplay from 'components/ImageDisplay';
import { AddImageInput, AddImageWrapper, AddImagePlaceholder, DescriptionInput, Button } from 'components/ImageUploadPreview';

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

// const NoImage = styled.div`
//     padding-top: 2vh;
//     color:${props => props.theme.text};
// `;

class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            imagePreviewUrls: [],
            file: "",
            imagePreviewUrl: "",
            description: ""
        }
    }
    // maybe send uuid from here
    requestSignedUrl = async () => {
        try {
            const response = await axios.post('/getsignedurl', { imageDescription: this.state.description, filename: this.state.file.name });
            return response.data.signedUrl;
        } catch (err) {
            console.log(err);
        }
    }

    handleDescriptionChange = e => {
        this.setState({ description: e.target.value });
    }


    _handleSubmit = async e => {
        e.preventDefault();
        if (!this.fileTypeCheck()) {
            return;
        }
        try {
            // attempting to post to s3
            let signedUrl = await this.requestSignedUrl();
            this.uploadImageToS3(signedUrl);
            this.setState({ description: "", file: "", imagePreviewUrl: "" });
        } catch (err) {
            console.log(err);
        }

    }

    uploadImageToS3 = (signedUrl) => {
        axios.put(signedUrl,
            this.state.file,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        ).then(res => {
            console.log(`what is in s3 res`)
            console.log(res)
            // response from s3
            if (res.status === 200) {
                // notify backend image upload success
                console.log(`successfully uploaded to s3`);
                this._imageUploaded();
            }
        }).catch(err => {
            console.log(err)
        })
    }

    fileTypeCheck = () => {
        if (!this.state.file || !this.state.imagePreviewUrl) {
            alert(`Please select an image.`);
            return false;
        }
        if (!this.state.file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
            alert(`file type must be either jpg, jpeg, png, gif`);
            return false;
        }
        return true;
    }

    _imageUploaded = () => {
        axios.post('/imageuploadstatus', { didImageUpload: true })
            .then(res => {
                if (res.data.didImageUpload) {
                    console.log(`successfully updated to server`)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    _handleImageChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    render() {
        return (
            <ImageContainer>
                {/* wrapper form for adding image */}
                <AddImageWrapper onSubmit={this._handleSubmit}>
                    <AddImagePlaceholder >
                        CHOOSE IMAGE HERE
                        <AddImageInput
                            type="file"
                            onChange={(e) => this._handleImageChange(e)}
                        />
                    </AddImagePlaceholder>
                    {/* preview the image that is about to be uploaded */}
                    {this.state.imagePreviewUrl ?
                        <ImageDisplayContainter>
                            <ImageDisplay src={this.state.imagePreviewUrl} />
                        </ImageDisplayContainter> : ""
                    }
                    {/* allow image to have description */}
                    <DescriptionInput
                        type="text"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                        placeholder="Enter description here..."
                    />
                    <Button type="submit" >UPLOAD</Button>
                </AddImageWrapper>
                {/* {
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
                } */}
            </ImageContainer>
        )
    }
}

export default index;
