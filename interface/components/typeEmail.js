import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  layout: {
    width: 'auto',
  },
});

class TypeEmail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email:''
		}

		this.changeEmail = this.changeEmail.bind(this);
	}

	changeEmail(e) {
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
            <React.Fragment>				      
			        <Grid>
			          <TextField
			            required
			            id="email"
			            label="Email"
			            fullWidth
			            onChange={this.changeEmail}
			          />
			        </Grid>
				    </React.Fragment>
        </main>
      </React.Fragment>

		);
	}
}

TypeEmail.PropTypes ={
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TypeEmail);
