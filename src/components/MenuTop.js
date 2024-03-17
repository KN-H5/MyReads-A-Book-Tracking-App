import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Header, Icon, Image, Menu } from 'semantic-ui-react';

class MenuTop extends Component {
    render() {
        return (
            <Menu as='header' fixed='top' inverted borderless stackable>
                <Container id='branding'>
                    <Menu.Item as={Link} to='/' header>
                        <Image size='mini' src='/logo-book.svg' />
                        <Header inverted as='h1'>
                            MyReads
                        </Header>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item as={NavLink} exact to='/'><Icon name='home' /> Home</Menu.Item>
                        <Menu.Item as={NavLink} to='/search'><Icon name='search' /> Search book</Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}

export default MenuTop;
