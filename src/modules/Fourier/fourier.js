import React, {Component} from 'react';
import './fourier.css';
import SeismicPreview from '../seismicpreview/seismicpreview';
import FouerierPreview from '../seismicpreview/fourierpreview';
import $ from 'jquery';

export default class Fourier extends Component{

    constructor(props){
        super(props);
        this.state = {chart: null};
    }

    renderChart(){
        var iniTime = $("#iniTime").val();
        var iniDate = new Date($('#iniDate').val() + ' ' + iniTime);
        var endTime = $("#endTime").val();
        var endDate = new Date($('#endDate').val() + ' ' + endTime);
        
        var seconds = (endDate.getTime() - iniDate.getTime()) / 1000;
        var start = new Date(iniDate.getFullYear(), 0, 0);
        var diff = iniDate - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);

        var requisition = iniDate.getFullYear()+";"+day+";"+iniTime+":00:00;"+seconds+";fourier";
        
        this.setState({chart:
            <div>
                <FouerierPreview channel="1" title="Channel 1" height="0.35" requisition={requisition}/>
                <FouerierPreview channel="2" title="Channel 2" height="0.35" requisition={requisition}/>
                <FouerierPreview channel="3" title="Channel 3" height="0.35" requisition={requisition}/>
            </div>
        });
    }

    render(){
        return(

            <div className="cards">
                <div className="colunas">
                    <div className="coluna3">
                        <div className="card2">
                            <div className="title-cards">Fourier Transform</div>
                            {this.state.chart}
                        </div>

                    </div>

                    <div className="coluna4">
                        <div className="card4">
                            <div className="title-cards">Forms</div>
                            <div className="forms">
                                <div className="input">
                                    <div className="title-input">Initial Date</div>
                                    <input type="date" id="iniDate"/>
                                </div>
                                <div className="input">
                                    <div className="title-input">Initial Time</div>
                                    <input type="time" id="iniTime"/>
                                </div>
                                <div className="input">
                                    <div className="title-input">End Date</div>
                                    <input type="date" id="endDate"/>
                                </div>
                                <div className="input">
                                    <div className="title-input">End Time</div>
                                    <input type="time" id="endTime"/>
                                </div>
                                <button onClick={() => this.renderChart()}>Send</button>
                            </div>
                        </div>
                        <div className="card4">
                            <div className="title-cards">Seismic Preview</div>
                            <SeismicPreview channel="1" type="preview" title="Channel 1" height="0.26"/>
                            <div className="description">
                                See the complete Time Domain of these datas: <br></br>
                                <button>Here</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }

}