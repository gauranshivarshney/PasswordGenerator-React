import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (character) str += "!@#$%^&*()-_=+`~[]{}"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, character, number, setPassword])

  const copyPassword = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])

  return (
    <>
      <div className='container mt-5 p-4 bg-secondary rounded'>
        <h2 className='text-center mb-2 text-white'>Password Generator</h2>
        <div className='container p-3'>
          <div className='d-flex align-items-center justify-content-start mb-4'>
            <input type="text" value={password} className='form-control me-1' placeholder='Password' readOnly ref={passRef}/>
            <button className='btn btn-info btn-hover' onClick={copyPassword}>Copy</button>
          </div>
        </div>
        <div className='d-flex align-items-center'>
          <div className='d-flex align-items-center me-4'>
          <input type='range' className='form-range me-2' id='lengthSlider' min={6} max={100} value={length} onChange={(e) => setLength(e.target.value)} style={{ width: '150px' }} />
          <label htmlFor='lengthSlider' className='text-info'>
            Length: <strong>{length}</strong>
          </label>
          </div>
        
        <div className='form-check me-4'>
          <input className='form-check-input' type='checkbox' defaultChecked={number} id="number" onChange={() => {
            setNumber((prev) => !prev);
          }} />
          <label htmlFor='number' className='text-info'>Numbers</label>
        </div>
        <div className='form-check'>
          <input className='form-check-input' type='checkbox' defaultChecked={character} id="character" onChange={() => {
            setCharacter((prev) => !prev);
          }} />
          <label htmlFor='character' className='text-info'>Characters</label>
        </div>
      </div>
</div>
    </>
  )
}

export default App
