import React, { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { Product } from '../../types/product';

interface ProductTableProps {
  products: Product[];
}

type SortField = 'name' | 'company' | 'pricing';
type SortDirection = 'asc' | 'desc';

export default function ProductTable({ products }: ProductTableProps): ReactNode {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIDE, setFilterIDE] = useState<string>('all');
  const [filterPricing, setFilterPricing] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Get all unique IDEs from products
  const allIDEs = useMemo(() => {
    const ideSet = new Set<string>();
    products.forEach(product => {
      if (product.supportedIDEs && Array.isArray(product.supportedIDEs)) {
        product.supportedIDEs.forEach(ide => ideSet.add(ide));
      }
    });
    return Array.from(ideSet).sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.company.toLowerCase().includes(searchTerm.toLowerCase());

      // IDE filter
      const matchesIDE = 
        filterIDE === 'all' || 
        (product.supportedIDEs && product.supportedIDEs.some(ide => ide === filterIDE));

      // Pricing filter
      const matchesPricing = 
        filterPricing === 'all' || 
        product.pricing === filterPricing;

      return matchesSearch && matchesIDE && matchesPricing;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [products, searchTerm, filterIDE, filterPricing, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return ' ↕';
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className={styles.productTableContainer}>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="ideFilter">IDE:</label>
          <select
            id="ideFilter"
            value={filterIDE}
            onChange={(e) => setFilterIDE(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All IDEs</option>
            {allIDEs.map(ide => (
              <option key={ide} value={ide}>{ide}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="pricingFilter">Pricing:</label>
          <select
            id="pricingFilter"
            value={filterPricing}
            onChange={(e) => setFilterPricing(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All</option>
            <option value="Free">Free</option>
            <option value="Freemium">Freemium</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>

      <div className={styles.resultsInfo}>
        Showing {filteredAndSortedProducts.length} of {products.length} products
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className={styles.sortable}>
                Name{getSortIndicator('name')}
              </th>
              <th onClick={() => handleSort('company')} className={styles.sortable}>
                Company{getSortIndicator('company')}
              </th>
              <th>Description</th>
              <th onClick={() => handleSort('pricing')} className={styles.sortable}>
                Pricing{getSortIndicator('pricing')}
              </th>
              <th>Supported IDEs</th>
              <th>Languages</th>
              <th>Features</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProducts.map(product => (
              <tr key={product.id}>
                <td className={styles.productName}>
                  <Link to={`/products/${product.slug}`} className={styles.productNameLink}>
                    {product.name}
                  </Link>
                </td>
                <td>{product.company}</td>
                <td className={styles.description}>{product.description}</td>
                <td>
                  <span className={`${styles.badge} ${styles[`badge${product.pricing}`]}`}>
                    {product.pricing}
                  </span>
                </td>
                <td>
                  <div className={styles.tags}>
                    {product.supportedIDEs.length > 0 ? (
                      product.supportedIDEs.map(ide => (
                        <span key={ide} className={styles.tag}>{ide}</span>
                      ))
                    ) : (
                      <span className={styles.tagNone}>None</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className={styles.tags}>
                    {product.language.slice(0, 3).map(lang => (
                      <span key={lang} className={styles.tag}>{lang}</span>
                    ))}
                    {product.language.length > 3 && (
                      <span className={styles.tag}>+{product.language.length - 3}</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className={styles.tags}>
                    {product.features.slice(0, 2).map(feature => (
                      <span key={feature} className={styles.tag}>{feature}</span>
                    ))}
                    {product.features.length > 2 && (
                      <span className={styles.tag}>+{product.features.length - 2}</span>
                    )}
                  </div>
                </td>
                <td>
                  <a href={product.website} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>
                    Visit →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className={styles.noResults}>
          No products found matching your filters.
        </div>
      )}
    </div>
  );
}
