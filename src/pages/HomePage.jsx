
import VendorCard from '../components/VendorCard.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import useVendors from '../hooks/useVendors.js'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()

  if (loading) {
    return (
      <main className="container">
        <p>Loading vendors...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container">
        <p role="alert">
          Unable to load vendors: {error}
        </p>

        <button
          type="button"
          className="btn"
          onClick={reload}
        >
          Try Again
        </button>
      </main>
    )
  }

  const popularItems = vendors.flatMap((vendor) =>
    vendor.menu
      .filter((item) => item.popular && item.available)
      .map((item) => ({
        ...item,
        vendorId: vendor.id,
        vendorName: vendor.name,
      }))
  )

  return (
    <main className="container">
      <section>
        <h2 className="section-title">
          Welcome to CampusEats! 💗
        </h2>

        <p className="muted">
          Discover delicious food around campus.
        </p>
      </section>

      {/* OUR VENDORS FIRST */}
      <section>
        <h2 className="section-title">
          Our Vendors
        </h2>

        {vendors.length === 0 ? (
          <p>No vendors available.</p>
        ) : (
          <div className="grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
              />
            ))}
          </div>
        )}
      </section>

      {/* POPULAR ITEMS SECOND */}
      <section>
        <h2 className="section-title">
          Popular Menu Items
        </h2>

        <p className="muted">
          Student favourites you should try! ✨
        </p>

        {popularItems.length === 0 ? (
          <p>No popular items available.</p>
        ) : (
          <div className="grid">
            {popularItems.map((item) => (
              <MenuItemCard
                key={`${item.vendorId}-${item.id}`}
                item={item}
                vendorId={item.vendorId}
                vendorName={item.vendorName}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default HomePage
