import React from 'react';
import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { Product } from '@site/src/types/product';
import styles from './styles.module.css';

export default function ProductPage(props): ReactNode {
  const product: Product = props.product;
  
  if (!product) {
    return (
      <Layout title="Product Not Found">
        <main className={styles.productPage}>
          <div className="container">
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/products">← Back to Products</Link>
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
            <Link to="/products">← Back to Products</Link>
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
                {/* Convert markdown headers and lists to basic HTML */}
                {product.content.split('\n').map((line, idx) => {
                  // Headers
                  if (line.startsWith('## ')) {
                    return <h2 key={idx}>{line.substring(3)}</h2>;
                  } else if (line.startsWith('# ')) {
                    return <h1 key={idx}>{line.substring(2)}</h1>;
                  } 
                  // List items
                  else if (line.startsWith('- ')) {
                    return <li key={idx}>{line.substring(2)}</li>;
                  }
                  // Bold text (simple pattern)
                  else if (line.includes('**')) {
                    const parts = line.split('**');
                    return (
                      <p key={idx}>
                        {parts.map((part, i) => 
                          i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                        )}
                      </p>
                    );
                  }
                  // Regular paragraph
                  else if (line.trim()) {
                    return <p key={idx}>{line}</p>;
                  }
                  // Empty line
                  return <br key={idx} />;
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
