import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
//import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userServices';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPass: false,
            errMessage: '',
        }
    }
    handleOnChangeInput = (event) => {
        this.setState({ email: event.target.value })
    }
    handleOnChangePass = (event) => {
        this.setState({ password: event.target.value })
    }
    handleLogin = async () => {
        // console.log('email >> ' + this.state.email, 'password >>' + this.state.password);
        // console.log('all state ', this.state);
        // console.log('email >> ' + this.state.email);
        // console.log('password >>' + this.state.password)
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.email, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            } if (data && data.errCode == 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }
    handleShowHidePass = () => {
        this.setState({
            isShowPass: !this.state.isShowPass
        })
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col12 text-center text-login'>Login</div>
                        <div className='col-12 form-group'>
                            <label>Email :</label>
                            <input type='text' className='form-control login-input' placeholder='Enter email' value={this.state.email}
                                onChange={(event) => { this.handleOnChangeInput(event) }} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password :</label>
                            <div className='custom-input'>
                                <input type={this.state.isShowPass ? "text" : "password"} className='form-control' placeholder='Enter Password' value={this.state.password}
                                    onChange={(event) => { this.handleOnChangePass(event) }} />
                                <span onClick={() => { this.handleShowHidePass() }}>
                                    <i class={this.state.isShowPass ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }} >Login</button>
                        </div>
                        <div className='col-12 mt-5'>
                            <span className='forgot'>Forgot your password ?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span>Or Login with</span>
                        </div>
                        <div className='col-12 social'>
                            <i class="fab fa-facebook facebook"></i>
                            <i class="fab fa-google-plus-square google"></i>
                            <i class="fab fa-linkedin linkedin"></i>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
