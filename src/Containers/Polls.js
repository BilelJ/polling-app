import React, {Component} from 'react';
import Loader from '../Components/UI/Loader';
import axios from '../axios';
import {Link} from 'react-router-dom';

class Polls extends Component{
    state={
        polls:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/')
            .then(res=>{
                this.setState({
                polls:res.data,
                loading:false
                })
            })
            .catch(err=>{
                console.log(err);
                this.setState({loading:false})
            });
    }

    render(){
        let polls = <Loader />;
        if(this.state.loading===false){
            polls=this.state.polls.map(poll=>(
                <div className="poll" key={poll._id}>
                    <Link to={this.props.match.url+'/'+poll._id}>{poll.title}</Link>
                </div>
                )
            )
        }
        return(
            <div className="content">
                <h1 className="title">Polls</h1>
                {polls}
            </div>
        )
    }
}

export default Polls;