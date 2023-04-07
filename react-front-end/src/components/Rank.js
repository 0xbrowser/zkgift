import React from "react";
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';
import { useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { GlobalTypography } from "../styles/styles";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { CSVLink } from 'react-csv';

// const giftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const giftScrollAddress = "0xF3055c1BC0B8B5C74A89A4B66FA854F5865fe023";
const giftZksyncAddress = "0xBBa240aDd17Af8f4C929F305fF9C0e11B422A48D";

const abi = [
    "function getGrantAddress(address) view returns (address[])",
    "function getGrantTotal(address) view returns (uint256[])",
];

const columns = [
    { id: 'no', label: 'No.', minWidth: 20 },
    { id: 'addr', label: 'Address', minWidth: 50, align: 'center' },
    {
        id: 'total',
        label: 'Total\u00a0Grant',
        minWidth: 30,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    }
];

function createData(no, addr, total) {
    return { no, addr, total };
}

const rows = [];

const Rank = ({ accounts, setAccounts, network, setNetwork }) => {
    const [rerender, setRerender] = useState("0");
    const [search, setSearch] = useState("search");
    const [searchAddress, setSearchAddress] = useState("");
    const [searchAlertOpen, setSearchAlertOpen] = React.useState(false);
    const [networkAlertOpen, setNetworkAlertOpen] = React.useState(false);

    const handleSearchAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSearchAlertOpen(false);
    };
    const handleNetworkAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNetworkAlertOpen(false);
    };

    var addr = [];
    var total = [];

    async function getRank() {
        console.log({ network });
        if (!searchAddress) {
            setSearchAlertOpen(true);
            return;
        }
        if (window.ethereum) {
            const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
            // const etherProvider = new ethers.providers.JsonRpcProvider(
            //     'https://alpha-rpc.scroll.io/l2'
            //   );
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
            try {
                setSearch("...");
                const contract = new ethers.Contract(giftScrollAddress, abi, etherProvider);
                // address array
                addr = await contract.getGrantAddress(searchAddress);
                // total array
                total = await contract.getGrantTotal(searchAddress);
                // sort total
                var list = [];
                for (var j = 0; j < addr.length; j++)
                    list.push({ 'addr': addr[j], 'total': total[j] });
                list.sort(function (a, b) {
                    return ((a.total < b.total) ? 1 : ((a.total === b.total) ? 0 : -1));
                });
                // clean rows[]
                rows.length = 0;
                // push data into the rows[]
                for (let i = 0; i <= addr.length - 1; i++) {
                    let j = i + 1;
                    rows.push(createData(j, list[i].addr, ethers.utils.formatEther(list[i].total)));
                }
                setRerender(rerender + 1);
                setSearch("search");
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="center">
                <Grid container space={1}>
                    <Grid item xs={3}>
                        <div className="tiny-blank"></div>
                        <svg className="r9-logo" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z" /></svg>
                        <svg className="r7-logo" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z" /></svg>
                        <svg className="r8-logo" xmlns="http://www.w3.org/2000/svg" width="196" height="196" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z" /></svg>

                    </Grid>
                    <Grid item xs={6}>
                        <div className="search-line">
                            <div className="search-input">
                                <input placeholder="Set recipient address" onChange={(e) => setSearchAddress(e.target.value)} value={searchAddress} />
                            </div>
                            <button className="search-button" style={{ backgroundColor: "white" }} onClick={getRank}>{search}</button>
                            <div className="export">
                                <CSVLink data={rows} className="csv-link" filename={searchAddress}>
                                    <button className="export-button">
                                        <svg className="export-logo" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="#000000" d="M20 15a1 1 0 0 1 1 1v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a1 1 0 1 1 2 0v4h14v-4a1 1 0 0 1 1-1ZM12 2a1 1 0 0 1 1 1v10.243l2.536-2.536a1 1 0 1 1 1.414 1.414l-4.066 4.066a1.25 1.25 0 0 1-1.768 0L7.05 12.121a1 1 0 1 1 1.414-1.414L11 13.243V3a1 1 0 0 1 1-1Z" /></g></svg>
                                    </button>
                                </CSVLink>
                            </div>
                        </div>
                        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '20px' }} className="paper">
                            <TableContainer sx={{ maxHeight: 550 }}>
                                <Table stickyHeader aria-label="sticky table" size='small'>
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    <GlobalTypography>
                                                        {column.label}
                                                    </GlobalTypography>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    <GlobalTypography>
                                                                        {column.format && typeof value === 'number'
                                                                            ? column.format(value)
                                                                            : value}
                                                                    </GlobalTypography>
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="blank"></div>
                        <div className="tiny-blank"></div>
                        <svg className="r8-logo" xmlns="http://www.w3.org/2000/svg" width="196" height="196" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z" /></svg>
                        <svg className="r10-logo" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z" /></svg>
                        <svg className="r6-logo" xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z" /></svg>
                    </Grid>
                </Grid>
            </div>
            <hr></hr>
            <Snackbar open={searchAlertOpen} autoHideDuration={3000} onClose={handleSearchAlertClose}>
                <Alert onClose={handleSearchAlertClose} severity="warning" sx={{ width: '100%' }}>
                    Input recipient address first
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

export default Rank;