
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import MenuItemCard from '../components/MenuItemCard.jsx'
import useVendors from '../hooks/useVendors.js'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error } = useVendors()

  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  if (loading) {
    return (
      <main className="container">
        <p>Loading vendor...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container">
        <p role="alert">Unable to load vendor: {error}</p>
      </main>
    )
  }

  const vendor = vendors.find((item) => item.id === id)

  if (!vendor) {
    return (
      <main className="container">
        <h2>Vendor not found</h2>
      </main>
    )
  }

  const dietaryTags = [
    ...new Set(
      vendor.menu.flatMap((item) => item.dietaryTags || [])
    ),
  ]

  const categories = [
    ...new Set(
      vendor.menu.map((item) => item.category).filter(Boolean)
    ),
  ]

  function handleTagChange(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [...prev, tag]
    )
  }

  const filteredMenu = vendor.menu.filter((item) => {
    const itemTags = (item.dietaryTags || []).map((tag) =>
      tag.trim().toLowerCase()
    )

    const matchesTags = selectedTags.every((tag) =>
      itemTags.includes(tag.trim().toLowerCase())
    )

    const matchesCategory =
      selectedCategory === 'All' ||
      (item.category || '').trim().toLowerCase() ===
        selectedCategory.trim().toLowerCase()

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())

    return matchesTags && matchesCategory && matchesSearch
  })

  function clearFilters() {
    setSelectedTags([])
    setSelectedCategory('All')
    setSearchTerm('')
  }

  return (
    <main className="container">
      <section>
        <h2 className="section-title">{vendor.name}</h2>

        <p className="muted">{vendor.location}</p>

        <p className="muted">Open: {vendor.openHours}</p>

        <h3>Search Menu</h3>

        <input
          type="text"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <h3>Categories</h3>

        <div className="filter-options">
          <button
            type="button"
            className="btn"
            aria-pressed={selectedCategory === 'All'}
            onClick={() => setSelectedCategory('All')}
          >
            All Categories
          </button>

          {categories.map((category) => (
            <button
              type="button"
              className="btn"
              key={category}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <h3>Dietary Preferences</h3>

        <div className="filter-options">
          {dietaryTags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              {tag}
            </label>
          ))}
        </div>

        <button
          type="button"
          className="btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

        <h3>Menu ({filteredMenu.length} items)</h3>

        {filteredMenu.length === 0 ? (
          <p>No menu items match your search or filters.</p>
        ) : (
          <div className="grid">
            {filteredMenu.map((item) => (
              <MenuItemCard
                key={`${vendor.id}-${item.id}`}
                item={item}
                vendorId={vendor.id}
                vendorName={vendor.name}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default VendorPage
