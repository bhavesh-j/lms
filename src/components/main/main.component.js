import React, { Component } from 'react';
import SidePanel from '../sidepanel/sidepanel.component';
import Home from '../home/home.component';
import { Route } from "react-router-dom";

class Main extends Component {
    render() {
        return(
            <>
                <SidePanel />
                <Route path="/" component={Home} />
            </>
        );
    }
}

export default Main;