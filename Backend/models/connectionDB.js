const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log(`conntecting to url ${url}`)
mongoose.connect(url)
.then(result=>console.log(`connected`))
.catch(error=>console.log(`Error:${error}`))

function validator(val){
  const hyphen = val.indexOf('-')
  if(hyphen === -1 || val.startsWith('-') || val.endsWith('-')){
    return false
  }
  const pattern = /-/g
  const numberHyphen = val.match(pattern)
  // console.log(`number of hyphens`,numberHyphen)
  return (hyphen-1 >= 1)&&(numberHyphen.length<2)
}

const custom = [validator,`Uh oh, it is not a valid number`]

const personSchema = new mongoose.Schema({
  name : {
    type : String,
    minLength : 3,
    required : true
  },
  number : {
    type : String,
    minLength : [8,'Password is too short'],
    validate : custom,
    required : true
  }
})
personSchema.set('toJSON',{
  transform: (document,returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('contact',personSchema)