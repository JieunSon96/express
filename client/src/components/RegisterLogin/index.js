// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// //import { response } from 'express';
// import { loginUser } from '../../actions/user_actions'
// import { googleLoginUser } from '../../actions/user_actions'
// import { Link } from 'react-router-dom';
// class RegisterLogin extends Component {

//     state = {
//         email: "",
//         password: "",
//         errors: []
//     };

//     displayErrors = errors =>
//         errors.map((error, i) => <p key={i}>{error}</p>)

//     handleChange = event => {
//         this.setState({ [event.target.name]: event.target.value })
//     }

//     //Google Login Request
//     googleSubmitForm = event =>{
//         event.preventDefault();

//     //  let dataToSubmit = {
//     //         email: this.state.email,
//     //         password: this.state.password
//     //     };

//         if (this.isFormvalid(this.state)) {
//             this.setState({ errors: [] })
//             this.props.dispatch(googleLoginUser())
//                 // .then(response => {
//                 //     if (response.payload.loginSuccess) {
//                 //         this.props.history.push('/')
//                 //     } else {
//                 //         this.setState({
//                 //             errors: this.state.errors.concat(
//                 //                 "Failed to log in, you can check your Email and Password"
//                 //             )
//                 //         })
//                 //     }

//                 // }
//                 // )
               

//         }else{
//             this.setState({
//                 errors:this.state.errors.concat('Form is not valid')
//             })
//         }

//     }

//     submitForm = event => {
//         event.preventDefault();
       
//         let dataToSubmit = {
//             email: this.state.email,
//             password: this.state.password
//         };
        
//         if (this.isFormvalid(this.state)) {
//             this.setState({ errors: [] })
//             this.props.dispatch(loginUser(dataToSubmit))
//                 .then(response => {
//                     if (response.payload.loginSuccess) {
//                         this.props.history.push('/')
//                     } else {
//                         this.setState({
//                             errors: this.state.errors.concat(
//                                 "Failed to log in, you can check your Email and Password"
//                             )
//                         })
//                     }

//                 }
//                 )

//         }else{
//             this.setState({
//                 errors:this.state.errors.concat('Form is not valid')
//             })
//         }
//     }

//     isFormvalid = ({ email, password }) => email && password;


//     render() {
//         return (
//             <div className="container">
//                 <h2>Log In</h2>
//                 <div className="row">
//                     <form className="col s12" onSubmit={event => this.submitForm(event)}>
//                         <div className="row">
//                             <div className="input-field col s12">
//                                 <input name="email" id="email" value={this.state.email} onChange={e => this.handleChange(e)}
//                                     type="email" className="validate" />
//                                 <label htmlFor="email">Email</label>
//                                 <span className="helper-text" data-error="Type a right type email" data-success="right" />
//                             </div>
//                         </div>

//                         <div className="row">
//                             <div className="input-field col s12">
//                                 <input name="password" id="password" value={this.state.password} onChange={e => this.handleChange(e)}
//                                     type="password" className="validate" />
//                                 <label htmlFor="email">Password</label>
//                                 <span className="helper-text" data-error="Wrong" data-success="right" />

//                             </div>

//                         </div>

//                         {this.state.errors.length > 0 && (
//                             <div>
//                                 {this.displayErrors(this.state.errors)}

//                             </div>

//                         )}



//                         <div className="row">
//                             <div className="col s12">
//                                 <button className="btn waves-effect red" type="submit" name="action" onClick={this.submitForm}>
//                                     Login
//                                 </button>&nbsp;&nbsp;&nbsp;
//                                 <button className="btn waves-effect blue" type="submit" name="action" onClick={this.googleSubmitForm}>
//                                     Google Login
//                                 </button>&nbsp;&nbsp;&nbsp;
//                                 <Link to="/register">
//                                 <button className="btn waves-effect red" type="submit" name="action">
//                                     Sign up
//                                 </button>
//                                 </Link>
//                             </div> 
//                             <div className="col s6">
                                
//                             </div>
//                         </div>
//                     </form>
//                 </div>

//             </div>

//         );
//     }
// }

// function mapStateToProps(state) {
//     return {
//         user: state.user
//     }
// }

// export default connect(mapStateToProps)(RegisterLogin);