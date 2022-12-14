
import React from 'react';
import "./register.styles.css";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import imgLogo from "../../assets/images/logo.png";
import Input from '@material-ui/core/Input';
import { pages } from '../../constants/strings';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from './register.helper';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    input: {
      color: "white"
    }
  });

export default function Register(props) {
    const [values, setValues] = React.useState({
        emailId: '',
        username: '',
        firstName: '',
        lastName: '',
        confirmPassword: "",
        password: '',
        showPassword: false,
        showConfirmPassword: false,
    });
    const [errorValues, setErrorValues] = React.useState({
        emailId: '',
        username: '',
        confirmPassword: "",
    });
    const handleChange = (prop) => (event) => {
        setErrorValues({
            emailId: '',
            username: '',
            confirmPassword: "",
        })
        setValues({ ...values, [prop]: event.target.value });
    };
    const classes = useStyles();
    const validateInputs = () => {
        let allValid = true;
        let confirmPassword = "";
        let emailId = "";
        if (values.confirmPassword !== values.password) {
            confirmPassword = "Confirm Password does not match with Password"
            allValid = false;
        }
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.emailId)) {
            emailId = "Email id is not valid"
            allValid = false;
        }
        if (!allValid) {
            setErrorValues({ ...errorValues, confirmPassword: confirmPassword, emailId: emailId})
        }
        return allValid;
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onRegisterClick = async () => {
        if (validateInputs()) {
            try {
                props.showLoader("Creating User");
                await register(values);
                toast.success("User Registration Sucessfull")
                props.updateSelectedPage(pages.LOGIN)
                props.hideLoader();
            } catch (e) {
                props.hideLoader();
                setErrorValues({ ...errorValues, username: "Username Already Exists", emailId: "Email Id Already Exists" })
            }
        }
    }
    return (
        <>
            <div className={"d-flex h-100 justify-content-center "}>
                <div style={{ width: "50%", maxWidth: 1000 }}>
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => { props.updateSelectedPage(pages.LOGIN) }}>
                        <img src={imgLogo} height={50} width={50} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginLeft: 10 }}>
                        <h2 style={{ fontFamily: "Barlow-Bold", marginBottom: 30 , color: "white"}}>Register</h2>
                    </div>
                    <div style={{ marginBottom: 20, display: "flex", flexWrap: "wrap" }}>
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}>
                            <TextField label="First Name"
                                id="standard-adornment-email"
                                onChange={handleChange('firstName')} inputProps={{ className: classes.input }} InputLabelProps={{className:"textfield__label"}}/>
                        </FormControl>
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}>
                            <TextField label="Last Name"
                                id="standard-adornment-email"
                                onChange={handleChange('lastName')} inputProps={{ className: classes.input }} InputLabelProps={{className:"textfield__label"}}/>
                        </FormControl>
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}>
                            <TextField label="Email ID"
                                id="standard-adornment-email"
                                onChange={handleChange('emailId')}
                                error={errorValues.emailId != ""}
                                helperText={errorValues.emailId}
                                color={errorValues.emailId == "" ? "primary" : "secondary"}
                                inputProps={{ className: classes.input }}
                                InputLabelProps={{className:"textfield__label"}}
                            />
                        </FormControl>
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}>
                            <TextField label="Username"
                                id="standard-adornment-email"
                                onChange={handleChange('username')}
                                error={errorValues.username != ""}
                                helperText={errorValues.username}
                                color={errorValues.username == "" ? "primary" : "secondary"}
                                inputProps={{ className: classes.input }} 
                                InputLabelProps={{className:"textfield__label"}}
                            />
                        </FormControl>
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginBottom: 20, marginRight: 20 }}>
                            {/* <InputLabel htmlFor="outlined-adornment-amount">Password</InputLabel> */}
                            <TextField label="Password"
                                type={values.showPassword ? 'text' : 'password'}
                                onChange={handleChange('password')}
                                InputProps={{
                                    className: classes.input,
                                    endAdornment:
                                        <>
                                            <InputAdornment position="end" >
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    style={{color:"#7858A6"}}
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        </>
                                }}
                                InputLabelProps={{className:"textfield__label"}}
                            />
                        </FormControl>
                        <FormControl variant="outlined" style={{ paddingLeft: 10, width: 250, marginRight: 20 }}>
                            {/* <InputLabel htmlFor="outlined-adornment-amount">Confirm Password</InputLabel> */}
                            <TextField label="Confirm Password"
                                type={values.showConfirmPassword ? 'text' : 'password'}
                                onChange={handleChange('confirmPassword')}
                                InputProps={{
                                    className: classes.input,
                                    endAdornment:
                                        <>
                                            <InputAdornment position="end" >
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    style={{color:"#7858A6"}}
                                                >
                                                    {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        </>
                                }}
                                InputLabelProps={{className:"textfield__label"}}
                                color={errorValues.confirmPassword == "" ? "primary" : "secondary"}
                                error={errorValues.confirmPassword != ""}
                                helperText={errorValues.confirmPassword} />
                        </FormControl>
                    </div>
                    <div>
                        {
                            (values.emailId != "" && values.password != "" && values.confirmPassword != "" && values.firstName != "" && values.username != "" && values.lastName != "") ?
                                <button style={{ borderWidth: 0, backgroundColor: "#1DA1F2", color: "white", width: "100%", padding: 10, borderRadius: 20, marginBottom: 20 }} onClick={onRegisterClick}>Submit</button>
                                : <button style={{ borderWidth: 0, backgroundColor: "#b9dbf0", color: "white", width: "100%", padding: 10, borderRadius: 20, marginBottom: 20 }}>Log in</button>
                        }
                    </div>

                </div>
            </div>
        </>
    )

}
