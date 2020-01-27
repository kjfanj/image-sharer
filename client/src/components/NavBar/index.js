import React, { Component } from 'react'
import styled from 'styled-components';

import lightMode from 'assets/LightMode.png';
import darkMode from 'assets/DarkMode.png';
import githubDark from 'assets/GithubDark.png';
import githubLight from 'assets/GithubLight.png';

import { ThemeChoiceContext } from 'contexts/Context';

const NavBarContainer = styled.div`
    display:flex;
    height:10vh;
    width: 100vw;
    align-items: center;
    justify-content: space-between;
    background-color:${props => props.theme.backgroundSecondary};
    color:${props => props.theme.text};
    overflow:hidden;
    position:fixed;
`;

const ImageButton = styled.img`
    height: 32px;
    width: 32px;
    margin-right: 2rem;
    margin-left: 2rem;
    border-radius:50%;
    cursor:pointer;
`;

const Title = styled.h1`
    font-size:20px;
`;

const Link = styled.a`

`;

export default class index extends Component {
    render() {
        return (
            <ThemeChoiceContext.Consumer>
                {context => (
                    <NavBarContainer>
                        <Link href="https://github.com/kjfanj/image-sharer" target="_blank" >
                            <ImageButton src={context.state.isDark ? githubLight : githubDark} />
                        </Link>
                        <Title >Image Sharer</Title>
                        <ImageButton src={context.state.isDark ? darkMode : lightMode} onClick={context.changeTheme} />
                    </NavBarContainer >
                )}
            </ThemeChoiceContext.Consumer>

        )
    }
}
