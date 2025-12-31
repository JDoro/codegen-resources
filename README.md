# AI Code Generation Resources

A comprehensive wiki for research and resources on AI code generation tools and products.

## Features

- **Filterable Product Database**: Browse and compare 10+ AI code generation tools
- **Advanced Filtering**: Filter by IDE support, pricing model, and extension availability
- **Sorting**: Sort products by name, company, pricing, or IDE extension
- **Research & Documentation**: Curated resources about AI code generation

## Quick Start

### Development

```bash
cd website
npm install
npm start
```

This will start a local development server at `http://localhost:3000/codegen-resources/`.

### Build

```bash
cd website
npm run build
```

This will generate static files in the `website/build` directory.

### Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

## Structure

```
codegen-resources/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment workflow
└── website/                     # Docusaurus website
    ├── docs/                    # Documentation markdown files
    ├── src/
    │   ├── components/
    │   │   ├── HomepageFeatures/
    │   │   └── ProductTable/    # Filterable table component
    │   ├── data/
    │   │   └── products.ts      # Product database
    │   └── pages/
    │       ├── index.tsx        # Homepage
    │       └── products.tsx     # Products page
    ├── static/                  # Static assets
    └── docusaurus.config.ts     # Site configuration
```

## Product Database

The product database in `website/src/data/products.ts` contains information about AI code generation tools including:

- Name and description
- Website URL
- IDE extension availability
- Supported IDEs
- Pricing model (Free, Freemium, Paid)
- Supported programming languages
- Key features
- Company/organization

## Contributing

To add a new product to the database:

1. Edit `website/src/data/products.ts`
2. Add a new product object following the existing structure
3. Submit a pull request

## Built With

- [Docusaurus](https://docusaurus.io/) - Documentation framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

MIT