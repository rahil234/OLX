import React,{useRef} from 'react'

function Test() {
    const nameRef = useRef()
    const emailRef = useRef()

const submit=(e)=>{
    e.preventDefault()
    alert(`Name:${nameRef.current.value}\nemail:${emailRef.current.value}`)
}
  return (
    <div>
      <form action="" onSubmit={submit}>
        <label htmlFor="name">name</label> <br />
        <input type="text" className='border' ref={nameRef}/><br />
        <label htmlFor="email">email</label><br />
        <input type="text"  className='border' ref={emailRef}/> <br />
        <button type='submit'>
            Submit
        </button>
      </form>
    </div>
  )
}

export default Test
