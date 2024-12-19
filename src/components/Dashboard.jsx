import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Grid, Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, Stack } from '@mui/material';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('profile'); // Switch between "profile" and "emails"
  
  const authToken = Cookies.get('authToken');

  // Fetch user profile on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://jobtracker-m84h.onrender.com/profile', {
          withCredentials: true,
          params: {
            token: authToken,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };
    fetchUser();
  }, [authToken]);

  // Fetch saved emails
  const fetchSavedEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/saved-emails', {
        withCredentials: true,
        params: { token: authToken }, // Pass the token if required
      });
      setEmails(response.data);
    } catch (err) {
      setError('Failed to fetch saved emails');
    }
    setLoading(false);
  };

  // Fetch emails related to job applications
  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jobtracker-m84h.onrender.com/emails', {
        withCredentials: true,
        params: {
          token: authToken,
        },
      });
      setEmails(response.data);
    } catch (err) {
      console.error('Error fetching emails:', err);
      setError('Failed to fetch emails. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={() => setView('profile')}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => { setView('emails'); fetchEmails(); }}>
            Emails
          </Button>
          <Button color="inherit" onClick={() => alert('Logged out!')}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Profile View */}
      {view === 'profile' && user && (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Avatar
            src={user.profileImg}
            alt={user.displayName}
            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
          />
          <Typography variant="h5">{user.displayName}</Typography>
          <Typography variant="subtitle1">{user.email}</Typography>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body1">Welcome to your dashboard!</Typography>
        </Box>
      )}

      {/* Emails View */}
      {view === 'emails' && (
        <Box sx={{ px: 3 }}>
          {loading ? (
            <Stack sx={{ width: '100%', color: 'grey.500', mt: 5 }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          ) : error ? (
            <Typography color="error" textAlign="center" sx={{ mt: 5 }}>
              {error}
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ mt: 5 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>From</strong></TableCell>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {emails.map((email) => (
                    <TableRow key={email.id}>
                      <TableCell>{email.from}</TableCell>
                      <TableCell>{email.subject}</TableCell>
                      <TableCell>Applied</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
