import React, { Component } from 'react'
import AuthenticationService from "./AuthenticationService.js"

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "default",
            password: "",
            hasLoginFailed: false,
            showSuccessMessage: false,
        }

        // bind function to class
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    // change text fields
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        )
    }

    // login action
    loginClicked() {
        AuthenticationService
        .executeJwtAuthenticationService(this.state.username, this.state.password)
        .then((response) => {
            AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
            this.props.history.push(`/welcome/${this.state.username}`)
        }).catch(() => {
            this.setState({showSuccessMessage: false, hasLoginFailed: true})
        })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className='conainter'>
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Success message</div>}

                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>

                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent