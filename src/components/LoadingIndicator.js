import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

function LoadingIndicator () {

        return (
            <Dimmer page active>
                <Loader size='massive' content='Books are loading' />
            </Dimmer>
        );

}

export default LoadingIndicator;
