import React from "react";
import { Link } from "react-router-dom"
import styled from "styled-components";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ethers } from 'ethers';
import img from '../assets/zkgift-logo.png'

const NavUnlisted = styled.ul`
  text-decoration: none;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bolder;
`;

const ProjectName = styled.ul`
  text-decoration: none;
  font-size: 2.6rem;
  text-align: center;
  font-weight: bold;
  margin: 0;
  padding: 2px;
`;

const linkStyle = {
    textDecoration: "none",
    color: 'white',
};

const giftStyle = {
    textDecoration: "none",
    color: 'white',
};

const Navigation = ({ accounts, setAccounts, network, setNetwork }) => {
    const isConnected = Boolean(accounts[0]);
    const [ens, setEns] = useState("");
    const isEns = Boolean(ens[0]);
    const [metamaskAlertOpen, setMetamaskAlertOpen] = React.useState(false);

    const handleMetamaskAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMetamaskAlertOpen(false);
    };

    async function connectAccount() {
        if (window.ethereum) {
            const walletAddress = await window.ethereum.request({ method: "eth_requestAccounts" });
            setAccounts(walletAddress);
            // const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
            // const ensName = await etherProvider.lookupAddress(walletAddress[0]);
            // setEns(ensName);
            // console.log(ensName);
            const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
            const net = await etherProvider.getNetwork();
            if (net.chainId === '534353')
                setNetwork("scroll");
            else if (net.chainId === '324')
                setNetwork("scroll");
        } else {
            setMetamaskAlertOpen(true);
        }
    }

    return (
        <>
            <div className="nav-logo">
                <div className="left">
                    <div className="nav-gift-logo">
                        <img width="67vh" height="50vh" src={img} alt=""></img>
                    </div>
                    <div className="nav-title">
                        <ProjectName>
                            <Link to="/" style={giftStyle}>
                                ZKGift
                            </Link>
                        </ProjectName>
                    </div>
                </div>
                <div className="right">
                    <NavUnlisted>
                        <Link to="/grant" className="grant-link" style={linkStyle}>
                            grant
                        </Link>
                        <Link to="/rank" className="rank-link" style={linkStyle}>
                            rank
                        </Link>
                        <Link to="/about" className="about-link" style={linkStyle}>
                            about
                        </Link>
                    </NavUnlisted>
                    {isConnected ? (
                        isEns ? (
                            <button className="connect-button">
                                {ens}
                            </button>
                        ) : (
                            <button className="connect-button">
                                {accounts[0].slice(0, 6)}...
                            </button>
                        )
                    ) : (
                        <button className="connect-button" onClick={connectAccount}>
                            connect
                        </button>
                    )}
                </div>
            </div>
            <hr></hr>
            <Snackbar open={metamaskAlertOpen} autoHideDuration={3000} onClose={handleMetamaskAlertClose}>
                <Alert onClose={handleMetamaskAlertClose} severity="warning" sx={{ width: '100%' }}>
                    Install metamask first
                </Alert>
            </Snackbar>
        </>
    );
}

export default Navigation;