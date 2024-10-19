import React, { useState } from 'react';
import TransferSol from '../subcomponents/TransferSol';
import SignMsg from '../subcomponents/SignMsg';
import { HiRocketLaunch } from "react-icons/hi2";
import { FaFileSignature } from "react-icons/fa6";



function Transaction() {
  const [activeComponent, setActiveComponent] = useState(null);

  function transfer() {
    setActiveComponent('TransferSol');
  }

  function sign() {
    setActiveComponent('SignMsg');
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center gap-12 justify-around font-thin list-none w-[25%] text-center p-2.5 rounded-full text-white tracking-wide'>
        <button className='bg-[#015871] text-4xl flex flex-col items-center justify-center py-4 w-36 rounded-lg text-center hover:scale-105 ease-in-out duration-300' onClick={transfer}><li><HiRocketLaunch /></li>
        <div className='text-[10px]'>Send SOL</div>
        </button>
        <li>|</li>
        <button className='bg-[#015871] text-4xl flex flex-col items-center py-4 w-36 rounded-lg text-center hover:scale-105 ease-in-out duration-300' onClick={sign}><li><FaFileSignature />
        </li>
        <div className='text-[10px]'>Sign Msg</div>
        </button>
      </div>

      <div className='mt-6'>
        {activeComponent === 'TransferSol' && <TransferSol />}
        {activeComponent === 'SignMsg' && <SignMsg />}
      </div>
    </div>
  );
}

export default Transaction;
