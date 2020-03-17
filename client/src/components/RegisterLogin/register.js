// import React, { Component } from 'react';
// import { registerUser } from '../../actions/user_actions';
// import {connect} from 'react-redux';
// class register extends Component {
//     state = {
//         lastname:"",
//         name:"",
//         email: "",
//         password: "",
//         passwordConfirmation:"",
//         errors: []
//     };

//     displayErrors = errors =>
//     errors.map((error, i) => <p key={i}>{error}</p>)

//     isFormValid = () => {
//         let errors = [];
//         let error;

//         if(this.isFormEmpty(this.state)){
//           error = {message:"Fill in all fields"};
//           this.setState({errors:errors.concat(error)});
//         }else if(!this.isPasswordValid(this.state)){
//              error = {message:"Password is invalid"};
//              this.setState({errors:errors.concat(error)});
//         }else{
//             return true;
//         }
//     }

//     isPasswordValid = ({password, passwordConfirmation}) =>{
//         if(password.length <6 || passwordConfirmation.length <6 ){
//             return false;
//         }else if(password !== passwordConfirmation){
//             return false;
//         }else{
//             return true;
//         }
//     }


//     isFormEmpty = ({ lastname, name, email, password, passwordConfirmation}) =>{
//         return (
//             !name.length || !lastname.length || !email.length || !password.length || !passwordConfirmation.length
//         );
//     }

//     handleChange = event => {
//         this.setState({ [event.target.name]: event.target.value })
//     }

//     submitForm =event=> {
//         event.preventDefault();

//         let dataToSubmit = {
//             email :this.state.email,
//             name : this.state.name,
//             lastname: this.state.lastname,
//             password: this.state.password,
//             passwordConfirmation : this.state.passwordConfirmation
//         }

         
//         if(this.isFormValid()){
//            this.setState({errors:[]})
//            //if you don't want to use Redux, just use axios here.
//            this.props.dispatch(registerUser(dataToSubmit))
//            .then(response => {
//                if(response.payload.success){
//                  this.props.history.push('/login')
//                }else{
//                 this.setState({
//                     errors:this.state.errors.concat("your attempt to send data to DB was failed")
//                 })
//                }
//            })

//            .catch(err => {
//                this.setState({
//                    errors:this.state.errors.concat(err)
//                });
//            })
//         }else{
//             console.error("Form is not valid");
//         }
//     }


//     render() {
//         return (
//             <div className="container">
//             <h2>Sign up</h2>
//             <div className="row">
//                 <form className="col s12" onSubmit={event => this.submitForm(event)}>
//                     <div className="row">
//                         <div className="input-field col s12">
//                             <input name="lastname" id="lastname" value={this.state.lastname} onChange={e => this.handleChange(e)}
//                                 type="text" className="validate" />
//                             <label htmlFor="lastname">lastname</label>
//                             <span className="helper-text" data-error="Type a right type email" data-success="right" />
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="input-field col s12">
//                             <input name="name" id="name" value={this.state.name} onChange={e => this.handleChange(e)}
//                                 type="text" className="validate" />
//                             <label htmlFor="name">name</label>
//                             <span className="helper-text" data-error="Wrong" data-success="right" />

//                         </div>

//                     </div>

//                     <div className="row">
//                         <div className="input-field col s12">
//                             <input name="email" id="email" value={this.state.email} onChange={e => this.handleChange(e)}
//                                 type="text" className="validate" />
//                             <label htmlFor="email">email</label>
//                             <span className="helper-text" data-error="Wrong" data-success="right" />

//                         </div>

//                     </div>

//                     <div className="row">
//                         <div className="input-field col s12">
//                             <input name="password" id="password" value={this.state.password} onChange={e => this.handleChange(e)}
//                                 type="password" className="validate" />
//                             <label htmlFor="password">password</label>
//                             <span className="helper-text" data-error="Wrong" data-success="right" />

//                         </div>

//                     </div>

//                     <div className="row">
//                         <div className="input-field col s12">
//                             <input name="passwordConfirmation" id="passwordConfirmation" value={this.state.passwordConfirmation} onChange={e => this.handleChange(e)}
//                                 type="password" className="validate" />
//                             <label htmlFor="passwordConfirmation">passwordConfirmation</label>
//                             <span className="helper-text" data-error="Wrong" data-success="right" />

//                         </div>

//                     </div>


//                     {this.state.errors.length > 0 && (
//                         <div>
//                             {this.displayErrors(this.state.errors)}

//                         </div>
//                     )}



//                     <div className="row">
//                         <div className="col s12">
//                             <button className="btn waves-effect red" type="submit" name="action" onClick={this.submitForm}>
//                                 Create an account
//                             </button>
//                         </div> 
//                         <div className="col s6">
                            
//                         </div>
//                     </div>


//                 </form>
//             </div>

//         </div>
//         );
//     }
// }

// export default connect()(register);