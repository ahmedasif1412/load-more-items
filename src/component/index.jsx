import { useEffect, useState } from "react";
import "./styles.css";

const LoadMoreItems = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [numOfLoads, setNumOfLoads] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  let prevData = [];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          numOfLoads === 0 ? 0 : numOfLoads * 20
        }`
      );
      const data = await res.json();

      if (data && data.products && data.products.length) {
        // console.log(data); // *** Use console.log to get the name of the object of the data
        // setProducts(data.products); // After getting the name of the object of the data, set it with data i.e data.NameOfTheObject which in this case is products. So therefore it would be data.products.

        setProducts([...prevData, ...data.products]); // But since we also need previous data which was loaded therefore we make an array named prevData outside the fetch function to make it a global variable since we are going to update it after every re=render and save the previous data. Therefore we have initialized the prevDta at ln. 10 and updated it at ln. 34
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  prevData = [...products];

  useEffect(() => {
    fetchProducts();
  }, [numOfLoads]);

  useEffect(() => {
    products && products.length === 100 && setDisableButton(true);
  }, [products]);

  if (loading) {
    return (
      <center>
        <h1>Please, Wait the Fuck up!</h1>
      </center>
    );
  }

  return (
    <div className="main-container">
      <div className="product-container">
        {products && products.length
          ? products.map((item) => (
              <div key={item.id} className="product">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="img-container"
                />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <center>
        <button
          disabled={disableButton}
          className="btn-load-container"
          onClick={() => {
            setNumOfLoads(numOfLoads + 1);
          }}
        >
          Load More products
        </button>
        {disableButton && (
          <center>
            <p className="end-message">
              You have reached the end. What the Fuck do you want?
            </p>
          </center>
        )}
      </center>
    </div>
  );
};

export default LoadMoreItems;
