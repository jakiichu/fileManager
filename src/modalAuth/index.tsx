import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {Grid} from "@mui/material";
import {LIST_COMPONENTS as style} from "./_styled"


const ModalAuth = () => {
    const [open, setOpen] = React.useState(false);
    const [registration, setRegistration] = React.useState(false);
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const switchRegistration = () => {
        setRegistration(!registration)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const auth = () => {
        if (registration === true) {
            fetch('http://91.193.183.139:7000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({login: login, password: password})
            })
                .then((res) => res.json())
                .then(
                    (data) => {
                        localStorage.setItem('token', data.token);
                        handleClose();
                    }
                )
                .catch((err) => console.error(err));
        } else if (registration === false) {
            fetch('http://91.193.183.139:7000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({login: login, password: password})
            })
                .then((res) => res.json())
                .then((data) => {
                        localStorage.setItem('token', data.token);
                        handleClose();
                    }
                )
                .catch((err) => console.error(err));
        }

    }
    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }


    console.log(localStorage.getItem('token'))
    return (
        <div>
            <Button variant="outlined"
                    onClick={localStorage.getItem('token') === null ? () => handleClickOpen() : () => logout()}>

                {
                    localStorage.getItem('token') !== null ?
                        'Sing' :
                        (
                            registration ?
                                'Login'
                                :

                                'Sing in'
                        )
                }
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <style.h5 variant={"h5"}>{
                    registration ?
                        'Login'
                        :

                        'Sing in'
                }
                </style.h5>

                <style.padding value={login} onChange={event => setLogin(event.target.value)} id="authLog" label="Login"
                               variant="outlined"/>
                <style.padding value={password} onChange={event => setPassword(event.target.value)} id="pass"
                               type={"password"} label="Password" variant="outlined"/>
                <style.accept onClick={() => switchRegistration()}>
                    {
                        registration ?
                            'Registration?'
                            :
                            'login?'
                    }
                </style.accept>
                <Grid container columns={2}>
                    <Grid item>
                        <style.button variant="contained"
                                      onClick={() => auth()}>
                            {
                                registration ?
                                    'login'
                                    :
                                    'Registration'
                            }
                        </style.button>

                    </Grid>
                    <Grid item></Grid>
                </Grid>
            </Dialog>
        </div>
    );
};

export default ModalAuth;