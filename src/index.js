const express = require("express");
const cors = require("cors")
const { uuid } = require("uuidv4");
const app = express();
const port = process.env.PORT || 8878
app.use(cors());
app.use(express.json());

const tarefas = []


app.get("/",(req, res) => res.json(tarefas))

app.post("/", (req, res) =>{
    const { tarefa, stat } = req.body;
    const novaTarefa = { id:uuid(), tarefa, stat }
    tarefas.push(novaTarefa)
    return res.json(novaTarefa)
})
app.put('/:id',(req, res)=>{
    const { id } = req.params
    const {tarefa, stat} = req.body

    const tarefaIndex = tarefas.findIndex(tarefaIndex => tarefaIndex.id === id)

    if(tarefaIndex <0){
        return res.status(400).json({'err':"error"})
    }
    const novaTarefa = {
        id,tarefa,stat
    }

    tarefas[tarefaIndex] = novaTarefa;
    return res.json(novaTarefa)
})

app.delete('/:id', (req, res) =>{
    const { id } = req.params;
    const tarefaIndex = tarefas.findIndex(tarefaIndex => tarefaIndex.id === id)
    if(tarefaIndex <0){
        return res.status(400).json({'err':"error"})
    }
    tarefas.slice(tarefaIndex, 1)

    return res.json({'message': 'tarefa deletada'})
})



app.listen(port, () => console.log('server rodando'));
