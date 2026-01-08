import React from 'react';
import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { Product } from '@site/src/types/product';
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
                {(() => {
                  const lines = product.content.split('\n');
                  const elements: ReactNode[] = [];
                  let listBuffer: ReactNode[] = [];
                  let listStartIdx = -1;

                  // Helper function to process inline markdown (bold text)
                  const processInlineMarkdown = (text: string, keyPrefix: string): ReactNode => {
                    if (text.includes('**')) {
                      const parts = text.split('**');
                      return (
                        <>
                          {parts.map((part, partIdx) =>
                            partIdx % 2 === 0
                              ? part
                              : <strong key={`${keyPrefix}-strong-${partIdx}-${part.substring(0, 10)}`}>{part}</strong>
                          )}
                        </>
                      );
                    }
                    return text;
                  };

                  lines.forEach((line, idx) => {
                    const trimmed = line.trim();

                    // Handle list items: buffer them to wrap in a <ul>
                    if (line.startsWith('- ')) {
                      if (listBuffer.length === 0) {
                        listStartIdx = idx;
                      }
                      const listContent = line.substring(2);
                      listBuffer.push(
                        <li key={`li-${idx}-${listContent.substring(0, 20)}`}>
                          {processInlineMarkdown(listContent, `li-${idx}`)}
                        </li>
                      );
                      return;
                    }

                    // If we reach a non-list line and have buffered list items, flush them
                    if (listBuffer.length > 0) {
                      elements.push(
                        <ul key={`list-${listStartIdx}`}>{listBuffer}</ul>
                      );
                      listBuffer = [];
                      listStartIdx = -1;
                    }

                    // Headers
                    if (line.startsWith('## ')) {
                      const headerContent = line.substring(3);
                      elements.push(
                        <h2 key={`h2-${idx}-${headerContent.substring(0, 20)}`}>{headerContent}</h2>
                      );
                    } else if (line.startsWith('# ')) {
                      const headerContent = line.substring(2);
                      elements.push(
                        <h1 key={`h1-${idx}-${headerContent.substring(0, 20)}`}>{headerContent}</h1>
                      );
                    }
                    // Regular paragraph (with inline markdown processing)
                    else if (trimmed) {
                      elements.push(
                        <p key={`p-${idx}-${trimmed.substring(0, 20)}`}>
                          {processInlineMarkdown(line, `p-${idx}`)}
                        </p>
                      );
                    }
                    // Empty line
                    else {
                      elements.push(<br key={`br-${idx}`} />);
                    }
                  });

                  // Flush any remaining buffered list items at the end
                  if (listBuffer.length > 0) {
                    elements.push(
                      <ul key={`list-end-${listStartIdx}`}>{listBuffer}</ul>
                    );
                  }

                  return elements;
                })()}
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
