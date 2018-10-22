import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'next/link'; 
import Router from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {

  constructor (){
    super ();

    this.state = { 
      email: '',
      password: '',

      controller: ''
    };

    this.accessLogin  = this.accessLogin.bind(this);
    this.changeData   = this.changeData.bind(this);
  }
 
  accessLogin (e) {
  e.preventDefault();

    const newAccess = {
        email: this.state.email,
        password: this.state.password
    };

    if (newAccess.email && newAccess.password !== ''){
      axios.post('http://localhost:7000/auth/authenticate', newAccess)
          .then(response => {         
              if(response.data['validEmail'] == false){
                alert("Usuário não encontrado");
              } else 
                  if(response.data['validPass'] == false){
                    alert("Senha incorreta");
                    this.setState({
                      password: ''
                    });
                  } 
                  else 
                    if(newAccess.email.indexOf('@aluno') > -1){
                      alert("Login Efetuado com sucesso no server Aluno"); 
                      this.setState({
                        email: '',
                        password: ''
                      });
                      Router.push('/alunoPage');
                    } else  
                        if(newAccess.email.indexOf('@prof') > -1){
                          alert("Login Efetuado com sucesso no server Professor"); 
                          this.setState({
                            email: '',
                            password: ''
                          });
                          Router.push('/profPage');
                        } else
                            if(newAccess.email.indexOf('@adm') > -1){
                              alert("Login Efetuado com sucesso no server Adm"); 
                              this.setState({
                                email: '',
                                password: ''
                              });
                              Router.push('/admPage');
                            }                       
                  
      });

    } else alert("Por favor, preencha todos os campos")

  }

  changeData(e){
    const { id, value } = e.target;

    this.setState({
      [id]: value
    });

  }
  
  render () {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>

            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Login
            </Typography>

            <form className={classes.form} >

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input 
                  id="email" 
                  autoFocus 
                  onChange={this.changeData}
                  value={this.state.email}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Senha</InputLabel>
                <Input
                  id="password"
                  type="password"
                  onChange={this.changeData}
                  value={this.state.password}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.accessLogin}
              >
                Sign In
              </Button>
              <Grid container spacing={24}>

                <Grid item xs={12} sm={6}>
                  <Link href='/register'><a>Register now</a></Link>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Link href='/forgotPass'><a >Forgot Password</a></Link>
                </Grid>

              </Grid>

            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  };
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);


            