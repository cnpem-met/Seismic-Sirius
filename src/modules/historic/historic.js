import React, {Component} from 'react';
import './historic.css';

export default class Historic extends Component{

    constructor(props){
        super(props);
        this.state = {list: []};
    }

    componentDidMount(){
        this.updateHistoric();
    }

    updateHistoric(){
        fetch(`http://10.0.38.242/api/historic.php`)
            .then((response) => response.json())
            .then(responseJson => {
                var answer = [];
                responseJson.forEach(row => {
                    answer.push(row);
                });
                this.setState({list: answer})
            });
    }

    seeAcquisition(starttime, endtime){
        alert(`Quero ver de ${starttime} até ${endtime}`);
    }

    render(){
        return(

            <div>
                {
                    this.state.list.map((item, contador) => (
                        <div className="list-acquisition" key={contador += 1}>
                            <div className="number">{contador}</div>
                            <div className="content">
                            <div id="dasName">{item.das}</div>
                                <div id="lastTime">{item.time}</div>
                            </div>
                            <button onClick={() => this.seeAcquisition(item.starttime, item.endtime)}>See</button>
                        </div>
                    ))
                }
            </div>

        );
    }

}
