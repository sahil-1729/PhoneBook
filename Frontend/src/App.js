import { useState,useEffect } from 'react'
import axios from 'axios'
import './index.css'
import Cservice from './services/ContactService'
import Contact from './components/Contact'
const Details = ({value,persons,setPersons,errorM,setErrorM}) => {
  // console.log(...value)
  return (
    <div>
      {value.map(val => <Contact key={val.id} naam={val.name} number={val.number} persons={persons} id={val.id} setPersons={setPersons} setErrorM={setErrorM} ></Contact>)}
    </div>
  )
}

const Notify = ({message}) => {
  if(message === null){
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
    )
}

const Filter = ({search,persons,setFilter,change}) => {
    
    
  const filt = (event) => {
    event.preventDefault()
  // console.log(search)
  const trim = search.trim()
  const scaps = trim.toUpperCase()
  const fill = persons.filter((val) => {
    const naam = val.name
    const caps = naam.toUpperCase()
    // console.log(caps.match(scaps))
    return caps.match(scaps)
  })
  setFilter(fill)
  // console.log(...val)
  }
  return (
    <div>
      <input value={search} onChange={(event) => {change(event,3)}}/>
    <button type="submit" onClick={filt}>Search</button> 
    </div>
  )
}
const Box = ({type,value,change,number}) => {
  return  (
    <span>
      {type}<input value={value} onChange={event => change(event,number)}/> 
    </span>
    
  )
}
const Input = ({newName,newNumber,change}) => {
  return (
    <div>
          {/* name: <input value={newName} onChange={event => change(event,1)}/> */}
          <Box type="Name" value={newName} change={change} number={1}></Box>
          <Box type="Number" value={newNumber} change={change} number={2}></Box>
          
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      id : 1,
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  //NAME
  const [newName, setNewName] = useState('')
  //NUMBERS
  const [newNumber, setNewNumber] = useState('')
  //FILTER
  const [ filter,setFilter] = useState([])
  //SEARCH
  const [search,setSearch] = useState('')
  //notification
  const [errorM,setErrorM] = useState("MESSAGE")
  const change = (event,value) => {
    // console.log(event.target.value)
    if(value === 1){
      setNewName(event.target.value)
      console.log(`name changed ${newName}`)
    }
    if(value === 2){
      setNewNumber(event.target.value)
      console.log(`number changed ${newNumber}`)
    }
    if(value === 3){
      setSearch(event.target.value)
      console.log(`search value ${search}`)
    }
  }


  var val = (search === '') ? persons : filter
  // console.log(val)


  //GET HTTP REQUEST
  //also useffect me first parameter gets rendered, then in the second parameter me when you put some value, if the value gets changed in any way, it will get rendered, but here i didn't put any value in the second paramter
  useEffect(() => {
      Cservice.get()
      .then(response => setPersons(response))
      console.log(`rendering...`)
  },[])

  const Add = (event) => {
    var flag = true

      event.preventDefault()
      var decision = (newName === '' && newNumber === '') ? alert("Please enter your name and number") : (newName === '') ? alert("Please enter your name") : (newNumber === '') ? alert("Please enter your number") : true
      if(isNaN(newNumber)){
        alert(`The number entered is not a number!`)
        decision = false
      }
      if(decision){
        const result = persons.reduce((dec,val)=>{
          if(newName === val.name){
            // console.log("same")
            // alert(`${newName} already exist!`)
            const decide = window.confirm(`${newName} already exist!, Do you wanna change the number`)
            if(decide){
              console.log(`changed`)
              const changeNoBefore = persons.find(val => val.name === newName)
              console.log(changeNoBefore.id)
              const changeNoAfter = {...changeNoBefore, number : newNumber}
              console.log(changeNoAfter)

              Cservice.update(changeNoBefore.id,changeNoAfter)
              .then(response => {
                console.log(`data `,response)
                setPersons(persons.map((val) => {
                  return val.id !== changeNoAfter.id ? val : changeNoAfter
                }))
              })
              .catch(error => {
                console.log(error.data)
              })
              flag = false
              setNewName('')
              setNewNumber('')
            }
          }
          if(newNumber === val.number){
            dec = false
            alert(`${newNumber} already exist!`)
          }
          return dec
        },true)
        // console.log(result)
        if(result && flag){
          const contact = {
            // id react asssign kar dega, no need to assign it yourself
            name : newName,
            number : newNumber
          }
          console.log(contact)

          Cservice.insert(contact)
          .then(response => {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
            setErrorM(`MESSAGE: ${response.name} has been added`)
            setTimeout(()=>{
              setErrorM(null)
            },5000)
          })
          .catch(error => console.log(error,error.data))
          
        }
      }
      
      
    }
    // console.log(...persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notify message={errorM}>

      </Notify>
      <form>
        <Input newName={newName} newNumber={newNumber} change={change} >
        
        </Input>

          {/* Write only function's name, don't need to write the paramters of the function(jab sirf event as an input chahiye), only function call */}
          <button type="submit" onClick={Add}>add</button>
      </form>
      <div>
      
      <Filter search={search} persons={persons} setFilter={setFilter} change={change}></Filter>
      </div>
      <h2>Numbers</h2>
      <div>
      <Details value={val} persons={persons} setPersons={setPersons} errorM={errorM} setErrorM={setErrorM}> 
      </Details>
      {/* {val.map(val => <Contact key={val.id} naam={val.name} number={val.number}></Contact>)} */}
      </div>
      </div>
  )
}

export default App