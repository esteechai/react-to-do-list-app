import React, { Component }  from 'react';
import './App.css';

class App extends Component{
   constructor(){
       super(); 
       this.state = {
           title: 'To-Do List',
           item:[]
       }
   } 

//make ajax calls here
componentDidMount(){
    console.log('COMPONENT HAS MOUNTED');
}

addItem(event){
   event.preventDefault(); 
    let data = {
       item_id: this.refs.item_id.value, 
       item_name: this.refs.item_name.value
    };
    
    var request = new Request('http://localhost:3000/api/new-item', 
    {
        method:'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    });
    
//    xmlhttprequest()
    fetch(request).then(function(response){
        response.json().then(function(data){
            console.log(data)
        })
    })
    this.refs.item_id.value = '';  
    this.refs.item_name.value = ''; 
}
   
render() {
  let title = this.state.title; 
  return (
    <div className="App">
      <h1>{title}</h1>
      <form ref="itemForm">
        <input type="text" ref="item_id" placeholder="Task" /> 
       <input type="text" ref="item_name" placeholder="Remark" /> 
        <button onClick = {this.addItem.bind(this)}>Add Item </button>
      </form>
    </div>
  );
}
}

export default App;
