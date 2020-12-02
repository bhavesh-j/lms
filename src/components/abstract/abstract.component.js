import React from 'react';
import baseurl from '../../shared/baseurl';

class AbstractComponent extends React.Component {
    callServerMethod(endpoint, method='GET', headers=null, body=null) {
        return fetch(baseurl + endpoint, {
            method: method,
            headers: headers,
            body: body
        });
    }

    fetchClasses() {
        return this.callServerMethod('class');
    }
}

export default AbstractComponent;