import React from 'react'

const Modal = ({ close, data }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <p>I'm modal</p>
        <p>{JSON.stringify(data)}</p>
        <button onClick={close}>X</button>
      </div>
    </div>
  )
}

export default Modal