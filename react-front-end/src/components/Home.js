import React from "react";
import Grid from '@mui/material/Grid';
import {ethers} from 'ethers';
import Gift from '../artifacts/contracts/Gift.sol/Gift.json';
import { useState } from "react";

// const giftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const giftScrollAddress = "0xF3055c1BC0B8B5C74A89A4B66FA854F5865fe023";
const giftZksyncAddress = "0x01336d936E7C0FDE9fe7Fd80EfF96bD3D4aaF938";

const Home = ({ accounts, setAccounts }) => {
    const [grantPoolAmount, setGrantPoolAmount] = useState("");

    async function getPoolAmount () {
        if(window.ethereum){
            const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
            // const etherProvider = new ethers.providers.JsonRpcProvider(
            //     'https://alpha-rpc.scroll.io/l2'
            //   );
            const contract = new ethers.Contract(giftScrollAddress, Gift.abi, etherProvider);
            const bigAmount = await etherProvider.getBalance(giftScrollAddress);
            const amount = ethers.utils.formatEther(bigAmount);
            setGrantPoolAmount(amount);
            contract.once("grantEvent", (giver, recipient, funds, time) => {
                getPoolAmount();
            });
            contract.once("withdrawEvent", (amount, time) => {
                getPoolAmount();
            });
        } 
    }

    getPoolAmount();

    return (
        <>
        <div className="center">
        <Grid container spacing={1}>
            <Grid item xs={3}>
                
            </Grid>
            <Grid item xs={3}>
            <div className="time">
                <div className="small-blank"></div>
                <svg className="r-logo" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z"/></svg>
                <svg className="r2-logo" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z"/></svg>
            </div>
            </Grid>
            
            <Grid item xs={3}>
                <div className="blank"></div>
                <div className="words">
                <h1>Totally</h1>
                <h1 className="grant-pool">{grantPoolAmount}</h1>
                <svg className="home-eth-logo" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="#ffffff" d="M12 2a1 1 0 0 1 .832.445l5.804 8.707l-5.227 2.178l-1.21-8.877c-.032-.23-.366-.23-.397 0l-1.21 8.877l-5.228-2.178l5.804-8.707A1 1 0 0 1 12 2Zm.385 13.923l5.818-2.424l-5.37 8.056a1 1 0 0 1-1.665 0l-5.37-8.056l5.817 2.424a1 1 0 0 0 .77 0Z"/></g></svg>
                </div>
                <h1>in the grant pool</h1>
                <svg className="r-logo" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z"/></svg>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>           
        </div>
        <hr></hr>
        </>
    );
}

export default Home;