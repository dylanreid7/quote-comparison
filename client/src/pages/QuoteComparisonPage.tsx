import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './QuoteComparisonPage.css';
import { getQuoteById } from '../api';

// quote:  {
//     _id: 'q1',
//     customerName: 'John Doe',
//     offers: [
//       {
//         _id: new ObjectId('69bedb62e07ed457203f41be'),
//         supplierId: 's1',
//         items: [Array],
//         shippingPrice: 15,
//         totalPrice: 827,
//         leadTime: 7
//       },
//       {
//         _id: new ObjectId('69bedb62e07ed457203f41c3'),
//         supplierId: 's2',
//         items: [Array],
//         shippingPrice: 0,
//         totalPrice: 1320,
//         leadTime: 10
//       },
//       {
//         _id: new ObjectId('69bedb62e07ed457203f41c8'),
//         supplierId: 's3',
//         items: [Array],
//         shippingPrice: 30,
//         totalPrice: 898,
//         leadTime: 6
//       }
//     ]
//   }


// ITEMS
// _id: new ObjectId('69bedc19576bed926ea770a8'),
//   itemId: 'i1',
//   unitPrice: 10,
//   quantity: 10
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
        console.log('res data: ', res.data);
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