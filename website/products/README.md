# Products

This directory contains markdown files for each AI code generation product displayed in the wiki.

## Adding a New Product

To add a new product, create a new markdown file in this directory with the following frontmatter structure:

```markdown
---
id: product-slug
name: Product Name
company: Company Name
description: Brief description of the product
website: https://product-website.com
hasIDEExtension: true/false
supportedIDEs:
  - IDE 1
  - IDE 2
pricing: Free/Freemium/Paid
language:
  - Language 1
  - Language 2
features:
  - Feature 1
  - Feature 2
---

# Product Name

Add detailed content about the product here. This content will be used for individual product pages in the future.

## Key Features

- Feature descriptions

## Pricing

Pricing details
```

## Frontmatter Fields

- **id**: Unique identifier (use kebab-case)
- **name**: Display name of the product
- **company**: Company or organization name
- **description**: Short description (1-2 sentences)
- **website**: Official product website URL
- **hasIDEExtension**: Boolean - whether the product has IDE extensions
- **supportedIDEs**: Array of supported IDEs
- **pricing**: One of: `Free`, `Freemium`, or `Paid`
- **language**: Array of supported programming languages
- **features**: Array of key features

## Example

See any existing `.md` file in this directory for a complete example.

## Notes

- The products are automatically loaded by the Docusaurus plugin
- All products appear in the filterable table on the Products page
- Keep descriptions concise for table display
- Use consistent IDE names across all products
