import { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Link } from 'react-router-dom';

import apiRoutes from '../apiRoutes';
import { utils, product } from '../helpers';

export default function Products({ setAlert }) {
  const [products, setProducts] = useState(undefined);
  const [productsWithoutCommonFields, setProductsWithoutCommonFields] =
    useState(undefined);
  const [productsToBeDeleted, setProductsToBeDeleted] = useState([]);

  const getProducts = () =>
    fetch(apiRoutes.PRODUCTS)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setProducts(res);
        // eslint-disable-next-line no-underscore-dangle
        const _productsWithoutCommonFields = res.map((_product) =>
          product.removeCommonFields(_product)
        );
        setProductsWithoutCommonFields(_productsWithoutCommonFields);
      });

  useEffect(() => {
    getProducts();
  }, []);

  const handleProductDeleteBox = (product) => {
    const id = product.product_id;
    if (productsToBeDeleted.includes(id)) {
      setProductsToBeDeleted([
        ...productsToBeDeleted.filter((pId) => pId !== id),
      ]);
    } else {
      setProductsToBeDeleted([...productsToBeDeleted, id]);
    }
  };

  const handleDeleteButton = () => {
    const body = JSON.stringify({ list: JSON.stringify(productsToBeDeleted) });
    // console.log(productsToBeDeleted, body);
    fetch(apiRoutes.MASS_DELETE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((res) => res.json())
      .then((res) => {
        const affectedRows = res && res.affected_rows;
        if (affectedRows > 0) {
          setAlert({ status: 'success', message: 'Items deleted.' });
          getProducts();
        } else {
          setAlert({ status: 'error', message: "Items haven't deleted." });
        }
        // console.log(res);
      });
  };

  return (
    <>
      <header className="d-flex justify-content-between flex-column flex-sm-row border-2 border-bottom border-dark py-2">
        <h2 className="text-dark text-center text-sm-start w-100 mb-2 flex-grow-0">
          PRODUCT LIST
        </h2>
        <div className="d-flex gap-2 w-100 justify-content-end">
          <Link to="/new_product">
            <Button variant="outlined" className="h-100">
              Add
            </Button>
          </Link>
          <Button onClick={handleDeleteButton} variant="outlined">
            Mass Delete
          </Button>
        </div>
      </header>
      <main className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-2 gx-2 py-2">
        {products &&
          products.map((product, idx) => (
            <div className="px-1 py-1" key={product.product_id}>
              <div className="card border border-2 position-relative h-100 py-2 shadow-sm">
                <button
                  type="button"
                  className="delete-checkbox btn-clean position-absolute"
                  onClick={() => handleProductDeleteBox(product)}
                >
                  {productsToBeDeleted.includes(product.product_id) ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </button>
                <p>{product.sku}</p>
                <p className="fs-6 mb-0">{product.name}</p>
                <p>${product.price}</p>
                <ul>
                  {productsWithoutCommonFields &&
                    Object.keys(productsWithoutCommonFields[idx]).map(
                      (field) => (
                        <div key={field}>
                          <span>{utils.capitalizeInitial(field)}: </span>
                          <span>{productsWithoutCommonFields[idx][field]}</span>
                        </div>
                      )
                    )}
                </ul>
              </div>
            </div>
          ))}
      </main>
    </>
  );
}
