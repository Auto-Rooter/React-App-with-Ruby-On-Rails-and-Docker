import React from "react";
import PropTypes from "prop-types";
import 'bulma/css/bulma.css';
import {triangleChecker} from '../../api/blogAPI'

export default class TriangleModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          aSide : 0,
          bSide : 0,
          cSide : 0,
          result : ""
        }
      }


    onClose = e => {
        this.props.onClose && this.props.onClose(e);
        this.setState({result : ""});
      };

    
    onChangeA = event =>{
        this.setState({aSide : event.target.value});
    }

    onChangeB = event =>{
        this.setState({bSide : event.target.value});
    }

    onChangeC = event =>{
        this.setState({cSide : event.target.value});
    }
    

    handleSubmit = event => {
      event.preventDefault();
    
      //alert("a= "+this.state.aSide+",b= "+this.state.bSide+",c= "+this.state.cSide);
         
      triangleChecker(this.state.aSide, this.state.bSide, this.state.cSide).then(response => {
          if(response.status === 200){
            this.setState({result : response.data.msg});
          }else{
            this.setState({result : response.data.errors});
          }
        
      }).catch(error => {
        this.setState({result : "Incorrect"});
      });
      }



  render() {
    //
    if(!this.props.triangleShow){
        return null;
    }
    else {
      return (
        <div className="modal is-active">
        <div className="modal-background"   />
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title"> <h4 class="subtitle" style={{ "text-align": "left" }}>Enter Triangle sides : </h4> </p>
                <button className="delete" onClick={this.onClose}/>
                
            </header>
            <section className="modal-card-body">


                    <div className="card-content">
                     <form onSubmit={this.handleSubmit}>
                            <div style={{"marginBottom": 2+"em", "display": "flex", "flex-direction": "row"}}>
                                    <input class="input is-info is-rounded" width="20" type="text" placeholder="a =" onChange={this.onChangeA} style={{"display":"block", "marginRight":2+"em"}} required/>
                                        <h1 style={{"display":"block", "marginRight":1+"em", "font-weight" : "bold","size":"12"}}>,</h1>

                                    <input class="input is-success is-rounded" type="text" placeholder="b ="  onChange={this.onChangeB} style={{"display":"block","marginRight":2+"em"}} required/>
                                        <h1 style={{"display":"block", "marginRight":1+"em", "font-weight" : "bold","size":"12"}}>,</h1>

                                    <input class="input is-warning is-rounded" type="text" placeholder="c ="  onChange={this.onChangeC} style={{"display":"block", "marginRight":2+"em"}} required/>
                                        <h1 style={{"display":"block", "marginRight":1+"em", "font-weight" : "bold","size":"12"}}>=</h1>

                                    <span class="tag is-large" style={{"display":"block", "marginRight":2+"em", "marginTop":0+"em"}}> {this.state.result} </span>
                            </div>
                           
                            <div>
                                <input type="submit" value="Check" className="button is-success" style={{ float: "left" }} />
                                <a className="button" onClick={this.onClose} style={{ float: "right" }}>Cancel</a>
                            </div>
                        
                     </form>
                    </div>


            </section>
            
        </div>
        </div>
)
    }
  
  }
}

TriangleModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    triangleShow: PropTypes.bool.isRequired
  };