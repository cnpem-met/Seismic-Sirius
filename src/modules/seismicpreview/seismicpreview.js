import React, {Component} from 'react';
import './seismicpreview.css';
import CanvasJSReact from './canvasjs/canvasjs.react';
import $ from 'jquery';

import {hideAxys} from './actions/actions';
import LoadGif from '../loadGif/loadgif';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class SeismicPreview extends Component{

    constructor(props){
        super(props);
        this.state = {channel: [], startTime: 0, lastRequisition: "first"};
        this.setPreview();
    }

    setPreview(){
        fetch(`http://10.0.38.242/api/seismic${this.props.type}.php?channel=${this.props.channel}&requisition=${this.props.requisition}`)
            .then((response) => response.json())
            .then((responseJson) => {
                 this.setState({
                     channel: responseJson.channel,
                     startTime: responseJson.startTime,
                     lastRequisition: this.props.requisition
                 });
            })
    }

    componentDidUpdate(){
        if(this.state.lastRequisition !== this.props.requisition)
            this.setPreview()
    }

    render(){

        var data = [];
        var dataPoints = [];
        var dataSeries = {type: "line", lineColor: "rgb(1, 176, 117)"};
        var time = parseFloat(this.state.startTime);

        this.state.channel.forEach(e => {
            dataPoints.push({x: time, y: parseInt(e)})
            time = time + 0.01
        });

        dataSeries.dataPoints = dataPoints;
        data.push(dataSeries);

        const options = {
            backgroundColor: "transparent",
            height: $(window).height() * this.props.height,
            zoomEnabled: true,
            axisY: {
                title: "MAGNITUDE (10e+6)",
                titleFontSize: $(window).height() * 0.016,
                titleFontColor: "#FFFFFF",
                includeZero: true, 
                labelFontColor: "white", 
                labelFontSize:  $(window).height() * 0.016, 
                labelFormatter: hideAxys(this.props.type)
            },
			axisX: {
                titleFontSize: $(window).height() * 0.016,
                titleFontColor: "#FFFFFF",
                includeZero: false, 
                labelFontColor: "white", 
                labelFontSize:  $(window).height() * 0.016,
                labelFormatter: function (e){
                    var a = new Date(e.value*1000);
                    var hour = a.getHours() + 3;
                    var min = a.getMinutes();
                    var sec = a.getSeconds();
                    if(hour < 10)
                        hour = "0"+hour
                    if(min < 10)
                        min = "0"+min
                    if(sec < 10)
                        sec = "0"+sec
                    var time = hour + ':' + min + ':' + sec ;
                    return time;
                }  
            },
            data: data
        }

        if(this.state.channel.length === 0)
            return(<LoadGif title={this.props.title} height={$(window).height() * this.props.height}/>);
        
        return(
            <div>
                <div className="spacing"> {this.props.title} </div>
                <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
            </div>
        );

    }

}
