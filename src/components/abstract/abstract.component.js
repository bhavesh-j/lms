import React from 'react';
import { apiurl } from '../../shared/baseurl';

class AbstractComponent extends React.Component {
    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStudentSearch = this.handleStudentSearch.bind(this);
    }

    callServerMethod(endpoint, method='GET', headers=null, body=null) {
        const payload = {
            method: method
        };
        if(headers) {
            payload.headers = headers;
        }
        if(body) {
            payload.body = body;
        }
        return fetch(apiurl + endpoint, payload)
        .then(response => response.json());
    }

    fetchClasses() {
        return this.callServerMethod('class');
    }

    toggleLoading(showLoading) {
        if(showLoading) {
            document.getElementById("overlay").style.display = "block";
        } else {
            document.getElementById("overlay").style.display = "none";
        }
    }

    handleInputChange(event, name) {
        const attributes = name.split('.');
        if(attributes.length === 1) {
            this.setState({[name]: event.target.value});
        }
        const key = attributes[0];
        const value = this.state[key];
        let prevObj = value;
        for(let i=1;i<attributes.length;i++) {
            if(i+1 === attributes.length) {
                prevObj[attributes[i]] = event.target.value;
            } else {
                prevObj = prevObj[attributes[i]];
            }
        }
        this.setState({[key]: value});
    }

    copyObject(object) {
        return JSON.parse(JSON.stringify(object));
    }

    scrollTop() {
        var html = document.documentElement;
        html.scrollTop = 0;
    }

    handleStudentSearch(event, listName) {
        event.preventDefault();
        this.setState({
          isStudentsLoading: true,
          [listName]: []
        });
        this.callServerMethod('student/search', 'POST', {
          'Content-Type': 'application/json'
        }, JSON.stringify(this.state[listName+'SearchParam']))
        .then(students => {
          this.setState({
            isStudentsLoading: false,
            [listName]: students
          });
        });
      }
}

export default AbstractComponent;