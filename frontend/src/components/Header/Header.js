import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	container: {
		alignItems: 'flex-end',
	},
	link: {
		color: 'inherit',
		textDecoration: 'none',
	},
}));

const Header = (props) => {
	const classes = useStyles();
	const currentUser = JSON.parse(localStorage.getItem('user'));

	const logout = () => {
		localStorage.removeItem('user');
		window.location.reload();
	};

	return (
		<div className={classes.root}>
			<AppBar color="transparent" position="static" className={classes.container}>
				<Toolbar variant="dense">
					{!currentUser ? (
						<NavLink className={classes.link} to={`/login`} style={{ textDecoration: 'none' }}>
							<Button color="inherit">Login</Button>
						</NavLink>
					) : (
						<div>
							<Button color="inherit">{currentUser.username}</Button>
							<Button onClick={logout} color="inherit">
								Logout
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
