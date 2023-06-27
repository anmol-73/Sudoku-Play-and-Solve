import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "../style/font.css";
import { Link } from "react-router-dom";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import { ReactComponent as CustomIcon } from "../logo.svg";

const pages = ["Play", "Solve"];

function Navbar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	//   const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	//   const handleOpenUserMenu = (event) => {
	//     setAnchorElUser(event.currentTarget);
	//   };

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	//   const handleCloseUserMenu = () => {
	//     setAnchorElUser(null);
	//   };

	function getLink(page) {
		if (page === "Play" || page === "play") return "/";
		else if (page === "Solve") return "/solve";
		else return "/";
	}

	return (
		<AppBar position="static" sx={{backgroundColor: "#008080"}}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
                            sx={{padding:"0"}}
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography
										textAlign="center"
										component={Link}
										to={getLink(page)}
										sx={{
											textDecoration: "none",
											color: "inherit",
											fontFamily: "Roboto Slab, serif",
										}}
									>
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu>
				</Box>

                    <Box
						component={CustomIcon}
						sx={{
							// display: { xs: "flex", md: "none" },
							mr: 1,
							width: "2rem",
							height: "2rem",
						}}
					/>

					<Typography
						variant="h5"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "Roboto Slab, serif",
							//   letterSpacing: "0.125rem",
							fontWeight: 500,
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Sudoku: Play & Solve
					</Typography>

					
					<Typography
						variant="h5"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "Roboto Slab, serif",
							fontWeight: 500,
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Sudoku
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							justifyContent: "flex-end",
						}}
					>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Typography
									variant="h6"
									noWrap
									component={Link}
									to={getLink(page)}
									sx={{
										mr: 2,
										fontFamily: "Roboto Slab, serif",
										fontWeight: 400,
										letterSpacing: ".1rem",
										color: "inherit",
										textDecoration: "none",
										textTransform: "capitalize",
									}}
								>
									{page}
								</Typography>
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
