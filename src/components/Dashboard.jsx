import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';



const Dashboard = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEmails, setShowEmails] = useState(false); // To control when to show the emails

  const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  console.log(authToken)
  // Function to fetch emails when the button is clicked
  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      // Make the GET request to your backend to fetch emails
      const response = await axios.get('http://localhost:5000/emails',{ withCredentials: true  ,
        params: {
          token:authToken, // Include the auth token if required
        },
      });

      // Set the email data to state
      setEmails(response.data);
    } catch (err) {
      setError('Failed to fetch emails', err);
    }
    setLoading(false);
  };

  if (loading) {
    return <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
    <LinearProgress color="secondary" />
    <LinearProgress color="success" />
    <LinearProgress color="inherit" />
  </Stack>
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          px: 2,
        }}
      >
        <h1>Welcome</h1>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mb: 3,
            px: 4,
            py: 1.5,
            borderRadius: '30px',
            fontSize: '18px',
          }}
          onClick={() => {
            setShowEmails(true); // Show emails when the button is clicked
            fetchEmails(); // Fetch the emails
          }}
        >
          Show Emails
        </Button>

        {/* Display emails only if showEmails is true */}
        {showEmails && (
          <TableContainer component={Paper} sx={{ mt: 4, maxWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>From</strong></TableCell>
                  <TableCell><strong>Subject</strong></TableCell>
                  <TableCell><strong>Snippet</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell>{email.from}</TableCell>
                    <TableCell>{email.subject}</TableCell>
                    <TableCell>{email.snippet}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Back Button */}
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          sx={{
            mt: 3,
            px: 4,
            py: 1.5,
            borderRadius: '30px',
            fontSize: '18px',
          }}
          onClick={() => setShowEmails(false)} // Hide emails when clicked
        >
          Back
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;
