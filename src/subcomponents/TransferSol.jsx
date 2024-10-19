import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function TransferSol() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendSol() {

    if (!wallet.publicKey) {
      toast.error("Please connect your wallet")
    }

    if (to == "" || amount == "") {
      toast.error("All fields should be filled")
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    try {
      await wallet.sendTransaction(transaction, connection);
      toast.success("Transaction Successful");
    } catch (error) {
      toast.error("Transaction Failed: " + error.message);
    }
  }

  return (
    <div className='w-[30rem] p-12 h-[12rem] flex flex-col items-center justify-center text-white mt-8'>
      <input
        type="text"
        value={to}
        className="mb-4 w-[16rem] block bg-transparent text-[#1A374D] p-3 ps-10 text-sm font-gilroy font-semibold border-sky-800 border rounded-lg"
        onChange={(e) => setTo(e.target.value)}
        placeholder='Enter To Public Address'
      />
      <input
        type="text"
        value={amount}
        className="mb-4 w-[16rem] block bg-transparent text-[#1A374D] p-3 ps-10 text-sm font-gilroy font-semibold border-sky-800 border rounded-lg"
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Enter SOL'
      />
      <button
        onClick={sendSol}
        className={`bg-[#A0D4E0] text-[#013A4D] w-[16rem] font-medium rounded-lg text-sm px-7 py-3 me-2 mb-2 ml-4 mt-2 hover:opacity-90 hover:scale-110 transition-all hover:bg-[#82C2CC] hover:text-[#013A4D] ease-in-out duration-300`}      >
        Send SOL
      </button>
    </div>
  );
}

export default TransferSol;
