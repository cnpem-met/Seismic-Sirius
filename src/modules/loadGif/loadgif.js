import React, {Component} from 'react';

export default class LoadGif extends Component{

    render(){

        return(
            <div>
                <div className="spacing"> {this.props.title} </div>
                <div className="loadGif">
                    <div className="groupBalls" style={{height: this.props.height}}>
                        <div className="box">
                            <div className="ball" id="b1"/>
                        </div>
                        <div className="box">
                            <div className="ball" id="b2"/>
                        </div>
                        <div className="box">
                            <div className="ball" id="b3"/>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}