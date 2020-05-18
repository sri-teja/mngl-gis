import React, { useEffect, useRef } from 'react';
import {HashRouter, Link} from 'react-router-dom'

import { loadModules, setDefaultOptions } from 'esri-loader';
import Layout from '../components/Layout'

// configure esri-loader to lazy load the CSS
// the fisrt time any react-arcgis components are rendered
setDefaultOptions({ css: true });

export default function WebMapView() {
    const mapRef = useRef();

    useEffect(
      () => {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView', "esri/layers/GeoJSONLayer"], { css: true })
        .then(([Map, MapView, GeoJSONLayer]) => {

       	const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

       	const template = {
          title: "Earthquake Info",
          content: "Magnitude {mag} {type} hit {place} on {time}",
          fieldInfos: [
            {
              fieldName: "time",
              format: {
                dateFormat: "short-date-short-time"
              }
            }
          ]
        };

        const renderer = {
          type: "simple",
          field: "mag",
          symbol: {
            type: "simple-marker",
            color: [226, 119, 40],
            outline: {
              color: "light-gray",
              width: 0.5
            }
          },
          visualVariables: [
            {
              type: "size",
              field: "mag",
              stops: [
                {
                  value: 2.5,
                  size: "4px"
                },
                {
                  value: 8,
                  size: "40px"
                }
              ]
            }
          ]
        };


        const geojsonLayer = new GeoJSONLayer({
          url: url,
          copyright: "USGS Earthquakes",
          popupTemplate: template,
          renderer: renderer //optional
        });

        const map = new Map({
          basemap: "dark-gray",
        });

        const view = new MapView({
          container: mapRef.current,
          center: [78.9, 20.45],
          zoom: 4,
          map: map
        });

        map.add(geojsonLayer);  

        // adds the layer to the map

          // const map = new ArcGISMap({
          //   basemap: 'dark-gray',
          // });

          // // load the map view at the ref's DOM node
          // const view = new MapView({
          //   container: mapRef.current,
          //   map: map,
          //   center: [18.73, 15.45],
          //   zoom: 3
          // });

	      // var basemapGallery = new BasemapGallery({
	      //   view: view,
	      //   source: {
	      //     portal: {
	      //       url: "https://www.arcgis.com",
	      //       useVectorBasemaps: false  // Load vector tile basemaps
	      //     }
	      //   }
	      // });

	      // view.ui.add(basemapGallery, "top-right");
	     //  var url = "https://curecovid19.in/readings/readings/world_stats"
	     //  const getData = async () => {
	     //  	var promise = await fetch(url).then(res=> res.json());
	     //  	await Promise.resolve(promise).then(results => {
	     //  		  var data = results.data;
	     //  		  console.log(data);
	     //  		  data.forEach(element => {
	     //  		  		if(element.confirmed > 20000){
			   //    		  	  var point = new Point([element.lon,element.lat]);
						// 	  // var circleGeometry = new Circle(point,{
						// 	  //   "radius": parseInt(element.confirmed) * 1000
						// 	  // });
						// 	   var markerSymbol = {
						// 		  	type: "simple-marker",
						// 	        color: [226, 119, 40],  // orange
						// 	        outline: {
						// 	           color: [255, 255, 255], // white
						// 	           width: 0.5
						// 	        },
						// 	        size: parseInt(element.confirmed)/4000
						// 		};

						// 	  	var popupTemplate = new PopupTemplate({
						// 		  // autocasts as new PopupTemplate()
						// 		  title: "",
						// 		  content: "<h4> Place : " + String(element.place) + "</h4>"+
						// 		  			"<h6> Confirmed : " + String(element.confirmed) + "</h6>"+
						// 		  			"<h6> Recovered : " + String(element.recovered) + "</h6>"+
						// 		  			"<h6> Deaths : " + String(element.deaths) + "</h6>"
								  
						// 		});
						// 		  var graphicsLayer = new GraphicsLayer();
						//        	  map.add(graphicsLayer);

						//        	  var pointGraphic = new Graphic({
						// 	         geometry: point,
						// 	         symbol: markerSymbol,
						// 	         popupTemplate: popupTemplate
						// 	       });

						//        graphicsLayer.add(pointGraphic);
						// }
	     //  		  })
	      		  
	     //  	})
	     //  }
	     //  getData();
	      

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
      
          
          <ul class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/map">Home</Link>
            </li>
            <li class="breadcrumb-item">
              <Link to="/map">Dashboard</Link>
            </li>
           
          </ul>
          
          <div class="content-i">
            <div class="content-box">
              	
              	<div class="row">
                <div class="col-sm-12 col-xxxl-12">
                  <div class="element-wrapper">
                    <h6 class="element-header">
                      Pipeline Asset Dashboard
                    </h6>
                    <div class="element-box">
   						<div className="webmap" style={{height: "650px"}} ref={mapRef}></div>
   					</div>
   					</div>
   					</div>
   					</div>

              <div class="row">
                <div class="col-sm-12 col-xxxl-12">
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
    		
    		
    		</React.Fragment>
    )

};