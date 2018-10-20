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
import axios from 'axios';

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

	constructor(){
		super();
		this.state = {
			//Register From
			name: '',
			lastName: '',
			birthDate: '',
			phoneNumber: '',
			email: '',
			password: '',
			confPassword: ''		
		};

		this.registerUser 	= this.registerUser.bind(this);
		this.changeRegister = this.changeRegister.bind(this);	}

	//user register function
	registerUser(e) {
    e.preventDefault();

    const newUser = {
        name: this.state.name,
        lastName: this.state.lastName,
        birthDate: this.state.birthDate,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        password: this.state.password
    };
  	
    if (this.state.name && this.state.lastName && this.state.birthDate 
    		&& this.state.phoneNumber && this.state.email 
    		&& this.state.password != '') { //verify if all fields was fill --GAMBIARRA--

    	if(this.state.password == this.state.confPassword) {	//verify the password 
    	
		    axios.post('http://localhost:7000/auth/register', newUser)
		        .then(response => {
		            alert('Cadatro efetuado com sucesso');
		            console.log(response.data);
		    });
			} else alert("Senhas não conferem. Por favor, verifique!"); 

    } else alert("Por favor, preencha Todos os campos!");

  	//cleaning the states
	  this.setState({
	  	name: '',
			lastName: '',
			birthDate: '',
			phoneNumber: '',
			email: '',
			password: '',
			confPassword: ''
	  });
	}

	//capture the values that was typed
	changeRegister(e){
		const { id, value } = e.target;

		this.setState({
			[id]: value
		});

	}

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
				            label="Nome"
				            fullWidth
				            onChange={this.changeRegister}
				            value={this.state.name}
				          />
				        </Grid>
				        <Grid item xs={12} sm={6}>
				          <TextField
				            required
				            id="lastName"
				            label="Sobrenome"
				            fullWidth
				            onChange={this.changeRegister}
				            value={this.state.lastName}
				          />
				        </Grid>
				        <Grid item xs={12}>
				          <TextField
				          	required
				            id="email"
				            label="Email"
				            fullWidth
				            onChange={this.changeRegister}
				            value={this.state.email}
				          />
				        </Grid>
				        <Grid item xs={12}>
				          <TextField
				          	required
				            id="password"
				            type="password"
				            label="Senha"
				            fullWidth
				            onChange={this.changeRegister}
				            value={this.state.password}
				          />
				        </Grid>
				        <Grid item xs={12}>
				          <TextField
				          	required
				            id="confPassword"
				            type="password"
				            label="Confirmar Senha"
				            fullWidth
				            onChange={this.changeRegister}
				            value={this.state.confPassword}
				          />
				        </Grid>
				        <Grid item xs={12} sm={6}>
				          <TextField
				            required
				            id="phoneNumber"
				            label="Telefone"
				            fullWidth
				            onChange={this.changeRegister}
				            value={this.state.phoneNumber}
				          />
				        </Grid>
				        <Grid item xs={12} sm={6}>
				          <TextField
				            required
				            id="birthDate"
				            label="Data de nascimento"
				            fullWidth
				            onChange={this.changeRegister}
				            value={this.state.birthDate}
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
                    Voltar
                  </Button>
                </Link>
	                <Button
	                  variant="contained"
	                  color="primary"
	                  className={classes.button}
	                  onClick={this.registerUser}
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

