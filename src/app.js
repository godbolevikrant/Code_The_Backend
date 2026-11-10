const express = require('express')
const Note = require('./models/note.model')
const app = express()
require('./models/note.model')

app.use(express.json())

// const notes= [];

// app.post('/notes', (req,res)=>{
//        notes.push(req.body);
//        res.status(201).send('Note created');
// })

// app.get('/notes', (req,res)=>{
//     res.status(200).json(notes);
// })

// app.delete('/notes/:id', (req,res)=>{
//     const id = req.params.id;
//   delete notes[id];
//   res.status(200).send(`Note with id ${id} deleted`);
// });

// app.patch('/notes/:id',(req,res)=>{
//     const id= req.params.id;
//     const description= req.body.description;
//     notes[id].description = description;
//     res.status(200).send(`Note with id ${id} updated`);
// })


app.post('/notes', async (req, res) => {
    const data = req.body
    await Note.create({
        title: data.title,
        description: data.description
    })
    res.status(201).send('Note created')
})

app.get('/notes',async (req,res)=>{
    const notes = await Note.find()

    res.status(200).json({
        message: 'Notes fetched successfully',
        notes:notes
    })
})

app.delete('/notes/:id', async (req,res)=>{
    const id= req.params.id 

    await Note.findOneAndDelete({
        _id: id 
    })
    res.status(200).json({
        message: `Note with id ${id} deleted`
    })

})

app.patch('/notes/:id', async (req, res)=>{
    const id = req.params.id
    const description =req.body.description

    await Note.findOneAndUpdate(
        {
            _id: id
        },
        {
            description: description
        }
    )
    res.status(200).json({
        message: `Note with id ${id} updated`
    })
})

module.exports = app