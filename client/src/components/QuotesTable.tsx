import type { Quote } from '../pages/QuoteComparisonPage';

type QuotesTableProps = {
  quote: Quote;
};

function QuotesTable({ quote }: QuotesTableProps) {
  return (
    <table>
      <thead>
        <tr>
         <th>Part Name</th>
         <th>Qty</th>
         {quote.offers.map((offer) => (
           <th key={offer._id}>{offer.supplierId}</th>
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