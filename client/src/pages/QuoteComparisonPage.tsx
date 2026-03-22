import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './QuoteComparisonPage.css';
import { getQuoteById } from '../api';
import QuotesTable from '../components/QuotesTable';

export interface Quote {
  _id: string;
  customerName: string;
  offers: Offer[];
}
  
export interface Offer {
  _id: string;
  supplierId: string;
  supplierName: string;
  supplierCountry: string;
  supplierRating: string;
  items: Item[];
  shippingPrice: number;
  totalPrice: number;
  leadTime: number;
}

export interface Item {
  _id: string;
  itemId: string;
  itemName: string;
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
      <QuotesTable quote={data} />
    </div>
  );
}

export default QuoteComparisonPage;