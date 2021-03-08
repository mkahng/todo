import React, {useState, useEffect} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { Link, Route } from 'react-router-dom';
import { auth } from './firebase';

export function SignIn(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        props.history.push("/app")
      }
    })

    return unsubscribe
  }, [props.history])

  const handleSignIn = () => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
  <div>
    <AppBar position="static" color='primary'>
      <Toolbar>
        <Typography variant="h6" color='inherit'>
          Sign In
        </Typography>
      </Toolbar>
    </AppBar>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Paper style={{width: 480, marginTop: 50, padding: 30}}>
        <TextField placeholder='Email' fullWidth={true} value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        <TextField type='password' placeholder='Password' fullWidth={true} style={{marginTop: 30}} value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 30}}>
          <Typography>Don't have an account? <Link to='/signup'>Sign up!</Link></Typography>
          <Button color= 'primary' variant="contained" onClick={handleSignIn}>sign in</Button>
        </div>
      </Paper>
    </div>
  </div>);
}

export function SignUp(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        props.history.push("/app")
      }
    })

    return unsubscribe
  }, [props.history])

  const handleSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password).then(() => {
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <div>
    <AppBar position="static" color='primary'>
      <Toolbar>
        <Typography variant="h6" color='inherit'>
          Sign Up
        </Typography>
      </Toolbar>
    </AppBar>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Paper style={{width: 480, marginTop: 50, padding: 30}}>
        <TextField placeholder='Email' fullWidth={true} value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        <TextField type='password' placeholder='Password' fullWidth={true} style={{marginTop: 30}} value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 30}}>
          <Typography>Already have an account? <Link to='/'>Sign in!</Link></Typography>
          <Button color= 'primary' variant="contained" onClick={handleSignUp}>sign up</Button>
        </div>
      </Paper>
    </div>
  </div>);
}

export function App(props) {
  const [drawer_open,  setDrawerOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u)
      } else{
        props.history.push("/");
      }
    })

    return unsubscribe
  }, [props.history])

  const handleSignOut = () => {
    auth.signOut().then(() => {
      props.history.push("/")
    }).catch((error) => {
      alert(error.message)
    })
  }

  if (!user) {
    return <div/>
  }

  return (
  <div>
    <AppBar position="static" color='primary'>
      <Toolbar>
        <IconButton style={{marginRight: 30}} color='inherit'onClick={() => {setDrawerOpen(true)}}><MenuIcon/></IconButton>
        <Typography variant="h6" color='inherit' style={{flexGrow: 1}}>
          My App
        </Typography>
        <Typography color='inherit' style={{marginRight: 30}}>Hi! {user.email}</Typography>
        <Button color='inherit' onClick={handleSignOut}>Sign out</Button>
      </Toolbar>
    </AppBar>
    <Drawer open={drawer_open} onClose={() => {setDrawerOpen(false)}}>
      <div>hello</div>
    </Drawer>
  </div>);
}