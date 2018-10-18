import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

class Register extends React.Component {

	render() {

		const { classes } = this.props;

		return (
			<React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Cadastro
            </Typography>

            <React.Fragment>
				      <Grid container spacing={24}>

				        <Grid item xs={12} sm={6}>
				          <TextField
				            required
				            id="name"
				            name="name"
				            label="Nome"
				            fullWidth
				            autoComplete="fname"
				          />
				        </Grid>
				        <Grid item xs={12} sm={6}>
				          <TextField
				            required
				            id="lastName"
				            name="lastName"
				            label="Sobrenome"
				            fullWidth
				            autoComplete="lname"
				          />
				        </Grid>
				        <Grid item xs={12}>
				          <TextField
				          	required
				            id="email"
				            name="email"
				            label="Email"
				            fullWidth
				            //autoComplete="email"
				          />
				        </Grid>
				        <Grid item xs={12}>
				          <TextField
				          	required
				            id="password"
				            name="password"
				            type="password"
				            label="Senha"
				            fullWidth
				          />
				        </Grid>
				        <Grid item xs={12}>
				          <TextField
				          	required
				            id="password"
				            name="password"
				            type="password"
				            label="Confirmar Senha"
				            fullWidth
				          />
				        </Grid>
				        <Grid item xs={12} sm={6}>
				          <TextField
				            required
				            id="phoneNumber"
				            name="phoneNumber"
				            label="Telefone"
				            fullWidth
				            autoComplete="phone"
				          />
				        </Grid>
				        <Grid item xs={12} sm={6}>
				          <TextField
				            required
				            id="birthDate"
				            name="birthDate"
				            label="Data de nascimento"
				            fullWidth
				            autoComplete="bDate"
				          />
				        </Grid>

				      </Grid>
				    </React.Fragment>

				    <React.Fragment>
              <div className={classes.buttons}>
             		<Link href='/'>
                	<Button 
                  	variant="contained"
	                  color="primary"
	                  className={classes.button}
	                 >
                    Cancelar
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                 >
                	Salvar
              </Button>
              </div>
            </React.Fragment>

          </Paper>
        </main>
      </React.Fragment>
		);
	}
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);

