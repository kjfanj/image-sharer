import styled from 'styled-components';

export const AddImageInput = styled.input`
    display: none;
`;

export const AddImageWrapper = styled.form`
    background-color:${props => props.theme.backgroundSecondary};
    margin: 1rem;
    text-align: center; 
`;

export const AddImagePlaceholder = styled.label`
    margin: 1rem;
    width:80vw;
    height:10vh;
    color:${props => props.theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    font-size:15px;
    border: 3px solid ${props => props.theme.border};
    border-radius: 3px;
`;

export const DescriptionInput = styled.textarea`
    margin: 1rem;
    padding: 1rem;
    resize: none;
    width:80vw;
    height:10vh;
    color:${props => props.theme.text};
    background-color:${props => props.theme.backgroundSecondary};
    border: 3px solid ${props => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size:15px;
`;

export const Button = styled.button`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 1em;
  margin-bottom: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  cursor:pointer;
  border:3px solid ${props => props.theme.background}; 
`;