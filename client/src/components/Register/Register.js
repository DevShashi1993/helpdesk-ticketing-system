import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { createNewUser } from '../../store/actions/authActions';
import { useFormik } from 'formik';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    isSubmitting,
    errors
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      firstName: Yup.string()
        .max(255)
        .required('First name is required'),
      lastName: Yup.string()
        .max(255)
        .required('Last name is required'),
      password: Yup.string()
        .max(255)
        .required('Password is required'),
      companyName: Yup.string()
        .max(255)
        .required('Company Name is required')
    }),
    onSubmit: ({ firstName, lastName, email, companyName, password }) => {
      dispatch(
        createNewUser({
          firstName: firstName,
          lastName: lastName,
          email: email,
          companyName: companyName,
          password: password
        })
      );
    }
  });

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              Create new account
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Use your email to create new account
            </Typography>
          </Box>
          <TextField
            error={Boolean(touched.firstName && errors.firstName)}
            fullWidth
            helperText={touched.firstName && errors.firstName}
            label="First name"
            margin="normal"
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.lastName && errors.lastName)}
            fullWidth
            helperText={touched.lastName && errors.lastName}
            label="Last name"
            margin="normal"
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.companyName && errors.companyName)}
            fullWidth
            helperText={touched.companyName && errors.companyName}
            label="Company Name"
            margin="normal"
            name="companyName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.companyName}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box my={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign up now
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Have an account?{' '}
            <Link component={RouterLink} to="/login" variant="h6">
              Sign in
            </Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
