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
        if (file.endsWith('.md')) {
          const filePath = path.join(productsDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data, content } = matter(fileContent);
          
          products.push({
            ...data,
            content,
            slug: file.replace('.md', '')
          });
        }
      }
      
      return products;
    },
    
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData({ products: content });
    }
  };
};
