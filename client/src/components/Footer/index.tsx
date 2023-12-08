import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          js-client-server
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </>
  );
}
