import React, { useEffect, useRef } from 'react';
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
        loadModules(['esri/Map', 'esri/views/MapView', "esri/widgets/BasemapGallery", "esri/geometry/Circle", "esri/geometry/Point", "esri/Graphic",
      "esri/layers/GraphicsLayer", "esri/PopupTemplate"], { css: true })
        .then(([ArcGISMap, MapView, BasemapGallery, Circle, Point, Graphic, GraphicsLayer, PopupTemplate]) => {

          const map = new ArcGISMap({
            basemap: 'dark-gray',
          });

          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [18.73, 15.45],
            zoom: 3
          });

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
	      var url = "https://curecovid19.in/readings/readings/world_stats"
	      const getData = async () => {
	      	var promise = await fetch(url).then(res=> res.json());
	      	await Promise.resolve(promise).then(results => {
	      		  var data = results.data;
	      		  console.log(data);
	      		  data.forEach(element => {
	      		  		if(element.confirmed > 20000){
			      		  	  var point = new Point([element.lon,element.lat]);
							  // var circleGeometry = new Circle(point,{
							  //   "radius": parseInt(element.confirmed) * 1000
							  // });
							   var markerSymbol = {
								  	type: "simple-marker",
							        color: [226, 119, 40],  // orange
							        outline: {
							           color: [255, 255, 255], // white
							           width: 0.5
							        },
							        size: parseInt(element.confirmed)/4000
								};

							  	var popupTemplate = new PopupTemplate({
								  // autocasts as new PopupTemplate()
								  title: "",
								  content: "<h4> Place : " + String(element.place) + "</h4>"+
								  			"<h6> Confirmed : " + String(element.confirmed) + "</h6>"+
								  			"<h6> Recovered : " + String(element.recovered) + "</h6>"+
								  			"<h6> Deaths : " + String(element.deaths) + "</h6>"
								  
								});
								  var graphicsLayer = new GraphicsLayer();
						       	  map.add(graphicsLayer);

						       	  var pointGraphic = new Graphic({
							         geometry: point,
							         symbol: markerSymbol,
							         popupTemplate: popupTemplate
							       });

						       graphicsLayer.add(pointGraphic);
						}
	      		  })
	      		  
	      	})
	      }
	      getData();
	      

          return () => {
            if (view) {
              // destroy the map view
              view.container = null;
            }
          };
        });
      }, []);

    return (
    	<Layout>
    		<div className="webmap" style={{height: "675px"}} ref={mapRef} />
    	</Layout>
    )

};