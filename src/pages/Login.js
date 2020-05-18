import React from 'react';
import {HashRouter, Link} from 'react-router-dom'

export default function Login(){

	return (
		    <HashRouter basename="/">
		    <div class="auth-wrapper">
			<div className="all-wrapper menu-side with-pattern">
						<div className="row">
							<div className="col-6">  
							</div>
						<div className="col-6">  
						<div className="auth-box-w">
							<div className="logo-w pb-4">
								<Link to="/map"><img alt="mngl logo" src="./mngl.png" width="50%"/></Link>
							</div>
							<h4 className="auth-header">
								Enterprise Integrity Asset Management System at MNGL
							</h4>
							<form action="">
								<div className="form-group">
									<label for="">Username</label><input className="form-control" placeholder="Enter your username" type="text"/>
									<div className="pre-icon os-icon os-icon-user-male-circle"></div>
								</div>
								<div className="form-group">
									<label for="">Password</label><input className="form-control" placeholder="Enter your password" type="password"/>
									<div className="pre-icon os-icon os-icon-fingerprint"></div>
								</div>
								<div className="buttons-w">
										<Link className="btn btn-primary" to="/map">Log in</Link>
								</div>
							</form>
							</div>
							</div>
						</div>
					</div>
					</div>
			</HashRouter>

			)}