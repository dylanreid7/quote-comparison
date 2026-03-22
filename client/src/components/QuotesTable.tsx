import type { Offer, Quote, Item } from '../pages/QuoteComparisonPage';
import SupplierHeader from './SupplierHeader';

type QuotesTableProps = {
  quote: Quote;
};

interface ItemInfo {
  itemId: string;
  name: string;
  quote: QuoteInfo[];
}

interface QuoteInfo {
  supplierId: string;
  price: number;
  qty: number;
}

function QuotesTable({ quote }: QuotesTableProps) {
  const items: ItemInfo[] = [];
  quote.offers.forEach((offer) => {
    offer.items.forEach((item: Item) => {
      const itemIdx = items.findIndex(itemInfo => itemInfo.itemId === item.itemId);
      if (itemIdx === -1) {
        const quoteInfo: QuoteInfo = {
            supplierId: offer.supplierId,
            price: item.unitPrice,
            qty: item.quantity,
        };
        items.push({
          itemId: item.itemId,
          name: item.itemName,
          quote: [quoteInfo],
        });
      } else {
        const quoteInfo: QuoteInfo = {
            supplierId: offer.supplierId,
            price: item.unitPrice,
            qty: item.quantity,
        };
        items[itemIdx].quote.push(quoteInfo);
      }
    });
  });

  return (
    <table>
      <thead>
        <tr>
         <th rowSpan={2}>Part Name</th>
         {quote.offers.map((offer: Offer) => (
           <th key={offer._id} colSpan={3}>
             <SupplierHeader offer={offer} />
           </th>
         ))}
         
        </tr>
        <tr>
            {quote.offers.map(offer => (
                <>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Total Price</th>
                </>
            ))}
            
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
            <tr key={item.itemId}>
                <td>{item.name}</td>
                {item.quote.map(quote => (
                    <>
                        <td key={quote.supplierId}>{quote.price}</td>
                        <td>{quote.qty}</td>
                        <td>{quote.price * quote.qty}</td>
                    </>
                ))}
            </tr>
        ))}
      </tbody>
    </table>
  );
}

export default QuotesTable;