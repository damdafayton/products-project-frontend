import { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Link } from 'react-router-dom';

import apiRoutes from '../apiRoutes';
import { utils } from '../helpers';

export default function Products({ setAlert }) {
  const [products, setProducts] = useState(undefined);
  const [productsToBeDeleted, setProductsToBeDeleted] = useState([]);

  const getProducts = () =>
    fetch(apiRoutes.PRODUCTS)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.length > 0) {
          setProducts(res);
        }
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
      });
  };

  return (
    <>
      <header className="d-flex justify-content-between flex-column flex-sm-row border-2 border-bottom border-light py-2">
        <h2 className="text-dark text-center text-sm-start w-100 my-1 flex-grow-0">
          PRODUCT LIST
        </h2>
        <div className="d-flex gap-2 w-100 justify-content-end py-2">
          <Link to="/new_product">
            <Button
              className="h-100"
              sx={{
                color: 'red',
              }}
            >
              ADD
            </Button>
          </Link>
          <Button onClick={handleDeleteButton}>MASS DELETE</Button>
        </div>
      </header>
      <main className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-2 gx-2 py-2">
        {products ? (
          products.map((data) => (
            <div className="px-1 py-1" key={data.product.product_id}>
              <div className="card bg-light border border-2 position-relative h-100 py-2 shadow-sm d-flex justify-content-between">
                <button
                  type="button"
                  className="delete-checkbox btn-clean position-absolute text-primary"
                  onClick={() => handleProductDeleteBox(data.product)}
                >
                  {productsToBeDeleted.includes(data.product.product_id) ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </button>
                <div>
                  <p className="text-info">{data.product.sku}</p>
                  <p className="fs-6 mb-0 fw-bold">{data.product.name}</p>
                  <ul>
                    {data.productSpecialFields &&
                      Object.keys(data.productSpecialFields).map((field) => (
                        <div key={field}>
                          <span className="text-secondary">
                            {utils.capitalizeInitial(field)}:{' '}
                          </span>
                          {/* {data.productSpecialFields[field] && (
                          <> */}
                          <span className="text-secondary">
                            {data.productSpecialFields[field]}
                          </span>
                        </div>
                      ))}
                  </ul>
                </div>
                <p className="text-end pe-2 text-primary fw-bold">
                  ${data.product.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-3 w-100">
            Data for this app is served from free Heroku servers and loading can
            take 20 to 40 seconds. Please wait..
          </div>
        )}
      </main>
    </>
  );
}
