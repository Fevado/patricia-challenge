// app/products/page.js

// 1. This component runs EXCLUSIVELY on the server.
// We can use standard async/await syntax directly inside the component function.
export default async function ProductsPage() {
  
    // 2. Fetch data directly from a public API.
    // Next.js extends the native fetch API to provide automatic caching.
    // 'next: { revalidate: 3600 }' means it will cache this data for 1 hour.
    const response = await fetch('https://escuelajs.co', {
      next: { revalidate: 3600 } 
    });
    
    // 3. Parse the response body as JSON.
    const products = await response.json();
  
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        {/* 
          Standard HTML/JSX commenting works flawlessly outside of the return statement
          using double slashes //, but inside JSX elements, we MUST use curly braces 
          and block comments like this: {/* Comment text *\/} 
        */}
        <h1>Our Products</h1>
        <p>This list was fetched securely on the server.</p>
  
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          {products.map((product) => (
            <div 
              key={product.id} 
              style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}
            >
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              
              {/* 
                4. We pass server data down to a interactive Client Component.
                The ProductRating component handles user clicks browser-side.
              */}
              <ProductRating initialRating={4} />
            </div>
          ))}
        </div>
      </main>
    );
  }