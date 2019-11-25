import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import login from '../../../helpers/login';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 'auto',
        width: '250px',
        borderRadius: 10,
        backgroundColor: '#eae5e5',
        padding: '20px 40px'

    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: 200,
    },
    btn: {
        marginTop: 20
    }
}));



const Login = (props) => {
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
        helperText: 'enter email'
    });

    const classes = useStyles();
    const emailIsValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    const handleChange = prop => event => {
        if (prop === "email") {
            setValues({ ...values, [prop]: event.target.value, helperText: emailIsValid(event.target.value) ? '' : 'enter a valid email' });
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleLoginClick = () => {
        // props.history.push('/dashboard');
        console.log(values.email, values.password)
        login(values.email, values.password).then(res => {
            if (res === true) {
                props.history.push('/dashboard');
            }
        })
    }
    return (
        <div className={classes.root}>
            <FormControl className={classes.margin}>
                <TextField style={{ width: 200 }} label="Email" onChange={handleChange('email')} helperText={values.helperText} />

            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button type="button" disabled={values.helperText !== "" || values.password.length === 0} className={classes.btn} variant="contained" color="primary" onClick={handleLoginClick}>
                Login
      </Button>
        </div>
    )
}

export default Login;