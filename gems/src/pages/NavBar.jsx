// src/components/Navbar.js
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gem Software
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/fill">Fill</Button>
          <Button color="inherit" component={Link} to="/print">Print</Button>
          <Button color="inherit" component={Link} to="/purchase_list">Purchase List</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;