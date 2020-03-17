import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';


class Header extends Component {
    constructor(props){
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut(){
       this.props.signOut();

    }


    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation" >
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <img alt="logo" src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </Link>

                    <Link to="" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">


                        <span aria-hidden="true">SignUp</span>
                        <span aria-hidden="false">Login</span>
                        <span aria-hidden="true">SignOut</span>
                    </Link>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">
                            Home
      </Link>

                        <Link to="/dashboard" className="navbar-item">
                            DashBoard
      </Link>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <Link to="_blank" className="navbar-link">
                                More
        </Link>

                            <div className="navbar-dropdown">
                                <Link to="_blank" className="navbar-item">
                                    About
          </Link>
                                <Link to="_blank" className="navbar-item">
                                    Jobs
          </Link>
                                <Link to="_blank" className="navbar-item">
                                    Contact
          </Link>
                                <hr className="navbar-divider"></hr>
                                <Link to="_blank" className="navbar-item">
                                    Report an issue
          </Link>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {!this.props.isAuth ?
                                    [<Link to="/signup" className="button is-primary" key="signup">
                                        <strong>Sign up</strong>
                                    </Link>
                                        ,
                                    <Link to="/signin" className="button is-light" key="signin">
                                        Sign in</Link>] : null }

                                { this.props.isAuth ?         
                                <Link to="/" className="button is-light" onClick={this.signOut} history={this.props.history}>
                                        Sign Out</Link> : null }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        )
    }
}


function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated

    };
}

export default connect(mapStateToProps, actions)(Header);