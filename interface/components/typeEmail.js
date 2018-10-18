import React from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link'

class ForgotPasswordForm extends React.Component {

	render () {

		return (

			<Link href="/"><a>home</a></Link>

		);
	}
}

/*ForgotPasswordForm.PropTypes ={
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPasswordForm);*/

export default ForgotPasswordForm;