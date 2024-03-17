import React, { Component } from 'react';
import { Container, Header, Icon, Image, Segment } from 'semantic-ui-react';

class Footer extends Component {
    render() {
        return (
            <Segment as='footer' vertical inverted id='footer-wrapper'>
                <Container textAlign='center' id='footer-content'>
                    <Header inverted as='h3'>MyReads – A Book Tracking App</Header>                  
                </Container>
            </Segment>
        );
    }
}

export default Footer;
