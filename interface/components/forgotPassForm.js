import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  layoutPassForm: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
});

class ForgotPasswordForm extends React.Component {

	render() {

		const { classes } = this.props;

		return (
			<React.Fragment>
        <CssBaseline />
        <main className={classes.layoutPassForm}>
            <Typography component="h1" variant="h6" align="center">
              Utilize o token de confirmação recebido
            </Typography>

            <React.Fragment>
				      <Grid container spacing={24}>

				      	<Grid item xs={12}>
				          <TextField
				          	required
				            id="email"
				            label="Email"
				            fullWidth
				          />
				        </Grid>

				        <Grid item xs={12}>
				          <TextField
				            required
				            id="token"
				            label="Token de confirmação"
				            fullWidth
				          />
				        </Grid>
				        <Grid item xs={12}>
				          <TextField
				          	required
				            id="newpass"
				            type="password"
				            label="Nova senha"
				            fullWidth
				          />
				        </Grid>
				        <Grid item xs={12}>
				          <TextField
				          	required
				            id="confnewpass"
				            type="password"
				            label="Confirmar Senha"
				            fullWidth
				          />
				        </Grid>

				      </Grid>
				    </React.Fragment>

        </main>
      </React.Fragment>
		);
	}
}

ForgotPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPasswordForm);