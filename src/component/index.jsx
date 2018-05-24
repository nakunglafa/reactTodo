import React from 'react';  

//todo list component
function TodoList(props){

  const lists = props.list;
  const remove=props.remove;
  const markDone=props.done;
  const edit=props.edit;
  const listItems = lists.map((list) =>{
    return (
      <li className="list-group-item" key={list.id.toString()}>
      <span>{"  "+list.value}</span>
      <span className="flex"></span>
      <span style={{float:'right'}}>
        <button className="btn btn-primary" onClick={()=>{markDone(list.id)}}>Mark as done</button>
        {"     "}
        <button className="btn btn-danger" onClick={() => {remove(list.id)}}>Remove</button>
        {"     "}
        <button className="btn btn-warning" onClick={() => {edit(list.id)}}>Edit</button>
      </span>
      </li>
      )
    }
  );
  return (
    <ul className="list-group">{listItems}</ul>
  );
}

//completed task component
function CompleteList(props)
{
  const lists = props.list;
  const remove=props.remove;
  const undone=props.undone;
  const listItems = lists.map((list) =>{
    return (
      <li className="list-group-item" key={list.id.toString()}>
      <span className="taskComplete">{"  "+list.value}</span>
      <span className="flex"></span>
      <span style={{float:'right'}}>
        <button className="btn btn-secondary" onClick={()=>{undone(list.id)}}>Mark as undone</button>
        {"     "}
        <button className="btn btn-danger" onClick={() => {remove(list.id)}}>delete</button>
      </span>
      </li>
      )
    }
  );
  return (
    <ul className="list-group">{listItems}</ul>
  );
}

//main form 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo:[],
      done:[],
      task:''
    }
    this.id=1;
    this.handleChange = this.handleChange.bind(this);
  }

  Remove(id){
    const a = this.state.todo.filter((todo) => {
      if(todo.id !== id){
        return todo
      }
      return false
    });
    this.setState({todo: a});
  }
  handleChange(event) {
    this.setState({task: event.target.value});
    event.preventDefault();
  }
  removeFromCompletedTask(id){
    const a = this.state.done.filter((todo) => {
      if(todo.id !== id){
        return todo
      }
      return false
    });
    this.setState({done: a});
  }
  taskCompleted(id){
    this.state.todo.filter((todo)=>{
      if(todo.id === id){
        this.state.done.push(todo);
        this.setState({done:this.state.done});
        return this.Remove(id);
      }
      return false;
    })
  }

  addTask(event) {
    if(this.state.task!=="")
    {
      this.state.todo.push({value:this.state.task,id:this.id});
      this.setState({task:""});
      this.id++;
      this.setState({todo:this.state.todo});
    }
    event.preventDefault();
  }

  editTask(id){
    const a=this.state.todo.filter((todo)=>{
      if(todo.id === id){
        return todo
      }
      return false
    });
    this.setState({task:a[0].value});
    const box=document.getElementById('textbox');
    box.focus();
    this.Remove(id);
  }

  undone(id){
    console.log('asdf');
    const a=this.state.done.filter((done)=>{
      if(done.id === id){
        return done;
      }
      return false;
    });
    this.state.todo.push(a[0]);
    this.setState({todo:this.state.todo});
    this.removeFromCompletedTask(id);
  }

  render() {
    return (
      <div className="container">
        <div style={{height:'50px'}}></div>
          <h3 align="center">React Todo App</h3>
          <form onSubmit={this.addTask.bind(this)}>
            <div className="form-group">
                <input type="text" id="textbox" value={this.state.task} onChange={this.handleChange} className="form-control" />    
            </div>
            <div className="form-group">
                <input type="submit" value="Add" className="form-control btn btn-primary" />
            </div>
          </form>
          <h6 align="center">{this.state.todo.length+" "} Incompleted Task</h6>
          <TodoList list={this.state.todo} remove={this.Remove.bind(this)} done={this.taskCompleted.bind(this)} edit={this.editTask.bind(this)}/>
          <hr/>
          <h6 align="center">{this.state.done.length+" " }Completed Task</h6>
          <CompleteList list={this.state.done} remove={this.removeFromCompletedTask.bind(this)} undone={this.undone.bind(this)}/>
      </div>
    );
  }
}

export default App;