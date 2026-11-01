
import VendorCard from '../components/VendorCard.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import useVendors from '../hooks/useVendors.js'

function HomePage() {
  const { vendors, loading, error } = useVendors()

  return (
    <main className="container">
      <section id="vendors">
        <h2 className="section-title">Today's vendors</h2>

        {loading && <p>Loading vendors...</p>}

        {error && (
          <p role="alert">
            Unable to load vendors: {error}
          </p>
        )}

        {!loading && !error && vendors.length === 0 && (
          <p>No vendors available right now.</p>
        )}

        {!loading && !error && (
          vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))
        )}
      </section>

      <section id="popular-items">
        <h2 className="section-title">Popular items</h2>

        {!loading && !error && (
          <div className="grid">
            {vendors.flatMap((vendor) =>
              vendor.menu.map((item) => (
                <MenuItemCard
                  key={`${vendor.id}-${item.id}`}
                  item={item}
                />
              ))
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default HomePage
