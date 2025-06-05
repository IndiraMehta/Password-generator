import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {

  const [count, setCount] = useState(0)
  const [length,setLength]=useState(8);
  const [numberal,setNumberal]=useState(false);
  const [charal,setCharal]=useState(false);
  const [password,setPassword]=useState("")
  const passwordref=useRef(null)

  const passwordGen=useCallback(()=>{
    let pass=""

    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz"
    if(numberal)str+="1234567890"
    if(charal) str+="!@#$%^&*_+-=;:<>?/"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberal,charal])
    
  const copypassowrdtoclipboard=useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },{password})
  useEffect(()=>{
    passwordGen()
  },[length,numberal,charal,passwordGen])
  // passwordGen(pass)
  return (
    <>
      <div className='w-full max-w-full mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
      <div className=' flex shadow  rounded-lg overflow-hidden mb-4'>

        <input 
        type="text"
        value={password}
        className='outline-none w-full py-2 px-3 text-black bg-white'
        placeholder='Password'
        readOnly
        ref={passwordref} />
        <button onClick={copypassowrdtoclipboard} className='outline-none bg-blue-700 hover:bg-blue-500 active:bg-blue-300 transition-colors duration-200 text-white px-3 py-0.5 shrink-0'>
          Copy</button>
        </div>
        <div className='flex  text-2xl gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <label>Length : {length} </label>
            <input type="range"
            min={5}
            max={25}
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
            className='cursor-pointer'
            
             />
          </div>
          <div className='flex items-center gap-x-1'>
            <label>Numbers</label>
            <input type="checkbox"
            defaultChecked={numberal}
            id="numberInput"
            onChange={()=>{setNumberal((prev)=>!prev)}}
             />
          </div>
          <div className='flex items-center gap-x-1'>
            <label>Characters</label>
            <input type="checkbox"
            defaultChecked={charal}
            onChange={()=>{setCharal((prev)=>!prev)}}
             />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
