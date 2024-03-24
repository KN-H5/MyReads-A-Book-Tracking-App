import React from 'react';
import { Container, Header,Segment } from 'semantic-ui-react';

function Footer() {
        return (
            <Segment as='footer' vertical inverted id='footer-wrapper'>
                <Container textAlign='center' id='footer-content'>
                    <Header inverted as='h3'>MyReads – A Book Tracking App</Header>                  
                </Container>
            </Segment>
        );
}

export default Footer;
