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

    handleInputChange(event, name, number=false) {
        if(number && isNaN(event.target.value)) {
            return;
        }
        const attributes = name.split('.');
        if(attributes.length <= 1) {
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

    handleStudentSearch(event, listName, endPoint='student/search') {
        if(event) {
            event.preventDefault();
        }
        this.setState({
          isStudentsLoading: true,
          [listName]: []
        });
        console.log(this.state[listName+'SearchParam']);
        this.callServerMethod(endPoint, 'POST', {
          'Content-Type': 'application/json'
        }, JSON.stringify(this.state[listName+'SearchParam']))
        .then(students => {
          this.setState({
            isStudentsLoading: false,
            [listName]: students
          });
        });
    }

    printDocument(divId) {
        const header = `<!doctype html>
        <html lang="en" dir="ltr">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="icon" href="favicon.ico" type="image/x-icon"/>
        <title>:: Ericsson :: Fees</title>
        
        <!-- Bootstrap Core and vandor -->
        <link rel="stylesheet" href="../assets/plugins/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="../assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
        <link rel="stylesheet" href="../assets/plugins/datatable/dataTables.bootstrap4.min.css">
        <link rel="stylesheet" href="../assets/plugins/sweetalert/sweetalert.css">
        
        <!-- Core css -->
        <link rel="stylesheet" href="../assets/css/style.min.css"/>
        <link rel="stylesheet" href="assets/css/styles.css"/>
        </head>
        
        <body class="font-muli theme-cyan gradient">`;
        const footer = `<!-- Start Main project js, jQuery, Bootstrap -->
        <script src="../assets/bundles/lib.vendor.bundle.js"></script>
        
        <!-- Start Plugin Js -->
        <script src="../assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
        <script src="../assets/bundles/dataTables.bundle.js"></script>
        <script src="../assets/plugins/sweetalert/sweetalert.min.js"></script>
        
        <!-- Start project main js  and page js -->
        <script src="../assets/js/core.js"></script>
        <script src="assets/js/table/datatable.js"></script>
        <script src="assets/js/main.js"></script>
        <script src="assets/js/page/payments.js"></script>
        </body>
        </html>`;
        let ifram = document.createElement("iframe");
        ifram.style = "display:none";
        document.body.appendChild(ifram);
        const pri = ifram.contentWindow;
        pri.document.open();
        pri.document.write(header+document.getElementById(divId).innerHTML+footer);
        pri.document.close();
        pri.focus();
        pri.print();
    }
}

export default AbstractComponent;