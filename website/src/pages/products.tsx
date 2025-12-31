import React from 'react';
import Layout from '@theme/Layout';
import ProductTable from '@site/src/components/ProductTable';
import { products } from '@site/src/data/products';
import styles from './products.module.css';

export default function Products(): JSX.Element {
  return (
    <Layout
      title="AI Code Generation Products"
      description="A comprehensive list of AI code generation tools and products with filtering and sorting capabilities">
      <main className={styles.productsPage}>
        <div className="container">
          <div className={styles.header}>
            <h1>AI Code Generation Products</h1>
            <p className={styles.subtitle}>
              Explore and compare AI-powered code generation tools. Filter by IDE support, pricing, and more.
            </p>
          </div>
          <ProductTable products={products} />
        </div>
      </main>
    </Layout>
  );
}
