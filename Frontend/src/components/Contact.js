import App from "../App";
import axios from 'axios';
import Service from "../services/ContactService";
const Contact = ({ naam, number, id, persons, setPersons,setErrorM }) => {
  const del = () => {
    // const updated = result.filter((val) => val.id !== key)
    // console.log(`the value of seterror`,setErrorM, setPersons)
    const val = window.confirm(`You sure want to delete this?`)
    // console.log(val)


    
    if(val){

      // const data = persons.filter(val=>val.id !== id)
      // console.log(...data)

      const name = persons.find(val => val.id === id)
        console.log(name)
      const updated = persons.filter(val=> val.name !== name.name)
      setPersons(updated)
        setErrorM(`The contact ${name.name} has been deleted`)
            setTimeout(()=>{
              setErrorM(null)
            },3000)
      
      


      Service.remove(id)
      .then(response=>{
        console.log(`deletion done ${response}`)
      })
      .catch(error => {
        // alert(`The contact has been already deleted`)
        console.log(`delete error`,error.data)
        const errId = persons.find(val => val.id === id) 
        // console.log(`The one deleted`,errId)
        setErrorM(`The contact ${errId.name} has already been deleted`)
        setTimeout(()=>{
          setErrorM(null)
        },2000)
      })

    //   Service.get()
    // .then(response => {
    //   setPersons(response)
    //   // console.log(`rendering...`)
    // })
    // .catch(error=>console.log(`get `,error.data))

  }
  }
  return (
    <div>
      {naam} {number}{" "}
      <button
        onClick={del}
      >
        del
      </button>
    </div>
  );
};
export default Contact;
