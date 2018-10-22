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
//import ForgotPasswordForm from '../components/forgotPassForm';
//import TypeEmail from '../components/typeEmail';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

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
  }
});

const steps = ['Digitar email', 'Token enviado', 'Trocar senha'];

class ForgotPassword extends React.Component {

  constructor (props){

    super (props);
    this.state = {  
      activeStep: 0,
      firstEmail: '',
      secondEmail: '',
      token: '',
      newpass: '',
      confNewPass: ''
    };

    this.nextStep       = this.nextStep.bind(this);
    this.previousStep   = this.previousStep.bind(this);
    this.sendEmail      = this.sendEmail.bind(this);
    this.resetPass      = this.resetPass.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.changeEmail    = this.changeEmail.bind(this);
    this.changePassForm = this.changePassForm.bind(this);
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (

          <React.Fragment>
            <CssBaseline />
            <main width='auto'>
                <React.Fragment>              
                  <Grid>
                    <TextField
                      required
                      id="firstEmail"
                      label="Email"
                      fullWidth
                      onChange={this.changeEmail}
                    />
                  </Grid>
                </React.Fragment>
            </main>
          </React.Fragment>
        );
      case 1:
        return (
          <Typography variant="h6" gutterBottom>
            Token de confirmação enviado para o email requisitado
          </Typography>
        )   
      case 2:
        return (

          <React.Fragment>
            <CssBaseline />
            <main width= 'auto'>
              <Typography component="h1" variant="h6" align="center">
                Utilize o token de confirmação recebido
              </Typography>

              <React.Fragment>
                <Grid container spacing={24}>

                  <Grid item xs={12}>
                    <TextField
                      required
                      id="secondEmail"
                      label="Email"
                      fullWidth
                      onChange={this.changePassForm}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      id="token"
                      label="Token de confirmação"
                      fullWidth
                      onChange={this.changePassForm}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="newpass"
                      type="password"
                      label="Nova senha"
                      fullWidth
                      onChange={this.changePassForm}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="confNewPass"
                      type="password"
                      label="Confirmar Senha"
                      fullWidth
                      onChange={this.changePassForm}
                    />
                  </Grid>

                </Grid>
              </React.Fragment>
            </main>
          </React.Fragment>

        );

      default:
        throw new Error('Unknown step');
    }
  }

  // fetch the email element that was type
  changeEmail(e) {
    const { id, value } = e.target;

    this.setState({
      [id]: value
    });
  }

  // fetch the reset form elements that was type
  changePassForm(e) {
    const { id, value } = e.target;;

    this.setState({
      [id]: value
    });
  }

  // funtion to access the forgot password route
  sendEmail(e) {
    e.preventDefault();

    const reqEmail = {
        email: this.state.firstEmail
    };

    if( reqEmail.email !== '' && reqEmail.email.indexOf('@') > -1){

      axios.post('http://localhost:7000/auth/forgot_password', reqEmail)
          .then(response => {
              alert("Token enviado com sucesso");
              console.log(response.data);
      });

      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));

    } else alert("Verifique o campo email.");

  };

  // funtion to access the reset password route
  resetPass(e) {
    e.preventDefault();

    const dataResetPass = {
        email: this.state.secondEmail,
        token: this.state.token,
        password: this.state.newpass
    };

    if(dataResetPass.email && dataResetPass.token && dataResetPass.password 
      && this.state.confNewPass !== ''){

      if(dataResetPass.email === this.state.firstEmail) {

        if(dataResetPass.password === this.state.confNewPass) {

          axios.post('http://localhost:7000/auth/reset_password', dataResetPass)
              .then(response => {
                  alert("Senha alterada com sucesso");
                  console.log(response.data);
          });

          //cleaning the states
          this.setState({
            firstEmail: '',
            secondEmail: '',
            token: '',
            password: ''
          });

          this.setState(state => ({
            activeStep: state.activeStep + 1,
          }));

        } else alert("Senhas não conferem. Por favor, verifique."); 

      } else alert("Emails não conferem. Por favor, verifique."); 

    } else alert('Por favor, preencha todos os campos.');

  };

  nextStep() {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  previousStep() {    
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
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
                  {this.getStepContent(activeStep)}
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

                    {activeStep === 0 && (
                      <Button
                      variant="contained"
                      color="primary"
                      onClick={this.sendEmail}
                      className={classes.button}
                    >
                    {activeStep === steps.length - 1 ? 'Concluir' : 'Avançar'}
                    </Button>
                    )}                   
                    
                    {activeStep === steps.length - 2 && (
                      <Button
                      variant="contained"
                      color="primary"
                      onClick={this.nextStep}
                      className={classes.button}
                    >
                    {activeStep === steps.length - 1 ? 'Concluir' : 'Avançar'}
                    </Button>
                    )} 

                    {activeStep === steps.length - 1 && (
                      <Button
                      variant="contained"
                      color="primary"
                      onClick={this.resetPass}
                      className={classes.button}
                    >
                    {activeStep === steps.length - 1 ? 'Concluir' : 'Avançar'}
                    </Button>
                    )} 

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
