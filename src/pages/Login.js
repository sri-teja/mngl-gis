import React from 'react';
import Layout from '../components/Layout'

export default function Login(){

	return (
			<Layout>
			<div className="all-wrapper menu-side with-pattern">
						<div className="row">
							<div className="col-6">  
							</div>
						<div className="col-6">  
						<div className="auth-box-w">
							<div className="logo-w pb-4">
								<a href="/map"><img alt="" src="./mngl.png" width="50%"/></a>
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
										<a className="btn btn-primary" href="/map">Log in</a>
								</div>
							</form>
							</div>
							</div>
						</div>
					</div>
					</Layout>
			)}