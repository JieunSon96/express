import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import CustomInput from './CustomInput';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.responseGoogle=this.responseGoogle.bind(this);
        this.responseFacebook=this.responseFacebook.bind(this);
    }
    async onSubmit(formData) {
        console.log('onSubmit() got called');
        console.log('formData', formData);

        //we need to call some action.
        await this.props.signUp(formData);

        if(!this.props.errorMessage){
            this.props.history.push('/dashboard');
        }
    }

    async responseGoogle(res){
        console.log('responseGoggle',res);
        console.log('type of ',typeof res);
        await this.props.oauthGoogle(res.accessToken);

        if(!this.props.errorMessage){
            this.props.history.push('/dashboard');
        }
    }

    async responseFacebook(res){
        console.log('responseFacebook',res);
        await this.props.oauthFacebook(res.accessToken);

        if(!this.props.errorMessage){
            this.props.history.push('/dashboard');
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                    <div className="container">

                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-4-widescreen">
                                <form className="box" onSubmit={handleSubmit(this.onSubmit)}>
                                    <fieldset>
                                        <Field
                                            name="email"
                                            type="text"
                                            id="email"
                                            label="Email"
                                            placeholder="e.g. sarahwarehouse@gmail.com"
                                            onChange={this.onChange}
                                            component={CustomInput} />
                                    </fieldset>

                                    <fieldset>
                                        <Field
                                            name="password"
                                            type="password"
                                            id="password"
                                            label="Password"
                                            placeholder="*********"
                                            component={CustomInput} />
                                    </fieldset>

                                    <fieldset>
                                        <Field
                                            name="name"
                                            type="text"
                                            id="name"
                                            label="Name"
                                            placeholder="Sarah"
                                            component={CustomInput} />
                                    </fieldset>

                                    { this.props.errorMessage ? 
                                    <div className="notification is-danger">
                                        <button className="delete"></button>
                                        { this.props.errorMessage }
                                    </div>: null}

                                    <button className="button is-primary" type="submit">Sign Up</button>
                                    <h6 className="subtitle is-6 has-text-centered" style={{ color: 'black' }}>or</h6>
                                    <div className="has-text-centered">
                                        <FacebookLogin
                                        appId="2592172307680593"
                                        textButton="Facebook"
                                        fields="name,email,picture"
                                        callback={this.responseFacebook}
                                       
                                        />

                                        <GoogleLogin
                                        clientId="1053001575331-5i7g01suk8u80v53vcfid9osjqasenkv.apps.googleusercontent.com"
                                        buttonText="Google"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                       
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(SignUp)