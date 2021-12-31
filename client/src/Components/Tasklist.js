import React from "react";
import axios from "axios"
import "./Tasklist.css"

class TaskList extends React.Component {
    state = {
        task: "",
        taskList: []
    }

    componentDidMount() {
        this.getTaskList()
    }

    getTaskList = () => {
        axios.get("http://localhost:4000/tasks")
        .then((response) => response.data)
        .then(response => this.setState({taskList: response}))
    }

    onClickSubmit = () => {
        axios.post("http://localhost:4000/addTask", {
            task: this.state.task
        })
        this.getTaskList()
        window.location.reload(false);
    }

    onClickRemove = (idtasks) => {
        axios.delete(`http://localhost:4000/deleteTask/${idtasks}`)
        this.getTaskList();
        window.location.reload(false);
    }

    onClickDone = (e) => {
        const card = document.querySelector(".card")
        if (!card.classList.contains("done")) {
            card.classList.add("done")
            e.target.innerHTML = "Do again"
        } else {
            card.classList.remove("done")
            e.target.innerHTML = "Done"
        }
        
        
        
    }

    render () {
        return (
            <div>
                <h3>Task Manager </h3>
                <div className="ui input">
                    <input value={this.state.task} type="text" placeholder="Insert task" onChange={e => this.setState({task: e.target.value})}/>
                </div>
                    <button className="ui primary button basic" onClick={() => this.onClickSubmit()}>Submit</button>
                    <hr />
                
                    <div className="ui cards">
                        {this.state.taskList.map((task) => {
                            return (<div key={task.idtasks} className="card">
                                <div className="content">
                                    <div className="header">
                                        {task.task}
                                </div>
                            </div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <div className="ui basic green button" onClick={(e) => this.onClickDone(e)}>Done</div>
                                        <div className="ui basic red button" onClick={() => this.onClickRemove(task.idtasks) }>Remove</div>
                                </div>
                            </div>
                        </div> )
                        })}
                        
                    </div>  
                </div>
            
        )
    }
}

export default TaskList