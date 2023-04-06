import React from "react";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    borderRadius: 100,
    width: 66,
    height: 34,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        margin: 0,
        padding: 3,
        transform: 'translateX(2px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(30px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.993 11.016a1 1 0 0 1-.531-1.848L7.15 6.48a1 1 0 0 1 1.414 1.415l-1.121 1.12h7.55a1 1 0 0 1 0 2h-10Zm14.014 1.968a1 1 0 0 1 .531 1.848L16.85 17.52a1 1 0 1 1-1.414-1.415l1.121-1.12h-7.55a1 1 0 1 1 0-2h10Z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#ffffff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#000000',
        width: 28,
        height: 28,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M220.8 169.6a8 8 0 0 0-4.8-1.6h-8V64a32 32 0 0 0-32-32H40A32 32 0 0 0 8 64c0 13.61 10.05 21.54 11.2 22.4A7.89 7.89 0 0 0 24 88a8 8 0 0 0 4.87-14.33C28.83 73.62 24 69.74 24 64a16 16 0 0 1 32 0v128a32 32 0 0 0 32 32h112a32 32 0 0 0 32-32c0-13.61-10-21.54-11.2-22.4ZM104 96h64a8 8 0 0 1 0 16h-64a8 8 0 0 1 0-16Zm-8 40a8 8 0 0 1 8-8h64a8 8 0 0 1 0 16h-64a8 8 0 0 1-8-8Zm104 72h-92.29a31.82 31.82 0 0 0 4.29-16a26.92 26.92 0 0 0-1.21-8h102a12.58 12.58 0 0 1 3.23 8A16 16 0 0 1 200 208Z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#ffffff',
        borderRadius: 20 / 2,
    },
}));

const Bottom = ({ network, setNetwork }) => {
    const [checked, setChecked] = React.useState(false);

    async function jumpTwi() {
        const w = window.open('about:blank');
        w.location.href = "https://twitter.com/zkgift_xyz";
    }

    async function jumpDis() {
        const w = window.open('about:blank');
        w.location.href = "https://discord.com";
    }

    async function jumpGit() {
        const w = window.open('about:blank');
        w.location.href = "https://github.com/0xbrowser/zkgift";
    }

    async function handleChange () {
        setChecked(!checked);
        if(checked === true){
            setNetwork("scroll");
            console.log("switch to Scroll");
        } else {
            setNetwork("zksync");
            console.log("switch to zkSync");
        }
    }

    return (
        <>
            <div className="bottom-line">
                <nav className="bottom-left">
                    <div className="network-switch">
                        <FormGroup>
                            <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} checked={checked} onChange={handleChange} />}
                                label="Scroll" />
                        </FormGroup>
                    </div>
                </nav>
                <nav className="bottom-right-link">
                    <div className="twi-logo" onClick={jumpTwi}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="#ffffff" d="M4.594 4.984a1 1 0 0 1 .941.429C7.011 7.572 8.783 8.47 10.75 8.674c.096-.841.323-1.672.75-2.404c.626-1.074 1.644-1.864 3.098-2.156c2.01-.404 3.54.324 4.427 1.215l1.792-.335a1 1 0 0 1 1.053 1.478l-1.72 3.022c.157 4.361-1.055 7.405-3.639 9.502c-1.37 1.112-3.332 1.743-5.485 1.938c-2.17.196-4.623-.041-7.061-.753a1 1 0 0 1 .007-1.922c1.226-.349 2.16-.65 3.003-1.177c-1.199-.636-2.082-1.468-2.707-2.416c-.868-1.318-1.19-2.788-1.254-4.113c-.064-1.325.127-2.553.329-3.438c.115-.505.249-1.011.434-1.495a1 1 0 0 1 .818-.636Z" /></g></svg>
                    </div>
                    <div className="dis-logo" onClick={jumpDis}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="#ffffff" d="M15.003 4c.744 0 1.53.26 2.25.547l.527.216c1.26.528 1.968 1.636 2.517 2.853c.891 1.975 1.51 4.608 1.724 6.61c.102.95.127 1.906-.056 2.549c-.197.687-.867 1.173-1.518 1.555l-.322.183l-.334.186c-.172.096-.349.191-.525.284l-.522.27l-.717.357l-.577.284a1 1 0 1 1-.894-1.788l.79-.39l-.58-.609c-1.39.57-3.027.893-4.766.893c-1.739 0-3.376-.322-4.766-.893l-.58.608l.793.39a1 1 0 1 1-.894 1.79l-.544-.27c-.402-.2-.805-.398-1.203-.607l-.928-.505l-.321-.183c-.651-.382-1.322-.868-1.518-1.555c-.184-.643-.158-1.598-.057-2.55c.214-2.001.833-4.634 1.724-6.609c.549-1.217 1.257-2.325 2.517-2.853C7.059 4.413 8.072 4 9 4c.603 0 1.077.555.99 1.147A13.65 13.65 0 0 1 12 5c.691 0 1.366.05 2.014.148A1.012 1.012 0 0 1 15.004 4ZM8.75 10.5a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5Zm6.5 0a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5Z" /></g></svg>
                    </div>
                    <div className="git-logo" onClick={jumpGit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="#ffffff" d="M7.024 2.31a9.08 9.08 0 0 1 2.125 1.046A11.432 11.432 0 0 1 12 3c.993 0 1.951.124 2.849.355a9.08 9.08 0 0 1 2.124-1.045c.697-.237 1.69-.621 2.28.032c.4.444.5 1.188.571 1.756c.08.634.099 1.46-.111 2.28C20.516 7.415 21 8.652 21 10c0 2.042-1.106 3.815-2.743 5.043a9.456 9.456 0 0 1-2.59 1.356c.214.49.333 1.032.333 1.601v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-.991c-.955.117-1.756.013-2.437-.276c-.712-.302-1.208-.77-1.581-1.218c-.354-.424-.74-1.38-1.298-1.566a1 1 0 0 1 .632-1.898c.666.222 1.1.702 1.397 1.088c.48.62.87 1.43 1.63 1.753c.313.133.772.22 1.49.122L8 17.98a3.986 3.986 0 0 1 .333-1.581a9.455 9.455 0 0 1-2.59-1.356C4.106 13.815 3 12.043 3 10c0-1.346.483-2.582 1.284-3.618c-.21-.82-.192-1.648-.112-2.283l.005-.038c.073-.582.158-1.267.566-1.719c.59-.653 1.584-.268 2.28-.031Z" /></g></svg>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Bottom;