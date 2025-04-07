import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid } from '@mui/material';

const RegisterForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required')
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;