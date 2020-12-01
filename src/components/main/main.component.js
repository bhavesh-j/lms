import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import SidePanel from '../sidepanel/sidepanel.component';
import Home from '../home/home.component';
import Students from '../students/students.component';
import NotFound from '../notfound/notfound.component';
import Payments from '../payments/payments.component';

class Main extends Component {
    render() {
        return(
            <>
                <SidePanel />
                <Route exact path="/" component={Home} />
                <Route exact path="/students" component={Students} />
                <Route exact path="/payments" component={Payments}/>
                <Route path="/not-found" component={NotFound} />
                <Redirect to="not-found" />
            </>
        );
    }
}

export default Main;