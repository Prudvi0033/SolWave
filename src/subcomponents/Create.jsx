import { createAssociatedTokenAccountInstruction, createInitializeMint2Instruction, createMintToInstruction, getAssociatedTokenAddressSync, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Create() {
  const [supply, setSupply] = useState('')

  const wallet = useWallet();
  const { connection } = useConnection();

  async function CreateToken() {
    if (!wallet.publicKey) {
      toast.error("Please connect your wallet.");
      return;
    }
  
    try {
      const mintKeyPair = Keypair.generate();
      console.log("Mint Keypair: ", mintKeyPair.publicKey.toString());
  
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      
      const balance = await connection.getBalance(wallet.publicKey);
      if (balance < lamports) {
        toast.error("Insufficient SOL to create token mint.");
        return;
      }
  
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeyPair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMint2Instruction(
          mintKeyPair.publicKey, 
          9, 
          wallet.publicKey, 
          wallet.publicKey,
          TOKEN_2022_PROGRAM_ID
        )
      );
  
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      transaction.partialSign(mintKeyPair);
  
      await wallet.sendTransaction(transaction, connection);
  
      toast.success("Token Mint Created Successfully");
  
      const associatedToken = getAssociatedTokenAddressSync(
        mintKeyPair.publicKey,
        wallet.publicKey,
        false, 
        TOKEN_2022_PROGRAM_ID
      );
  
      const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey, 
          associatedToken, 
          wallet.publicKey, 
          mintKeyPair.publicKey, 
          TOKEN_2022_PROGRAM_ID
        )
      );
  
      await wallet.sendTransaction(transaction2, connection);
  
      const transaction3 = new Transaction().add(
        createMintToInstruction(
          mintKeyPair.publicKey, 
          associatedToken, 
          wallet.publicKey, 
          supply * 1000000000, 
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );
  
      await wallet.sendTransaction(transaction3, connection);
  
      toast.done("Tokens Minted Successfully!");
  
    } catch (error) {
      console.error("Error creating token mint:", error);
      toast.error(`Failed to create Token Mint: ${error.message}`);
    }
  }
  

  return (
    <div className='w-[30rem] p-12 h-[12rem] flex flex-col items-center justify-center text-white'>
      <input
        type="number"
        value={supply}
        className="mb-4 w-[16rem] block bg-transparent text-[#1A374D] p-3 ps-10 text-sm font-gilroy font-semibold border-sky-800 border rounded-lg"
        onChange={(e) => setSupply(e.target.value)}
        placeholder='Supply'
      />
      <button
        onClick={CreateToken}
        className={`bg-[#A0D4E0] text-[#013A4D] w-[16rem] font-medium rounded-lg text-sm px-7 py-3 me-2 mb-2 ml-4 mt-2 hover:opacity-90 hover:scale-110 transition-all hover:bg-[#82C2CC] hover:text-[#013A4D] ease-in-out duration-300`}
      >
        Create Token
      </button>
    </div>
  )
}