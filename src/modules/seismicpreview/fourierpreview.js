import React, {Component} from 'react';
import './seismicpreview.css';
import CanvasJSReact from './canvasjs/canvasjs.react';
import $ from 'jquery';
import LoadGif from '../loadGif/loadgif';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class FouerierPreview extends Component{

    constructor(props){
        super(props);
        this.state = {channel: [], lastRequisition: "first"};
        this.setPreview();
    }

    setPreview(){
        fetch(`http://10.0.38.242/api/fourierpreview.php?channel=${this.props.channel}&requisition=${this.props.requisition}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    channel: responseJson.fourier,
                    lastRequisition: this.props.requisition
                });
            });
    }

    componentDidUpdate(){
        if(this.state.lastRequisition !== this.props.requisition)
            this.setPreview()
    }

    render(){

        var data = [];
        var dataPoints = [];
        var dataSeries = {type: "line", lineColor: "rgb(1, 176, 117)"};
        var type = this.props.type;

        var frequencyUp = 50/this.state.channel.length;
        var frequency = 0

        this.state.channel.forEach(e => {
            dataPoints.push({x: frequency, y: parseFloat(e)});
            frequency = frequency + frequencyUp;
        })
        
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
                labelFormatter: function(e){
                    if(type === "preview")
                        return "";
                    return e.value / 10**6;
                },
            },
			axisX: {
                title: "FREQUENCY (Hz)",
                titleFontSize: $(window).height() * 0.016,
                titleFontColor: "#FFFFFF",
                includeZero: false, 
                labelFontColor: "white", 
                labelFontSize:  $(window).height() * 0.016,
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