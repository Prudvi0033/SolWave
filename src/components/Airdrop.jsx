import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Airdrop() {
    const [amnt, setAmnt] = useState('');
    const [balance, setBalance] = useState('');

    const wallet = useWallet();
    const { connection } = useConnection();

    useEffect(() => {
        if (wallet.publicKey) {
            getBalance();
        }
    }, [wallet.publicKey]);

    async function getBalance() {
        try {
            const bal = await connection.getBalance(wallet.publicKey);
            setBalance(bal / LAMPORTS_PER_SOL); 
        } catch (error) {
            console.error('Error fetching balance:', error);
            toast.error('Failed to fetch balance');
        }
    }

    async function getAirdrop() {
        const amount = parseFloat(amnt);

        if (isNaN(amount) || amount <= 0) {
            toast.error("Enter Valid Amount");
            return;
        }

        if (!wallet.publicKey) {
            toast.error("Please connect your wallet");
            return;
        }

        try {
            await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
            toast.success('Airdrop Successful');
            getBalance(); 
        } catch (error) {
            toast.error('Airdrop failed: ' + error.message);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center p-12 mt-12'>
            {wallet.publicKey ? (
                <>
                    <h1 className="mb-2 text-4xl font-extrabold leading-none tracking-tight text-[#1A374D] md:text-5xl lg:text-6xl">
                        {balance} SOL
                    </h1>
                    <p className="mb-8 text-gray-500 dark:text-gray-400">Maximum of 2 requests per hour</p>
                    <input 
                        type="number" 
                        value={amnt}
                        className="mb-4 w-[16rem] block bg-transparent text-[#1A374D] p-3 ps-10 text-sm font-gilroy font-semibold border-sky-800 border rounded-lg"
                        onChange={(e) => setAmnt(e.target.value)}
                        placeholder='Enter SOL amount'
                    />
                    <button 
                        onClick={getAirdrop}
                        className={`bg-[#A0D4E0] text-[#013A4D] w-[16rem] font-medium rounded-lg text-sm px-7 py-3 me-2 mb-2 ml-4 mt-2 hover:opacity-90 hover:scale-110 transition-all hover:bg-[#82C2CC] hover:text-[#013A4D] ease-in-out duration-300`}
                    >
                        Get Airdrop
                    </button>
                </>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Please connect your wallet to proceed.</p>
            )}
        </div>
    );
}

export default Airdrop;
