import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { logIn } from '../../redux/auth/operations';
import css from './LoginForm.module.css';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(logIn(values))
        .unwrap()
        .then(() => {
          resetForm();
        })
        .catch((err) => {
          toast.error('Login failed!');
          console.log(err);
        });
    }
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <h2>Log In</h2>
      <TextField
        fullWidth
        margin="normal"
        variant="outlined"
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        autoComplete="email"
      />
      <FormControl
        fullWidth
        variant="outlined"
        margin="normal"
        error={formik.touched.password && Boolean(formik.errors.password)}>
        <InputLabel htmlFor="outlined-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-password"
          name="password"
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseDownPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <FormHelperText>{formik.errors.password}</FormHelperText>
        )}
      </FormControl>

      <Button variant="contained" color="primary" type="submit">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
