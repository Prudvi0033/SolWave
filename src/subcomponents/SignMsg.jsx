import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function SignMsg() {
  const { publicKey, signMessage } = useWallet();  // Move this outside the function
  const [msg, setMsg] = useState("");

  async function sMessage() {
    if (!publicKey) {
      toast.error("Please Connect the Wallet");
      return;  // Return early if wallet is not connected
    }

    if (!signMessage) {
      toast.error("Signing Message is not supported by this wallet");
      return;  // Return early if signing is not supported
    }

    try {
      const encodedMsg = new TextEncoder().encode(msg);
      const signature = await signMessage(encodedMsg);

      // Verify the signature
      const isVerified = ed25519.verify(signature, encodedMsg, publicKey.toBytes());

      if (isVerified) {
        toast.success("Message Signing Successful");
      } else {
        toast.error("Message verification failed");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  }

  return (
    <div className='w-[30rem] p-12 h-[12rem] flex flex-col items-center justify-center text-white'>
      <input
        type="text"
        value={msg}
        className="mb-4 w-[16rem] block bg-transparent text-[#1A374D] p-3 ps-10 text-sm font-gilroy font-semibold border-sky-800 border rounded-lg"
        onChange={(e) => setMsg(e.target.value)}
        placeholder='Enter Msg'
      />
      <button
        onClick={sMessage}
        className={`bg-[#A0D4E0] text-[#013A4D] w-[16rem] font-medium rounded-lg text-sm px-7 py-3 me-2 mb-2 ml-4 mt-2 hover:opacity-90 hover:scale-110 transition-all hover:bg-[#82C2CC] hover:text-[#013A4D] ease-in-out duration-300`}      >
        Sign Message
      </button>
    </div>
  );
}

export default SignMsg;
