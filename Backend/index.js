require('dotenv').config()

const express = require('express')
const app = express()
// const time = require('express-timestamp')
// app.use(time.init)

const cors = require('cors')

const contact = require('./models/connectionDB')

app.use(cors())
app.use(express.static('build'))


var morgan = require('morgan')

morgan.token('body',function getBody(request){
  const value = JSON.stringify(request.body)
  return value
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// app.use(morgan('dev'))

let persons =[{
  "id": 1,
  "name": "Cal",
  "number": "0044526563"
}, {
  "id": 2,
  "name": "Roderick",
  "number": "0419605037"
}, {
  "id": 3,
  "name": "Twila",
  "number": "3824143992"
}, {
  "id": 4,
  "name": "Giacopo",
  "number": "3353092323"
}, {
  "id": 5,
  "name": "Der",
  "number": "9458274990"
}, {
  "id": 6,
  "name": "Murielle",
  "number": "2431466124"
}, {
  "id": 7,
  "name": "Ellsworth",
  "number": "5544972028"
}, {
  "id": 8,
  "name": "Ulrika",
  "number": "7822393693"
}, {
  "id": 9,
  "name": "Joli",
  "number": "0309704618"
}, {
  "id": 10,
  "name": "Laverna",
  "number": "4865678166"
}, {
  "id": 11,
  "name": "Bernete",
  "number": "9142658721"
}, {
  "id": 12,
  "name": "Wilt",
  "number": "8337236191"
}, {
  "id": 13,
  "name": "Una",
  "number": "5547241504"
}, {
  "id": 14,
  "name": "Mycah",
  "number": "8836056539"
}, {
  "id": 15,
  "name": "Bobbi",
  "number": "7892214194"
}, {
  "id": 16,
  "name": "Anetta",
  "number": "5090041059"
}, {
  "id": 17,
  "name": "Fritz",
  "number": "2219847799"
}, {
  "id": 18,
  "name": "Fay",
  "number": "8731121772"
}, {
  "id": 19,
  "name": "Ephrayim",
  "number": "4769104952"
}, {
  "id": 20,
  "name": "Neil",
  "number": "5428066237"
}, {
  "id": 21,
  "name": "Perry",
  "number": "0421580925"
}, {
  "id": 22,
  "name": "Evered",
  "number": "2877051250"
}, {
  "id": 23,
  "name": "Rob",
  "number": "1961415550"
}, {
  "id": 24,
  "name": "Alejoa",
  "number": "4218461503"
}, {
  "id": 25,
  "name": "Chickie",
  "number": "5764638542"
}]

app.get('/api/persons',(request,response,next)=>{
  contact.find({})
  .then(result=>{
    response.json(result)
  })
  .catch(error=>next(error))
})


//GET ALL CONTACTS
// app.get('/api/persons',(request,response)=>{
//     // console.log(`get method worked`)
//     response.json(persons)
// })

app.get('/info',(request,response)=>{
  const entry = persons.length
  console.log(entry)
  const when = new Date().toUTCString()
  console.log(when)
  response.send(`<div>Phonebook has info for ${entry} people <br/>${when}</div>`)
})

app.get('/api/persons/:id',(request,response,next)=>{
  // console.log(`request id ${request.params.id}`)
  contact.findById(request.params.id).then(result=>{
    if(result){    
    response.json(result)
    }else{
      response.status(400).end()
    }
  })
  .catch(error=>next(error))
})
//GET INDIVIDUAL CONTACTS
// app.get('/api/persons/:id',(request,response)=>{
//   const id = Number(request.params.id)
//   // console.log(id,typeof id)
//   const ob = persons.find(val => val.id === id)
  
//   if(ob){    
//   // console.log(ob)
//   response.json(ob)
//   }else{
//     response.status(404).send(`The contact is not found`)
//   }
// })

app.delete('/api/persons/:id',(request,response,next)=>{
  contact.findByIdAndDelete(request.params.id)
  .then(result=>response.status(204).end())
  .catch(error=>next(error))
})
// app.delete('/api/persons/:id',(request,response)=>{
//   const id = Number(request.params.id)
//   // console.log(id,typeof id)
//   const flag = persons.find(val=>val.id===id)
//   if(flag){
//   persons = persons.filter(val => val.id !== id)
//   console.log('successful')
//   // response.send(`deletion done`)
//   response.end()
//   }else{
//     response.status(404).end(`The contact does not exist`)
//   }
//   })

// const genId = ()=>{

//     const max = persons.length>0 
//     ? Math.max(...persons.map(val=>val.id)) 
//     : 0
//     return max + 1
// }

app.use(express.json());
app.post('/api/persons',(request,response)=>{
  const body = request.body
  console.log(`Here's the body ${body}`)
  if(body === undefined){
    response.status(400).json({
      error : "object not recieved"
    })
  }
  const nContact = new contact({
    name : body.name,
    number : body.number
  })
  // console.log(`Here's the new contact ${nContact}`)
  nContact.save().then(result=>{
    response.send(result)
  })
  .catch(error=>console.log(error))
})
// app.post('/api/persons',(request,response)=>{
//   const content = request.body
//   // console.log(content)
//   // console.log(`generated id ${genId()}`)
//   if(!(content.name && content.number)){
//     return response.status(400).json({
//       "error" : "name or number is missing"
//     })
//   }
//   const decision = persons.find(val=>val.name===content.name)
//   if(decision){
//     return response.status(409).json({  
//       "error" : "name already exists"
//     })
//   }
//   // console.log(`name `,typeof content.name,`number `,typeof content.number)
//   const contact = {
//     id : genId(),
//     name : content.name,
//     number : content.number,
//   }
//   persons = persons.concat(contact)
//   console.log(...persons)
//   response.json(contact)

  
// })


//JO bhi urls hoenge other than the above, they will get error as given below 

app.put('/api/persons/:id',(request,response,next)=>{
  const body = request.body
  console.log(body)
  const newContact = {
    name : body.name,
    number : body.number
  }
  contact.findByIdAndUpdate(request.params.id,newContact,{new:true})
  .then(result=>response.json(result))
  .catch(error=>next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error:'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error,request,response,next) => {
  console.error(error.message)
  if(error.name === 'CastError'){
    response.status(400).send({error : 'malformatted id'})
  }
  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})