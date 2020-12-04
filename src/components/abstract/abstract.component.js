import React from 'react';
import { apiurl } from '../../shared/baseurl';
// import swal from'sweetalert';
import { toast } from 'toast-notification-alert'

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
            Array.prototype.forEach.call(document.getElementsByClassName("page-loader-wrapper"), load => load.style.display = "block");
        } else {
            Array.prototype.forEach.call(document.getElementsByClassName("page-loader-wrapper"), load => load.style.display = "none");
        }
    }

    handleInputChange(event, name, type=false) {
        let originalValue;
        if(type === 'date') {
            originalValue = event;
        } else {
            originalValue = event.target.value;
            if(type && isNaN(originalValue)) {
                return;
            }
        }

        const attributes = name.split('.');
        if(attributes.length <= 1) {
            this.setState({[name]: originalValue});
            return;
        }
        const key = attributes[0];
        const value = this.state[key];
        let prevObj = value;
        for(let i=1;i<attributes.length;i++) {
            if(i+1 === attributes.length) {
                prevObj[attributes[i]] = originalValue;
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
            if(this.isErrorPresent(students)) {
                return;
            }
          this.setState({
            isStudentsLoading: false,
            [listName]: students
          });
        });
    }

    printDocument(divId, cssstring='') {
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
        ${cssstring}
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

    formatDate(date = null) {
        var d = date ? new Date(date) : new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('/');
    }

    isErrorPresent(payload) {
        this.toggleLoading(false);
        if(payload.Message) {
            // swal('Error!', payload.Message, 'error');
            toast.show({title: payload.Message, position: 'bottomright', type: 'error'});
            return true;
        }
        return false;
    }

    setTimeZoneToUTC(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
}

export default AbstractComponent;