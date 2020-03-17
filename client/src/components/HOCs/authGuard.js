import React, { Component } from 'react';
import DashBoard from '../Dashboard';
import { connect } from 'react-redux';


export default (OriginalComponent) => {
    class MixedComponent extends Component {

    checkAuth(){
        if(!this.props.isAuth && !this.props.jwtToken){
            this.props.history.push('/');
         }
    }

    componentDidMount(){
     //whether the user is authenticated
     this.checkAuth();
    }

    componentDidUpdate(){
    //whether the user is authenticated
    this.checkAuth();
    }

        render(){
            return <OriginalComponent {...this.props} />;
        }
    }

function mapStateToProps(state){
    return{
        isAuth:state.auth.isAuthenticated,
        jwtToken:state.auth.token
    }
}

 return connect(mapStateToProps)(MixedComponent);
};
