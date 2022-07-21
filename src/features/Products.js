import { useEffect, useState } from 'react';

export default function Products() {
  const [, setProducts] = useState(undefined);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts(res);
      });
  }, []);

  return (
    <section>
      <h2>PRODUCTS</h2>
    </section>
  );
}
