import React from 'react';
import {HashRouter, Link} from 'react-router-dom'

export default function Dashboard(){

  return (
        
    <div class="all-wrapper with-side-panel solid-bg-all">
      <div class="layout-w">
        
        <div class="menu-w color-scheme-light color-style-transparent menu-position-side menu-side-left menu-layout-compact sub-menu-style-over sub-menu-color-bright selected-menu-color-light menu-activated-on-hover menu-has-selected-link">
          <div class="logo-w">
             <div class="logo-w menu-size">
                 <Link class="logo" to="/dashboard">
                <img src="./logos2.png" alt="logo" width="100%"/>
                </Link>
          </div>
          </div>

          <h1 class="menu-page-header">
            Page Header
          </h1>
          <ul class="main-menu">
            <li class="selected">
              <Link to="/dashboard">
                <div class="icon-w">
                  <div class="os-icon os-icon-layout"></div>
                </div>
                <span>Dashboard</span></Link>
            
            </li>
            <li class="">
              <Link to="/dashboard">
                <div class="icon-w">
                  <div class="os-icon os-icon-layers"></div>
                </div>
                <span>Web GIS Portal</span></Link>
            </li>
            <li class="">
              <Link to="/dashboard">
                <div class="icon-w">
                  <div class="os-icon os-icon-layers"></div>
                </div>
                <span>Network Tracing</span></Link>
            </li> 
              <li class="">
              <Link to="/dashboard">
                <div class="icon-w">
                  <div class="os-icon os-icon-layers"></div>
                </div>
                <span>Outage Management</span></Link>
            </li>  
               <li class="">
              <Link to="/dashboard">
                <div class="icon-w">
                  <div class="os-icon os-icon-layers"></div>
                </div>
                <span>CP System</span></Link>
            </li> 
              
                 <li class="">
              <Link to="/dashboard">
                <div class="icon-w">
                  <div class="os-icon os-icon-layers"></div>
                </div>
                <span>Gas Leak Analysis</span></Link>
            </li> 
                  <li class="">
              <Link to="/dashboard">
                <div class="icon-w">
                  <div class="os-icon os-icon-layers"></div>
                </div>
                <span>SAP GIS Server</span></Link>
            </li> 
              
                   <li class="">
              <Link to="/dashboard">
                <div class="icon-w">
                  <div class="os-icon os-icon-layers"></div>
                </div>
                <span>Inventory Reporting</span></Link>
            </li>
          
          
          
        
           
          </ul>
        
        </div>
        
        <div class="content-w">
      
          
          <ul class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/dashboard">Home</Link>
            </li>
            <li class="breadcrumb-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
           
          </ul>
          
          <div class="content-i">
            <div class="content-box">
              
   
              <div class="row">
                <div class="col-sm-8 col-xxxl-9">
                  <div class="element-wrapper">
                    <h6 class="element-header">
                      PNG Projections
                    </h6>
                    <div class="element-box">
                      <div class="os-tabs-w">
                        <div class="os-tabs-controls">
                          <ul class="nav nav-tabs smaller">
                            <li class="nav-item">
                              <a class="nav-link active" data-toggle="tab" href="#tab_overview">PNG Penetration</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" data-toggle="tab" href="#tab_sales">CA Wise PNG Penetration</a>
                            </li>
                          </ul>
                          <ul class="nav nav-pills smaller d-none d-md-flex">
                            <li class="nav-item">
                              <a class="nav-link" data-toggle="tab" href="#">Today</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link active" data-toggle="tab" href="#">7 Days</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" data-toggle="tab" href="#">14 Days</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" data-toggle="tab" href="#">Last Month</a>
                            </li>
                          </ul>
                        </div>
                        <div class="tab-content">
                          <div class="tab-pane active" id="tab_overview">
                            <div class="el-tablo bigger">
                              <div class="label">
                                PNG Projection
                              </div>
                            </div>
                            <div class="el-chart-w">
                              <canvas height="150px" id="lineChart" width="600px"></canvas>
                            </div>
                          </div>
                          <div class="tab-pane" id="tab_sales"></div>
                          <div class="tab-pane" id="tab_conversion"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          
              </div>
 
                
                
                
            </div>
      
          </div>
        </div>
      </div>
      </div>
  )}