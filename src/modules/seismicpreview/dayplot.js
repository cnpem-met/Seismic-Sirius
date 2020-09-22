import React, {Component} from 'react';
import CanvasJSReact from './canvasjs/canvasjs.react';

import './seismicpreview.css';
import LoadGif from '../loadGif/loadgif';
import $ from 'jquery';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DayPlot extends Component{

    constructor(props){
        super(props);
        this.state = {channel: [], samplerate: 0};
    }

    componentDidMount(){
        this.setPreview();
        if(this.props.type === "preview")
            setInterval(this.setPreview.bind(this), 10000);
    }

    setPreview(){
        fetch(`http://192.168.0.16/api/seismic${this.props.type}.php?channel=${this.props.channel}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setTimeout(() => {
                    this.setState({
                        channel: responseJson.channel.concat(responseJson.channel, responseJson.channel, responseJson.channel)
                    })
                }, 1500);
            });
        fetch("http://192.168.0.16/api/index.php?option=samplerate")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    samplerate: responseJson.monitor.status
                })
            })
    }

    hideAxys(option){
        if(option === "preview"){
            return function(){return " ";}
        }
    }

    randomNumber(min, max){
        return Math.random() * (max - min) + min;
    }

    render(){

        var data = [];
        var channelLength = parseInt(this.state.channel.length);
        var sample1hour = (parseInt(this.state.samplerate) * (60 ** 2));
        var hours = Math.ceil(channelLength / sample1hour);
        var intervalo_x;
        
        if(channelLength < sample1hour)
            intervalo_x = sample1hour / hours / 6;
        else
            intervalo_x = channelLength / hours / 6;

        for(var i = 0; i < hours; i++){
            var dataPoints = [];
            var dataSeries = {type: "line", lineColor: `rgb(${(255 / (hours-1)) * i}, 176, 117)`};

            for(var j = 0; j < this.state.channel.length / hours; j++)
                dataPoints.push({x: j, y: i * -200000 + parseInt(this.state.channel[(i+1) * j])})

            dataSeries.dataPoints = dataPoints;
            data.push(dataSeries);
        }

        const options = {
            backgroundColor: "transparent",
            height: $(window).height(),
            zoomEnabled: true,
            axisY: {
                title: "HOUR OF DAY",
                titleFontSize: $(window).height() * 0.016,
                titleFontColor: "#FFFFFF",
                includeZero: true, 
                labelFontColor: "white", 
                labelFontSize:  $(window).height() * 0.016, 
                interval: 200000, 
                labelFormatter: function(e){
                    if(e.value > 0)
                        return ""
                    return e.value / -200000;
                }
            },
            axisX: {
                title: "TIME IN MINUTES",
                titleFontSize: $(window).height() * 0.016,
                titleFontColor: "#FFFFFF",
                includeZero: false,
                labelFontColor: "white", 
                labelFontSize:  $(window).height() * 0.016,
                interval: intervalo_x,
                labelFormatter: function(e){
                    return parseInt(e.value * 10 / intervalo_x);
                }
            },
            data: data
        }

        if(this.state.channel.length === 0)
            return(<LoadGif title={this.props.title}/>);

        return(
            <div>
                <div className="spacing"> {this.props.title} </div>
                <CanvasJSChart options = { options } onRef={ref => this.chart = ref}/>
            </div>
        );

    }

}