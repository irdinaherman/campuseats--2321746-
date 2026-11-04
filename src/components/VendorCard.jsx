
import { Link } from 'react-router-dom'

function VendorCard({ vendor }) {
  return (
    <Link
      to={`/vendor/${vendor.id}`}
      className="vendor-link"
      aria-label={`View ${vendor.name} menu`}
    >
      <article className="card vendor-card">
        <div className="thumb" aria-hidden="true">
          {vendor.name.charAt(0)}
        </div>

        <div className="vendor-info">
          <h2>{vendor.name}</h2>

          <p className="muted vendor-location">
            {vendor.location}
          </p>

          <span className={vendor.isOpen ? 'status open' : 'status closed'}>
            {vendor.isOpen ? 'Open now' : 'Closed'}
          </span>

          <div className="vendor-hours">
            <p>
              <strong>Stall Hours</strong>
              <span>{vendor.stallHours || vendor.openHours}</span>
            </p>

            <p>
              <strong>Online Ordering</strong>
              <span>{vendor.onlineOrderingHours || vendor.openHours}</span>
            </p>

            <p>
              <strong>Delivery Hours</strong>
              <span>{vendor.deliveryHours || vendor.openHours}</span>
            </p>
          </div>

          <p className="vendor-view-menu">View Menu →</p>
        </div>
      </article>
    </Link>
  )
}

export default VendorCard
