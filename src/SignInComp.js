import React, {useEffect, useState} from 'react'
import {Box, FormControl, Input, InputLabel, Button} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import Snackbar, {SnackbarOrigin} from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SignUpCom = (props) => {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [sendHome, setSendHome] = useState(false)
    const [open, setOpen] = useState(false)
    const [passwordInfo, setPasswordInfo] = useState(false)
    const position = {
        vertical: 'top',
        horizontal: 'center'
    }
    useEffect(() => {
        setMessage('')
    }, [user, email, password])
    const handleOpen = ()=> {
        setOpen(true)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        setOpen(false);
    }
    
    const checkLength = (event,minLen)=> {
        let target = event.target
            if (target.value.length < minLen ) {
                setMessage('Password has to be 1 character long')
            handleOpen();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            user,
            email,
            password
        }
        fetch(`/api/signin`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then((response) => {
            response.json().then(result => {
                if(response.ok) {
                    props.userOnChange(result.data["nickname"])
                    props.sessionOnChange(result.session["sessionid"])
                    props.loadUserData(result)
                    setMessage('Signed In')
                } else {
                    setMessage(`${response.status} ${response.statusText}: ${result.message}`)
                    handleOpen()
                }
            }).catch((err) => {
                console.log(err)
                handleOpen()
            })
        }).catch((err) => {
            handleOpen()
            setMessage(`Error: ${err.toString()}`)
        })
    }
    const handleRedirect = (e) => {
        e.preventDefault()
        setRedirect(true)
    }
    const handleHome = (e) => {
        e.preventDefault()
        setSendHome(true)
    }

    if(sendHome) {
        return <Redirect to="/" />
    }
    if(redirect) {
        return <Redirect to="/signup" />
    }
    if(props.signedIn){
        return <Redirect to="/" />
    }
    return(
        <Box style={{"backgroundColor":"rgba(255,255,255,.75)", "maxWidth":"75%", "minWidth":"50%", "margin": "25px auto", "textAlign":"center", "border":"2px black solid", "borderRadius":"10px"}}>
            <Box>
               <Snackbar anchorOrigin={position} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                          {message}
                    </Alert>
                </Snackbar>
            </Box>          
            <Box>
                <span className="italic">Don't have an account?</span>
                    <p className="signup">Create one here: &nbsp;
                        <Button onClick={(e) => handleRedirect(e)} variant="outlined">Sign up</Button>
                    </p>
            </Box>
            <h2 className="login">Login:</h2>
            <FormControl>
                <InputLabel htmlFor="firstname">user:</InputLabel>
                <Input id="first-name" name="firstname" aria-describedby="first-name-form" 
                onChange={(e) => setUser(e.currentTarget.value)} required />
            </FormControl>              
            <FormControl>
                <InputLabel htmlFor="email">Email:</InputLabel>
                <Input id="email" name="email" aria-describedby="email-form" 
                onChange={(e) => setEmail(e.currentTarget.value)} required />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Password:</InputLabel>
                <Input type="password" name="password" aria-describedby="password-form" 
                onBlur={(e) =>{
                    checkLength(e, 1)
                    setPasswordInfo(false)
                }}
                onFocus={(e) => setPasswordInfo(true)}
                onChange={(e) => setPassword(e.currentTarget.value)} required/>
            </FormControl>
            <Box className="password-info">
            <span>{passwordInfo ? 'Password is required to be 1 character long':''}</span>
            </Box>
            <Button style={{marginTop: "20px"}} onClick={e => handleSubmit(e)} variant="outlined" className="submit-button">Sign In</Button>
            <Box>
                <p className="login">Cancel: &nbsp;
                    <Button onClick={(e) => handleHome(e)} variant="outlined">Go Home</Button>
                </p>
            </Box>
        <Snackbar anchorOrigin={position} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      </Box>
    )
}
export default SignUpCom