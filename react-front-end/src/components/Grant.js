import React from "react";
import Grid from '@mui/material/Grid';
import { ethers } from "ethers";
import Gift from '../artifacts/contracts/Gift.sol/Gift.json';
import { useState } from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// const giftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const giftScrollAddress = "0xF3055c1BC0B8B5C74A89A4B66FA854F5865fe023";
const giftZksyncAddress = "0xBBa240aDd17Af8f4C929F305fF9C0e11B422A48D";

const Grant = ({ accounts, setAccounts, network, setNetwork }) => {
    const [recipientAddress, setRecipientAddress] = useState("");
    const [grantFunds, setGrantFunds] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [addressAlertOpen, setAddressAlertOpen] = React.useState(false);
    const [fundsAlertOpen, setFundsAlertOpen] = React.useState(false);
    const [amountAlertOpen, setAmountAlertOpen] = React.useState(false);
    const [connectAlertOpen, setConnectAlertOpen] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [grantButtonText, setGrantButtonText] = React.useState('grant');
    const [withdrawButtonText, setWithdrawButtonText] = React.useState('withdraw');
    const [grantReceivedAmount, setGrantReceivedAmount] = React.useState('0.0');
    const [userBalance, setUserBalance] = React.useState('0.0');
    const [networkAlertOpen, setNetworkAlertOpen] = React.useState(false);

    const handleNetworkAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNetworkAlertOpen(false);
    };
    const handleAddressAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAddressAlertOpen(false);
    };
    const handleFundsAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFundsAlertOpen(false);
    };
    const handleAmountAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAmountAlertOpen(false);
    };
    const handleConnectAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setConnectAlertOpen(false);
    };
    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };
    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    async function grant() {
        console.log(network);
        if (!recipientAddress) {
            setAddressAlertOpen(true);
            return;
        }
        if (!grantFunds) {
            setFundsAlertOpen(true);
            return;
        }
        if (accounts[0] == null) {
            setConnectAlertOpen(true);
            return;
        }
        if (window.ethereum) {
            const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
            const net = await etherProvider.getNetwork();
            if (net.chainId !== 534353 && network === 'scroll') {
                setNetworkAlertOpen(true);
                return;
            }
            // 324 mainnet 280 testnet
            else if (net.chainId !== 280 && network === 'zksync') {
                console.log("wrong zksync network");
                return;
            }
            // const etherProvider = new ethers.providers.JsonRpcProvider(
            //     'https://alpha-rpc.scroll.io/l2'
            //   );
            const signer = etherProvider.getSigner();
            if (network === 'scroll')
                var contract = new ethers.Contract(giftScrollAddress, Gift.abi, signer);
            else if (network === 'zksync')
                var contract = new ethers.Contract(giftZksyncAddress, Gift.abi, signer);
            try {
                setGrantButtonText("confirming");
                const tx = await contract.grant(recipientAddress, { value: ethers.utils.parseEther(grantFunds) });
                setGrantButtonText("pending");
                await tx.wait();
                setGrantButtonText("grant");
                setSuccessOpen(true);
            } catch (error) {
                setErrorOpen(true);
                setGrantButtonText("grant");
                console.log(error);
            }
        }
    }

    async function withdraw() {
        if (!withdrawAmount) {
            setAmountAlertOpen(true);
            return;
        }
        if (accounts[0] == null) {
            setConnectAlertOpen(true);
            return;
        }
        if (window.ethereum) {
            // const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
            const etherProvider = new ethers.providers.JsonRpcProvider(
                'https://alpha-rpc.scroll.io/l2'
            );
            const net = await etherProvider.getNetwork();
            if (net.chainId !== 534353 && network === 'scroll') {
                setNetworkAlertOpen(true);
                console.log("wrong scroll network");
                return;
            }
            else if (net.chainId !== 324 && network === 'zksync') {
                console.log("wrong zksync network");
                return;
            }
            const signer = etherProvider.getSigner();
            const contract = new ethers.Contract(giftScrollAddress, Gift.abi, signer);
            try {
                setWithdrawButtonText("confirming");
                const weiAmount = ethers.utils.parseEther(withdrawAmount);
                const tx = await contract.withdraw(weiAmount);
                setWithdrawButtonText("pending");
                await tx.wait();
                setWithdrawButtonText("withdraw");
                setSuccessOpen(true);
            } catch (error) {
                setErrorOpen(true);
                setWithdrawButtonText("withdraw");
            }
        } else {
            setConnectAlertOpen(true);
        }
    }

    async function getWithdrawAmount() {
        if (accounts[0] != null && window.ethereum) {
            // const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
            const etherProvider = new ethers.providers.JsonRpcProvider(
                'https://alpha-rpc.scroll.io/l2'
            );
            const contract = new ethers.Contract(giftScrollAddress, Gift.abi, etherProvider);
            const bigAmount = await contract.grantReceived(accounts[0]);
            const amount = ethers.utils.formatEther(bigAmount);
            setGrantReceivedAmount(amount);
            // get user's balance
            const bigBalance = await etherProvider.getBalance(accounts[0]);
            const balance = ethers.utils.formatEther(bigBalance);
            setUserBalance(balance);
            contract.once("grantEvent", (giver, recipient, funds, time) => {
                getWithdrawAmount();
            });
        }
    }

    getWithdrawAmount();

    return (
        <>
            <div className="center">
                <Grid container spacing={1}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <div className="blank"></div>

                        <svg className="r5-logo" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z" /></svg>
                        <svg className="r6-logo" xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z" /></svg>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="balance-words">
                            <h2>Your wallet balance:</h2>
                            <h2 className="user-balance">{userBalance}</h2>
                            <svg className="eth-logo" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="#ffffff" d="M12 2a1 1 0 0 1 .832.445l5.804 8.707l-5.227 2.178l-1.21-8.877c-.032-.23-.366-.23-.397 0l-1.21 8.877l-5.228-2.178l5.804-8.707A1 1 0 0 1 12 2Zm.385 13.923l5.818-2.424l-5.37 8.056a1 1 0 0 1-1.665 0l-5.37-8.056l5.817 2.424a1 1 0 0 0 .77 0Z" /></g></svg>
                        </div>
                        <div className="grant-line">

                            <div className="grant-input">
                                <input placeholder="Set recipient address" onChange={(e) => setRecipientAddress(e.target.value)} value={recipientAddress} />
                                <input placeholder="Set grant funds" className="funds" onChange={(e) => setGrantFunds(e.target.value)} value={grantFunds} />
                            </div>
                            <button className="grant-button" style={{ backgroundColor: "white" }} onClick={grant}>{grantButtonText}</button>
                        </div>
                        <div className="grant-received">
                            <h2>You have received </h2>
                            <h2 className="grant-amount">{grantReceivedAmount}</h2>
                            <svg className="eth-logo" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="#ffffff" d="M12 2a1 1 0 0 1 .832.445l5.804 8.707l-5.227 2.178l-1.21-8.877c-.032-.23-.366-.23-.397 0l-1.21 8.877l-5.228-2.178l5.804-8.707A1 1 0 0 1 12 2Zm.385 13.923l5.818-2.424l-5.37 8.056a1 1 0 0 1-1.665 0l-5.37-8.056l5.817 2.424a1 1 0 0 0 .77 0Z" /></g></svg>
                            <h2> grant. </h2>
                        </div>
                        <div className="withdraw-line">
                            <input placeholder="Set withdraw amount" onChange={(e) => setWithdrawAmount(e.target.value)} value={withdrawAmount} />
                            <button className="wd-button" style={{ backgroundColor: "white" }} onClick={withdraw} >{withdrawButtonText}</button>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="blank"></div>
                        <svg className="r6-logo" xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z" /></svg>
                        <svg className="r5-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z" /></svg>

                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
            <hr></hr>
            <Snackbar open={addressAlertOpen} autoHideDuration={3000} onClose={handleAddressAlertClose}>
                <Alert onClose={handleAddressAlertClose} severity="warning" sx={{ width: '100%' }}>
                    Input recipient address first
                </Alert>
            </Snackbar>
            <Snackbar open={fundsAlertOpen} autoHideDuration={3000} onClose={handleFundsAlertClose}>
                <Alert onClose={handleFundsAlertClose} severity="warning" sx={{ width: '100%' }}>
                    Input grant funds first
                </Alert>
            </Snackbar>
            <Snackbar open={amountAlertOpen} autoHideDuration={3000} onClose={handleAmountAlertClose}>
                <Alert onClose={handleAmountAlertClose} severity="warning" sx={{ width: '100%' }}>
                    Input withdraw amount first
                </Alert>
            </Snackbar>
            <Snackbar open={connectAlertOpen} autoHideDuration={3000} onClose={handleConnectAlertClose}>
                <Alert onClose={handleConnectAlertClose} severity="warning" sx={{ width: '100%' }}>
                    Connect wallet first
                </Alert>
            </Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    Error
                </Alert>
            </Snackbar>
            <Snackbar open={successOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                    Success
                </Alert>
            </Snackbar>
            <Snackbar open={networkAlertOpen} autoHideDuration={3000} onClose={handleNetworkAlertClose}>
                <Alert onClose={handleNetworkAlertClose} severity="warning" sx={{ width: '100%' }}>
                    Wrong scroll network
                </Alert>
            </Snackbar>
        </>
    );
}

export default Grant;