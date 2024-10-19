import React, { useState } from 'react'
import Create from '../subcomponents/Create'
import TransferToken from '../subcomponents/TransferToken'
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { GrDocumentTransfer } from "react-icons/gr";

function Token() {

  const [componnet, setComponent] = useState('')

  function create(){
    setComponent('Create')
  }

  function transfer(){
    setComponent('TransferToken')
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center gap-12 justify-around font-thin list-none w-[25%] text-center p-2.5 rounded-full text-white tracking-wide'>
        <button className='bg-[#015871] text-4xl flex flex-col items-center justify-center py-4 w-36 rounded-lg text-center hover:scale-105 ease-in-out duration-300' onClick={create}><li><MdOutlineGeneratingTokens /></li>
        <div className='text-[10px]'>Mint Token</div>
        </button>
        <li>|</li>
        <button className='bg-[#015871] text-4xl flex flex-col items-center py-4 w-36 rounded-lg text-center hover:scale-105 ease-in-out duration-300' onClick={transfer}><li><GrDocumentTransfer />
        </li>
        <div className='text-[10px]'>Tranfer Token</div>
        </button>
      </div>

      <div>
        {componnet == 'Create' && <Create/>}
        {componnet == 'TransferToken' && <TransferToken/>}
      </div>
    </div>
  )
}

export default Token