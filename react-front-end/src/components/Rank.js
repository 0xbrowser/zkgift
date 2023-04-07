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

// const giftAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const giftScrollAddress = "0xF3055c1BC0B8B5C74A89A4B66FA854F5865fe023";
const giftZksyncAddress = "0x01336d936E7C0FDE9fe7Fd80EfF96bD3D4aaF938";

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
            else if (net.chainId !== 324 && network === 'zksync') {
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