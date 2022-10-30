import { Alert, Button, CircularProgress, Container } from '@mui/material';
import s from './loader.module.css';

interface LoaderProps {
  onLocalizationCancel: () => void;
}

function Loader({ onLocalizationCancel }: LoaderProps) {
  return (
    <Container className={s.container}>
      <CircularProgress className={s.circularProgress} color="success" size={100} />
      <Alert severity="warning" className={s.alert}>
        Location is required for Green Mode personalization
      </Alert>
      <Button variant="text" onClick={onLocalizationCancel} className={s.button} color="warning">
        Cancel
      </Button>
    </Container>
  );
}

export default Loader;
