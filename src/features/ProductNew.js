import { useState, useEffect } from 'react';

import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import apiRoutes from '../apiRoutes';
import { utils } from '../helpers/utils';

export default function ProductNew({ setAlert }) {
  const [commonFields, setCommonFields] = useState(undefined);
  const [categoryList, setCategoryList] = useState(undefined);
  const [category, setCategory] = useState('');
  const [categoryFields, setCategoryFields] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiRoutes.PRODUCT_FIELDS_QUERY())
      .then((res) => res.json())
      .then((res) => {
        const { commonFields, categoryList } = res;
        // console.log(commonFields);
        // eslint-disable-next-line no-underscore-dangle
        const _commonFields = commonFields.map((_word) => {
          const word = utils.capitalizeAcronyms(_word);
          return utils.capitalizeInitial(word);
        });
        setCommonFields(_commonFields);

        setCategoryList(categoryList);
      });
  }, []);

  useEffect(() => {
    if (category) {
      fetch(apiRoutes.PRODUCT_FIELDS_QUERY(category))
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          const { categoryFields } = res;
          // eslint-disable-next-line no-underscore-dangle
          const _categoryFields = categoryFields.map((fieldGroup) => [
            utils.capitalizeInitial(fieldGroup[0]),
            fieldGroup[1].toUpperCase(),
          ]);
          setCategoryFields(_categoryFields);
        });
    }
  }, [category]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const body = {};
    Array.from(form.elements).forEach((element) => {
      if (element.value && element.id) body[element.id] = element.value;
    });
    body.category = category;
    console.log(body);

    fetch(apiRoutes.PRODUCTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setAlert({ status: 'error', message: res.error });
        } else if (res.product_id) {
          setAlert({
            status: 'success',
            message: `Product with id: ${res.product_id} is created.`,
          });
          navigate('/');
          // console.log(res);
        }
      });
  };

  const handleCategoryChange = (e) => {
    console.log(e.target);
    setCategory(e.target && e.target.value);
  };

  return (
    <>
      <form id="#product_form" onSubmit={formSubmitHandler}>
        <header className="d-flex justify-content-between border-2 border-bottom border-dark py-2">
          <h2 className="text-dark">PRODUCT ADD</h2>
          <div className="d-flex gap-2">
            <Button variant="outlined" type="submit">
              {/* <Link to="/new_product">Add</Link> */}
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </header>
        <main>
          <div className="d-flex flex-column col-md-6 col-lg-4 py-2">
            {commonFields &&
              commonFields.map((field) => (
                <TextField
                  key={field}
                  id={field.toLowerCase()}
                  label={field}
                  variant="filled"
                  className="mb-2"
                />
              ))}
            {categoryList && (
              <FormControl variant="filled" id="productType" className="mb-2">
                <InputLabel id="category-label">Type Switcher</InputLabel>
                <Select
                  className="text-dark"
                  labelId="category-label"
                  id="category"
                  value={category}
                  // label="TypeSwitcher"
                  onChange={handleCategoryChange}
                >
                  {categoryList.map((category) => (
                    <MenuItem key={category} name="category2" value={category}>
                      {utils.tableNameToModelName(category)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {categoryFields && (
              <div id={utils.tableNameToModelName(category)}>
                {categoryFields.map((fieldGroup) => (
                  <TextField
                    key={fieldGroup[0]}
                    id={fieldGroup[0].toLowerCase()}
                    label={`${fieldGroup[0]} (${fieldGroup[1]})`}
                    variant="filled"
                    className="mb-2 w-100"
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </form>
    </>
  );
}
