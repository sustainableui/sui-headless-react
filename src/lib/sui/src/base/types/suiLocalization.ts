interface SuiLocalization {
  status: 'in-progress' | 'success' | 'failure' | 'cancelled';
  error: string;
}

export default SuiLocalization;
