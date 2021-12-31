const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const connection = require('./db')


const app = express();

app.use(cors());
app.use(bodyParser.json())

app.get('/tasks',(req, res)=> {
    const TASK_QUERY = 'SELECT * FROM taskManager.tasks';
    connection.query(TASK_QUERY, (err, response)=> {
        if(err) console.log(err)
        else res.send(response)
    })
})

app.post("/addTask", (req,res)=> {
    const ADD_QUERY = `insert into taskManager.tasks (task) values ('${req.body.task}')`
    connection.query(ADD_QUERY, (err)=> {
        if(err) console.log(err)
        else res.send("Task has been added")
    })
})

app.delete("/deleteTask/:idtasks", (req,res)=> {
    const DELETE_QUERY = `DELETE FROM taskManager.tasks WHERE (idtasks=${req.params.idtasks})`
    connection.query(DELETE_QUERY, (err)=> {
        if(err) console.log(err)
    })
})

app.listen(4000, ()=> {
    console.log("Running on port 4000")
})