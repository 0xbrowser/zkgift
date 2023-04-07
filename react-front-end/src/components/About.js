import React from "react";
import Grid from '@mui/material/Grid';

const About = () => {
    return (
        <>
        <div className="center">
        <Grid container spacing={1}>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
                <svg className="r3-logo" xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z"/></svg>
                <svg className="r5-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z"/></svg>
            </Grid>
            <Grid item xs={4}>
                <h1>about</h1>
                <h2>ZKGift is a layer2 Dapp used for donation and ranking, running on Scroll and zkSync.</h2>
                <h2>You could not only donate some tokens to an address through 'grant' but also view the ranking of your or others' total grant to an address.</h2>
                <div className="creator">
                    <h2 className="team">Team:</h2>
                    <svg className="creator-logo" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="#ffffff" d="M7.527 2.657a7.001 7.001 0 0 1 8.26 9.347l4.599 3.893a3.3 3.3 0 1 1-4.651 4.65l-3.891-4.597a7.001 7.001 0 0 1-9.35-8.26a1.01 1.01 0 0 1 1.72-.432l3.045 3.307l2.297-.845l.847-2.3l-3.309-3.04a1.01 1.01 0 0 1 .433-1.723Z"/></g></svg>
                    <h2>Sodas (ordinary junior coder)</h2>
                </div>
            </Grid>
            <Grid item xs={1}>
                <svg className="r4-logo" xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z"/></svg>
                <svg className="r5-logo" xmlns="http://www.w3.org/2000/svg" width="144" height="144" viewBox="0 0 256 256"><path fill="#7c7979" d="M216 44H40a12 12 0 0 0-12 12v144a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V56a12 12 0 0 0-12-12Zm4 156a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V56a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4Z"/></svg>
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>   
        </div>
        <hr></hr>
        </> 
    );
}

export default About;