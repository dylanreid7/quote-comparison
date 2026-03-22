import type { Offer } from "../pages/QuoteComparisonPage";
import './SupplierHeader.css';

type SupplierHeaderProps = {
  offer: Offer;
}
function SupplierHeader({ offer }: SupplierHeaderProps) {
  return (
    <div className="supplier-container">
        <div className="name-country">
            <div className="name">
            {offer.supplierName}
            </div>
            <div className="country">{offer.supplierCountry}</div>
        </div>
        <div className="rating">{offer.supplierRating}</div>
    </div>
  );
}

export default SupplierHeader;