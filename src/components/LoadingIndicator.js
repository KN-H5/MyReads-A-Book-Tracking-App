import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

class LoadingIndicator extends Component {
    render() {
        return (
            <Dimmer page active>
                <Loader size='massive' content='Books are loading' />
            </Dimmer>
        );
    }
}

export default LoadingIndicator;
