import React, { useEffect, useRef } from 'react';
import {HashRouter, Link} from 'react-router-dom'

import { loadModules, setDefaultOptions } from 'esri-loader';
import Layout from '../components/Layout'

// configure esri-loader to lazy load the CSS
// the fisrt time any react-arcgis components are rendered
setDefaultOptions({ css: true });

export default function FeatureLayer() {
	const mapRef = useRef();
	const NasikMapRef = useRef();

	function update_visible(layer, layerToggle){
        	console.log("called");
        	layer.visible = layerToggle.checked;
        }

	useEffect(
	  () => {
		// lazy load the required ArcGIS API for JavaScript modules and CSS
		loadModules(['esri/WebMap',
			'esri/views/MapView',
			"esri/layers/FeatureLayer",
			"esri/layers/TileLayer",
			"esri/widgets/BasemapGallery",
			"esri/widgets/Fullscreen",
			"esri/widgets/Legend",
	        "esri/widgets/Bookmarks",
	        "esri/widgets/Expand",
			"dojo/dom",
			"dojo/dom-construct",
			"dojo/_base/window",
        	"dojo/on",
        	"dojo/domReady!"], { css: true })
		.then(([Map, SceneView, FeatureLayer, TileLayer, BasemapGallery, Fullscreen, Legend, Bookmarks, Expand, dom, domConstruct, win, on]) => {

        // Pune Map Layers
        var pune_url = "https://services9.arcgis.com/ebPPrQFcKVwm9MTO/ArcGIS/rest/services/CGD_April_2020/FeatureServer/";
        var pune_layers = [
        	{"layer_name": "Valve", "layer_id": 0},
			{"layer_name": "TF", "layer_id": 1},
			{"layer_name": "Service_Regulator", "layer_id": 2},
			{"layer_name": "Regulating_Station", "layer_id": 3},
			{"layer_name": "Pipeline_Marker", "layer_id": 4},
			{"layer_name": "Gas_Station", "layer_id": 5},
			{"layer_name": "Gail_RT", "layer_id": 6},
			{"layer_name": "Fitting", "layer_id": 7},
			{"layer_name": "Filter", "layer_id": 8},
			{"layer_name": "Dispenser", "layer_id": 9},
			{"layer_name": "Compressor", "layer_id":10},
			{"layer_name": "Commercial_Meter", "layer_id":11},
			{"layer_name": "CNG_Station", "layer_id":12},
			{"layer_name": "Pipeline", "layer_id":13},
			{"layer_name": "OFC", "layer_id":14},
			{"layer_name": "PNG_CNG_Projection ", "layer_id":15},
			{"layer_name": "MUNICIPAL_ZONE", "layer_id":16},
			{"layer_name": "MNGL_GA", "layer_id":17},
        ]
        // Nasik Map Layers
        var nasik_url = "https://services9.arcgis.com/ebPPrQFcKVwm9MTO/arcgis/rest/services/Nasik_CGD_WFL1/FeatureServer/";
        var nasik_layers = [
        	{"layer_name": "GAIL_SV", "layer_id": 0},
        	{"layer_name": "GAIL_IP", "layer_id": 1},
        	{"layer_name": "Potential_Location", "layer_id": 2},
			{"layer_name": "Ambadi_MIDC", "layer_id": 3},
			{"layer_name": "Igatpura_MDPE", "layer_id": 4},
			{"layer_name": "Sinner_MDPE_Line", "layer_id": 5},
			{"layer_name": "Satpura_MDPE", "layer_id": 6},
			{"layer_name": "Propo_MDPE", "layer_id": 7},
			{"layer_name": "Propo_Steel", "layer_id": 8},
			{"layer_name": "PNGRB_NG_PL", "layer_id": 9},
			{"layer_name": "Nasik_GRID_500X500", "layer_id": 10},
			{"layer_name": "Nasik_GRID_1X1", "layer_id": 11},
			{"layer_name": "Nasik_GRID_5X5", "layer_id": 12},
			{"layer_name": "Utility", "layer_id": 13},
			{"layer_name": "Landmarks", "layer_id": 14},
			{"layer_name": "Road_Edge", "layer_id": 15},
			{"layer_name": "Road", "layer_id": 16},
			{"layer_name": "Buildings", "layer_id": 17},
			{"layer_name": "Water_Body", "layer_id": 18},
			{"layer_name": "Agriculture_Land", "layer_id": 19},
			{"layer_name": "Road_Divider", "layer_id": 20},
			{"layer_name": "Parks_Garden", "layer_id": 21},
			{"layer_name": "Colony_Boundary", "layer_id": 22},
			{"layer_name": "Nasik_MC_Boundary", "layer_id": 23},
			{"layer_name": "Nasik_CA", "layer_id": 24},
			{"layer_name": "Nasik_GA", "layer_id": 25}
        ];

        var map = new Map({
        	basemap: "gray-vector"
          // portalItem: {
          //   id: "56b5bd522c52409c90d902285732e9f1"
          // }
        });

        var nasik_map = new Map({
        	basemap: "gray-vector"
          // portalItem: {
          //   id: "56b5bd522c52409c90d902285732e9f1"
          // }
        });
        
        var view = new SceneView({
          container: mapRef.current,
          center: [73.82, 18.6],
		  zoom: 10,
		  map: map,
        });

        var nasik_view = new SceneView({
          container: NasikMapRef.current,
          center: [73.7, 19.9],
		  zoom: 10,
		  map: nasik_map,
        });

        view.when(function() {
            // change display 
            dom.byId("checkboxes").style.display = "block";
            view.ui.add(dom.byId("checkboxes"), "top-left");
			view.ui.add(
	            [ new Expand({
	                view: view,
	                content: new Legend({ view: view }),
	                group: "top-right",
	                expanded: true
	              }),
	            ], "top-right");
			//create checkboxes and load layers
			pune_layers.forEach((layer, index) =>{
				console.log(index, layer);
				var new_layer = new FeatureLayer({
		        		"url": pune_url + String(layer.layer_id),
		        		"id": layer.layer_name,
		        		"visible": false
		        	})
				if(index==16){
					new_layer.visible = true;
				}
			
	        	map.add(new_layer);
	        	//create checkbox for each layer
	        	var c = domConstruct.place("<span style=\"background-color: #fff\"><input id='"+String(layer.layer_name)+"' type='checkbox' style=\"margin: 10px;\"/><b style=\"margin-right: 10px;\">"+ String(layer.layer_name) + "</b></span><br/>", dom.byId("checkboxes"));
	        	var layerToggle = dom.byId(String(layer.layer_name));
	        	on(layerToggle, "change", () => {update_visible(new_layer, layerToggle)});

	        	})
				var first_layer = dom.byId(pune_layers[16]["layer_name"]);
		        first_layer.checked = true;

        });

        nasik_view.when(function() {
            // change display 
            dom.byId("nasik_checkboxes").style.display = "block";
            nasik_view.ui.add(dom.byId("nasik_checkboxes"), "top-left");
			nasik_view.ui.add(
	            [ new Expand({
	                view: nasik_view,
	                content: new Legend({ view: nasik_view }),
	                group: "top-right",
	                expanded: true
	              }),
	            ], "top-right");

			//create checkboxes and load layers
			nasik_layers.forEach((layer, index) =>{
				console.log(index, layer);
				var new_layer = new FeatureLayer({
		        		"url": nasik_url + String(layer.layer_id),
		        		"id": layer.layer_name,
		        		"visible": false
		        	})
				if(index==24){
					new_layer.visible = true;
				}
			
	        	nasik_map.add(new_layer);
	        	//create checkbox for each layer
	        	var c = domConstruct.place("<span style=\"background-color: #fff\"><input id='"+String(layer.layer_name)+"' type='checkbox' style=\"margin: 4px;\"/><b style=\"margin-right: 10px;\">"+ String(layer.layer_name) + "</b></span><br/>", dom.byId("nasik_checkboxes"));
	        	var layerToggle = dom.byId(String(layer.layer_name));
	        	on(layerToggle, "change", () => {update_visible(new_layer, layerToggle)});

	        	})
				var first_layer = dom.byId(nasik_layers[24]["layer_name"]);
		        first_layer.checked = true;
        });

		  return () => {
			if (view) {
			  // destroy the map view
			  view.container = null;
			}
		  };
		});
	  }, []);

	return (
		<React.Fragment>
			<div class="all-wrapper with-side-panel solid-bg-all">
	  <div class="layout-w">
		
		<div class="menu-w color-scheme-light color-style-transparent menu-position-side menu-side-left menu-layout-compact sub-menu-style-over sub-menu-color-bright selected-menu-color-light menu-activated-on-hover menu-has-selected-link">
		  <div class="logo-w">
			 <div class="logo-w menu-size">
				 <Link class="logo" to="/map">
				<img src="./logos2.png" alt="logo" width="100%"/>
				</Link>
		  </div>
		  </div>

		  <h1 class="menu-page-header">
			Page Header
		  </h1>
		  <ul class="main-menu">
			<li class="selected">
			  <Link to="/map">
				<div class="icon-w">
				  <div class="os-icon os-icon-layout"></div>
				</div>
				<span>Dashboard</span></Link>
			
			</li>
			<li class="">
			  <Link to="/map">
				<div class="icon-w">
				  <div class="os-icon os-icon-layers"></div>
				</div>
				<span>Web GIS Portal</span></Link>
			</li>
			<li class="">
			  <Link to="/map">
				<div class="icon-w">
				  <div class="os-icon os-icon-layers"></div>
				</div>
				<span>Network Tracing</span></Link>
			</li> 
			  <li class="">
			  <Link to="/map">
				<div class="icon-w">
				  <div class="os-icon os-icon-layers"></div>
				</div>
				<span>Outage Management</span></Link>
			</li>  
			   <li class="">
			  <Link to="/map">
				<div class="icon-w">
				  <div class="os-icon os-icon-layers"></div>
				</div>
				<span>CP System</span></Link>
			</li> 
			  
				 <li class="">
			  <Link to="/map">
				<div class="icon-w">
				  <div class="os-icon os-icon-layers"></div>
				</div>
				<span>Gas Leak Analysis</span></Link>
			</li> 
				  <li class="">
			  <Link to="/map">
				<div class="icon-w">
				  <div class="os-icon os-icon-layers"></div>
				</div>
				<span>SAP GIS Server</span></Link>
			</li> 
			  
				   <li class="">
			  <Link to="/map">
				<div class="icon-w">
				  <div class="os-icon os-icon-layers"></div>
				</div>
				<span>Inventory Reporting</span></Link>
			</li>
		  </ul>
		
		</div>
		
		<div class="content-w">


            
            <div class="top-bar color-scheme-light">
            <ul>
              <li class="active">
                <a href="#">Map</a>
              </li>    
              <li>
                <a href="#">Network</a>
              </li>
              <li>
                <a href="#">Outage Management</a>
              </li>
              <li>
                <a href="#">CP Management</a>
              </li>
              <li>
                <a href="#">Gas Leak Analysis</a>
              </li>   
              <li>
                <a href="#">GIS SAP Inetgration</a>
              </li>      
            </ul>
          </div>
         

	  
		  
		  <ul class="breadcrumb">
			<li class="breadcrumb-item">
			  <Link to="/map">Home</Link>
			</li>
			<li class="breadcrumb-item">
			  <Link to="/map">Dashboard</Link>
			</li>
		   
		  </ul>
		  
		  <div class="content-i">
			<div class="content-box pt-2">
				
				<div class="control-header">
                <div class="row align-items-center">
                
            
                  <div class="col-12 col-lg-12">
                    <a class="btn btn-sm btn-link btn-upper" href="#"><i class="fa fa-map mr-1"></i><span>Base Map</span></a>
                    
                    <a class="btn btn-sm btn-link btn-upper" href="#"><i class="fa fa-map-marker mr-1"></i><span>My Location</span></a>
                      
                    <a class="btn btn-sm btn-link btn-upper" href="#"><i class="fa fa-search-plus mr-1"></i><span>Zoom In</span></a>  
                      
                    <a class="btn btn-sm btn-link btn-upper" href="#"><i class="fa fa-search-minus mr-1"></i><span>Zoom Out</span></a>  
                      
                     <a class="btn btn-sm btn-link btn-upper" href="#"><i class="fa fa-search mr-1"></i><span>Search</span></a> 
                      
                      <a class="btn btn-sm btn-link btn-upper" href="#"><i class="fa fa-street-view mr-1"></i><span>Near By</span></a> 
                      
                      
                      <a class="btn btn-sm btn-link btn-upper" href="#"><i class="fa fa-print mr-1"></i><span>Map Print</span></a> 
                      
                      <a class="btn btn-sm btn-link btn-upper" href="#"><i class="fa fa-file mr-1"></i><span>Report</span></a> 
                      
                  </div>
                </div>
              </div>

				<div class="row">
				<div class="col-sm-12 col-xxxl-12">
				  <div class="element-wrapper">
					<h6 class="element-header">
					  Pipeline Asset Dashboard
					</h6>
					<div class="os-tabs-w">
						<div class="os-tabs-controls">
						  <ul class="nav nav-tabs smaller">
							<li class="nav-item">
							  <a class="nav-link active" data-toggle="tab" href="#pune_map"><b>PUNE</b></a>
							</li>
							<li class="nav-item">
							  <a class="nav-link" data-toggle="tab" href="#nasik_map"><b>NASHIK</b></a>
							</li>
						  </ul>
						</div>
						<div class="tab-content">
						  <div class="tab-pane active" id="pune_map">
								<div className="webmap" style={{height: "700px"}} ref={mapRef}></div>
						  </div>
						  <div class="tab-pane" id="nasik_map">
						  		<div className="webmap" style={{height: "700px"}} ref={NasikMapRef}></div>
						  </div>
						</div>
					  </div>

					<div class="element-box pt-0 mt-0">
						<div id="checkboxes" style={{display: "none", backgroundColor: "white"}}></div>

						<div id="nasik_checkboxes" style={{display: 'none', backgroundColor: "white"}}></div>
						
						
					</div>
					</div>
					</div>
					</div>
 
				
				
				
			</div>
	  
		  </div>
		</div>
	  </div>
	  </div>
			
			
			</React.Fragment>
	)

};