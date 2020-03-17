import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
class DashBoard extends Component{

componentDidMount(){
    this.props.getSecret()
}

    render(){
        return (
            <div>
                This is a DashBoard component
                <br></br>
                Our Secret : <h3>{this.props.secret}</h3>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        secret: state.dash.secret
    }
}

export default connect(mapStateToProps,actions)(DashBoard);