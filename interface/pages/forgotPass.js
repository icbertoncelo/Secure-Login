import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ForgotPasswordForm from '../components/forgotPassForm';
import TypeEmail from '../components/typeEmail';
import Link from 'next/link';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
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
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
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

const steps = ['Digitar email', 'Token enviado', 'Trocar senha'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <TypeEmail/>;
    case 1:
      return (
      	<Typography variant="h6" gutterBottom>
        	Token de confirmação enviado para o email requisitado
        </Typography>
      )  	
    case 2:
      return <ForgotPasswordForm/>;
    default:
      throw new Error('Unknown step');
  }
}

class ForgotPassword extends React.Component {

	constructor (){
    super ();
    this.state = {  
      activeStep: 0,
    };


    this.nextStep     = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.resetSteps   = this.resetSteps.bind(this);
  }

  nextStep() {

    // verify if the user exists and if the field is empty
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
    // auth/forgotpassword
  };

  previousStep() {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  resetSteps() {
    this.setState({
      activeStep: 0,
    });
  };

	render () {

		const { classes } = this.props;
    const { activeStep } = this.state;

		return (

			<React.Fragment>
        <CssBaseline />

        <main className={classes.layout}>
          <Paper className={classes.paper}>

            <Typography component="h1" variant="h4" align="center">
              Definir nova senha
            </Typography>

            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>

                  <Typography variant="h6" gutterBottom>
                    Senha alterada com sucesso!! <Link href="/"><a>Home</a></Link>
                  </Typography>

                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep >= 0 && (
                      <Link href="/">
                        <Button className={classes.button}> 
                          Home
                        </Button>
                      </Link>
                    )}  

                    {activeStep !== 0 && (
                      <Button onClick={this.previousStep} className={classes.button}>
                        Voltar
                      </Button>
                    )}                   

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.nextStep}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Concluir' : 'Avançar'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>

          </Paper>
        </main>
      </React.Fragment>

			
		);
	}
}

ForgotPassword.PropTypes ={
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPassword);
