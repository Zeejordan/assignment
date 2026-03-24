export function ProductFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedRating,
  onSelectRating,
  priceBounds,
  priceLimit,
  onChangePriceLimit,
  onReset
}) {
  return (
    <aside className="panel filters-panel">
      <p className="eyebrow">Filters</p>
      <h2 className="panel-heading">Refine the catalog</h2>
      <p className="panel-copy">
        Combine category, minimum rating, and maximum price for a practical assignment-ready
        product explorer.
      </p>

      <div className="filter-group">
        <strong>Category</strong>
        <div className="choice-chips">
          <button
            type="button"
            className={`choice-chip ${selectedCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => onSelectCategory('all')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`choice-chip ${selectedCategory === category ? 'is-active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <strong>Price range</strong>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step="1"
          value={priceLimit}
          onChange={(event) => onChangePriceLimit(Number(event.target.value))}
        />
        <div className="range-labels">
          <span>${priceBounds.min}</span>
          <strong>Up to ${priceLimit}</strong>
        </div>
      </div>

      <div className="filter-group">
        <strong>Minimum rating</strong>
        <div className="choice-chips">
          {[0, 1, 2, 3, 4].map((rating) => (
            <button
              key={rating}
              type="button"
              className={`choice-chip ${selectedRating === rating ? 'is-active' : ''}`}
              onClick={() => onSelectRating(rating)}
            >
              {rating === 0 ? 'All ratings' : `${rating}+ stars`}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <button type="button" className="secondary-button" onClick={onReset}>
          Reset all filters
        </button>
      </div>
    </aside>
  );
}
