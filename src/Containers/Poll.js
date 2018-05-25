import React,{Component} from 'react';
import Loader from '../Components/UI/Loader';
import axios from '../axios';
class Poll extends Component{
    state={
        poll:null,
        loading:true,
        votedItem:null,
        canSubmit:false,
        submitted:false,
        error:null
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get('/'+id)
            .then(res=>{
                this.setState({poll:res.data,loading:false,submitted:!res.data.canSubmit});
            })
            .catch(err=>{
                console.log(err);
            })
    }
    changeVoteHandler = (e)=>{
        this.setState({
            votedItem: e.target.value,
            canSubmit: true
        })
    }
    submitVoteHandler = (e)=>{
        this.setState({loading:true});
        const id = this.props.match.params.id;
        e.preventDefault();
        const {votedItem:pollElements} = this.state;
        const form = {pollElements};
        axios.put('/'+id,form)
            .then(res=>{
                this.setState({
                    poll: res.data,
                    loading: false,
                    submitted:true,
                    error:null
                })
            })
            .catch(err=>{
                console.log(err.message);
                this.setState({
                    loading: false,
                    error: err.message                  
                })
            })
    }

    render(){
        let poll = <div><Loader /></div>
        if (!this.state.loading && !this.state.submitted){
            let {title,author,pollElements} = this.state.poll;

            const elements = pollElements.map(element=>{
                return (<div key={element.element}>
                            <input 
                                id={element.element} 
                                type="radio" 
                                name="pollElements" 
                                value={element.element}
                                onChange={e=>this.changeVoteHandler(e)} />
                            <label htmlFor={element.element}>{element.element}</label>
                        </div>)
            });
            poll=
            <div className="content">
                <h1 className="title">{title}</h1>
                <form className="voteForm" onSubmit={this.submitVoteHandler}>
                    {elements}
                <p className="author">Poll created by: {author}</p>
                    <input type="submit" disabled={!this.state.canSubmit} value="Vote"/>
                </form>
            </div>
        } else
        if (!this.state.loading && this.state.submitted){
            let {title,author,pollElements} = this.state.poll;
            let maxMeter = 0;
            pollElements.forEach(element=>maxMeter+=element.count);
            const elements = pollElements.map(element=>
                (   <div key={element.element}>
                        {element.element} ({element.count} vote{element.count!==1?"s":null})<meter value={element.count} max={maxMeter}></meter>
                    </div>
                )
            )
            poll=
                <div className="content">
                <h1 className="title">{title}</h1>
                    <form onSubmit={this.submitVoteHandler}>
                        {elements}
                    <p className="author">Poll created by: {author}</p>
                        <input type="submit" disabled={this.state.submitted} value="Already voted!"/>
                    </form>
                    
                </div>
        }
        let error = null;
        if(this.state.error!==null){
            error = <p>Error:{this.state.error}</p>
        }
            return(
            <React.Fragment>        
                <div>{poll}</div>
                <div>{error}</div>
           </React.Fragment>        

        )
    }
}

export default Poll;