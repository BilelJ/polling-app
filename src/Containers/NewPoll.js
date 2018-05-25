import React,{Component} from 'react';
import Loader from '../Components/UI/Loader';
import axios from '../axios';
import {Link} from 'react-router-dom';
import './NewPoll.css';
import CopyToClipboard from 'react-copy-to-clipboard';
class NewPoll extends Component{
    state={
        author:"",
        title:"",
        pollElements:["",""],
        url:null,
        validationError:null,
        loading: false,
        copied:false
    }
    changeAuthorHandler = (e) =>{
        this.setState({
            author: e.target.value
        })
    }
    changeTitleHandler = (e) =>{
        this.setState({
            title: e.target.value
        })
    }
    changeAnswerHandler = (e,index)=>{
        const updatedAnswers = [...this.state.pollElements];
        updatedAnswers[index] = e.target.value;
        this.setState({
            pollElements : updatedAnswers
        })
    }
    addAnswerHandler = (e)=>{
        e.preventDefault();
        if(this.state.pollElements.length<5){
            const answers = [...this.state.pollElements];
            answers.push("");
            this.setState({
                pollElements:answers
            })
        }
    }
    removeAnswerHandler = (e)=>{
        e.preventDefault();
        if(this.state.pollElements.length>2){
            let answers = [...this.state.pollElements];
            answers = answers.slice(0,answers.length-1);
            this.setState({
                pollElements:answers
            })
        }
    }
    submitHandler = (e)=>{
        e.preventDefault();
        let canSubmit = false;
        if(this.state.author!=="" && this.state.title!=="" && this.state.pollElements.every(element=>element!=="")){
            if(!this.state.pollElements.every((element,i,arr)=>arr.lastIndexOf(element)===i)){
                this.setState({validationError:"Cannot use the same answer twice!"});
            } else {
                canSubmit = true;
            }
        } else {
            this.setState({validationError:"All fields are required!"});
        }
        if (canSubmit){
            this.setState({loading:true});
            const form = JSON.parse(JSON.stringify(this.state));
            form.pollElements.forEach((pollElement,index)=>{
                form.pollElements[index] = {element:pollElement}
            });
            axios.post('/',form)
                .then(res=>{
                    this.setState({
                        url: '/polls/' + res.data._id,
                        author:"",
                        title:"",
                        pollElements:["",""],
                        validationError:null,
                        loading: false
                    })
                })
                .catch(err=>console.log(err));
        }
    }
    render(){
        const answers = this.state.pollElements.map((answer,index)=>(
            <React.Fragment key={"answer"+index}>
                <label>Answer {index+1}</label>
                <input type='text' maxLength="70" value={this.state.pollElements[index]} onChange={(e)=>this.changeAnswerHandler(e,index)}/>
            </React.Fragment>
        ))
        return(
        this.state.loading?<Loader />:
        <div className="content">
            <h1 className="title">Create a new poll</h1>          
            {this.state.url!==null?
                <div className="success"><Link id="link" to={this.state.url}>Go to the new poll</Link>
                <CopyToClipboard text={window.location.host+this.state.url}>
                    <button onClick={()=>this.setState({copied:true})}>{this.state.copied?"Copied!":"Copy link"}</button>
                </CopyToClipboard>
                </div>
            :null}
            <form className="newPoll" onSubmit={this.submitHandler}>
                <fieldset>
                <legend>Informations</legend>
                <label>Author</label>
                <input type='text' maxLength="70" value={this.state.author} onChange={this.changeAuthorHandler}/>
                <label>Title</label>
                <input type='text' maxLength="70" value={this.state.title} onChange={this.changeTitleHandler}/>
                </fieldset>
                <fieldset>
                <legend>
                    Answers (Max: 5)
                    <button onClick={this.addAnswerHandler}>More</button>
                    <button onClick={this.removeAnswerHandler}>Less</button>
                </legend>
                {answers}
                </fieldset>
                <input type="submit" value="Create my poll"/>
            </form>
            {this.state.validationError!==null?<p className="error">{this.state.validationError}</p>:null}
        </div>
        )
    }
}

export default NewPoll;