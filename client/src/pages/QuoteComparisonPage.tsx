import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './QuoteComparisonPage.css';
import { getQuoteById } from '../api';

interface Quote {
    _id: string;
    customerName: string;
    offers: Offer[];
  }
  
  interface Offer {
    _id: string;
    supplierId: string;
    item: Item[];
    shippingPrice: number;
    totalPrice: number;
    leadTime: number;
  }
  
  interface Item {
    _id: string;
    itemId: string;
    unitPrice: number;
    quantity: number;
  }

function QuoteComparisonPage() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Quote | null>(null);

  useEffect(() => {
    if (!quoteId) return;
    getQuoteById(quoteId)
      .then((res) => {
        setData(res.data)
      })
      .catch(() => setError('Quote not found.'))
      .finally(() => setLoading(false));
  }, [quoteId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return null;

  return (
    <div>
      <div>Data found: { data._id }</div>
      <div>Total price: { data.customerName }</div>
    </div>
  );
}

export default QuoteComparisonPage;