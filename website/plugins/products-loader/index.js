const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function productsLoaderPlugin(context, options) {
  return {
    name: 'products-loader',
    
    async loadContent() {
      const productsDir = path.join(context.siteDir, 'products');
      
      // Check if products directory exists
      if (!fs.existsSync(productsDir)) {
        console.warn('Products directory not found');
        return [];
      }
      
      const files = fs.readdirSync(productsDir);
      const products = [];
      
      for (const file of files) {
        // Skip README and non-markdown files
        if (file === 'README.md' || !file.endsWith('.md')) {
          continue;
        }
        
        const filePath = path.join(productsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        // Validate required fields
        if (!data.id || !data.name || !data.company) {
          console.warn(`Skipping ${file}: missing required fields (id, name, or company)`);
          continue;
        }
        
        // Get file modification time
        const stats = fs.statSync(filePath);
        const lastModified = stats.mtime.toISOString();
        
        products.push({
          ...data,
          content,
          slug: file.replace('.md', ''),
          lastModified
        });
      }
      
      return products;
    },
    
    async contentLoaded({ content, actions }) {
      const { setGlobalData, createData, addRoute } = actions;
      setGlobalData({ products: content });
      
      // Create individual product pages
      for (const product of content) {
        // Validate slug exists before creating route
        if (!product.slug) {
          console.warn(`Skipping route creation for product ${product.id}: missing slug`);
          continue;
        }
        
        const productJsonPath = await createData(
          `product-${product.slug}.json`,
          JSON.stringify(product)
        );
        
        addRoute({
          path: `${context.baseUrl}products/${product.slug}`,
          component: '@site/src/components/ProductPage/index.tsx',
          exact: true,
          modules: {
            product: productJsonPath,
          },
        });
      }
    }
  };
};
