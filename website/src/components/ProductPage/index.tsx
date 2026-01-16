import React from 'react';
import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { Product } from '@site/src/types/product';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps): ReactNode {
  
  if (!product) {
    return (
      <Layout title="Product Not Found">
        <main className={styles.productPage}>
          <div className="container">
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/">← Back to Products</Link>
          </div>
        </main>
      </Layout>
    );
  }
  
  return (
    <Layout
      title={product.name}
      description={product.description}>
      <main className={styles.productPage}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link to="/">← Back to Products</Link>
          </div>
          
          <div className={styles.header}>
            <h1>{product.name}</h1>
            <p className={styles.company}>by {product.company}</p>
          </div>
          
          <div className={styles.metadata}>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Pricing:</span>
              <span className={`${styles.badge} ${styles[`badge${product.pricing}`]}`}>
                {product.pricing}
              </span>
            </div>
            
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Website:</span>
              <a href={product.website} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>
                {product.website}
              </a>
            </div>
            
            {product.lastModified && (
              <div className={styles.metadataItem}>
                <span className={styles.metadataLabel}>Last Modified:</span>
                <span className={styles.lastModified}>
                  {new Date(product.lastModified).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            )}
          </div>
          
          <div className={styles.section}>
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
          
          {product.supportedIDEs && product.supportedIDEs.length > 0 && (
            <div className={styles.section}>
              <h2>Supported IDEs</h2>
              <div className={styles.tags}>
                {product.supportedIDEs.map(ide => (
                  <span key={ide} className={styles.tag}>{ide}</span>
                ))}
              </div>
            </div>
          )}
          
          {product.language && product.language.length > 0 && (
            <div className={styles.section}>
              <h2>Supported Languages</h2>
              <div className={styles.tags}>
                {product.language.map(lang => (
                  <span key={lang} className={styles.tag}>{lang}</span>
                ))}
              </div>
            </div>
          )}
          
          {product.features && product.features.length > 0 && (
            <div className={styles.section}>
              <h2>Key Features</h2>
              <div className={styles.tags}>
                {product.features.map(feature => (
                  <span key={feature} className={styles.tag}>{feature}</span>
                ))}
              </div>
            </div>
          )}
          
          {product.content && (
            <div className={styles.section}>
              <div className={styles.content}>
                <ReactMarkdown>{product.content}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
