import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './QuoteComparisonPage.css';
import { getQuoteById } from '../api';

function QuoteComparisonPage() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // TODO: use actual type
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    if (!quoteId) return;
    getQuoteById(quoteId)
      .then((res) => setData(res.data))
      .catch(() => setError('Quote not found.'))
      .finally(() => setLoading(false));
  }, [quoteId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  return (
    <div></div>
  );
}

export default QuoteComparisonPage;