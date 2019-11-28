import React, { Component } from 'react'
import styled from 'styled-components';
import darklight from 'assets/darklight.png';
import githubDark from 'assets/GithubDark.png';
import githubLight from 'assets/GithubLight.png';
import { ThemeChoiceContext } from 'contexts/Context';

const NavBarContainer = styled.div`
    display:flex;
    height:10vh;
    align-items: center;
    justify-content: space-between;
    background-color:${props => props.theme.backgroundSecondary};
    color:${props => props.theme.text};
    overflow:hidden;
`;

const ImageButton = styled.img`
    height: 32px;
    width: 32px;
    margin-right: 2rem;
    margin-left: 2rem;
    border-radius:50%;
`;

const Title = styled.h1`

`;

const ExternalLink = styled.a`
`;

export default class index extends Component {
    render() {
        return (
            <ThemeChoiceContext.Consumer>
                {context => (
                    <NavBarContainer>
                        <ExternalLink href="https://github.com/kjfanj/image-sharer" target="_blank" >
                            <ImageButton src={context.state.isDark ? githubLight : githubDark} />
                        </ExternalLink>
                        <Title >Image Sharer</Title>
                        <ImageButton src={darklight} onClick={context.changeTheme}></ImageButton>
                    </NavBarContainer >
                )}
            </ThemeChoiceContext.Consumer>

        )
    }
}
