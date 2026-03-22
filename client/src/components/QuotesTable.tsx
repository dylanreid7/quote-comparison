import type { Offer, Quote } from '../pages/QuoteComparisonPage';
import SupplierHeader from './SupplierHeader';

type QuotesTableProps = {
  quote: Quote;
};

function QuotesTable({ quote }: QuotesTableProps) {
  return (
    <table>
      <thead>
        <tr>
         <th rowSpan={2}>Part Name</th>
         <th rowSpan={2}>Qty</th>
         {quote.offers.map((offer: Offer) => (
           <th key={offer._id}>
             <SupplierHeader offer={offer} />
           </th>
         ))}
        </tr>
      </thead>
      <tbody>
        <tr>

        </tr>
      </tbody>
    </table>
  );
}

export default QuotesTable;