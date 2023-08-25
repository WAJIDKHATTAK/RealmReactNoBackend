import React, { useState, useEffect } from 'react'
import * as Realm from "realm-web";

const GetAllRecipes = () => {
    const [dataSet, setDataSet] = useState({});

  const getData = async () => {
    const app = new Realm.App({ id: "application-0-njzzp" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allData = await user.functions.getAllData();
      setDataSet(allData);
    } catch (err) {
      console.error("Failed to log in", err);
    }
  };
  console.log(dataSet);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <nav className="navbar bg-success">
        <div className="container-fluid">
          <form className="d-flex mx-auto " role="search">
            <input
              className="form-control-lg "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row">
          <table className="table table-bordered border-primary">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Ingredients</th>
                <th scope="col">PrepTime</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {Array.isArray(dataSet) &&
                dataSet.map((data, key) => {
                  return (
                    <>
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>
                        <td>{data.name}</td>
                        <td>
                          {Array.isArray(data.ingredients) ? (
                            <ul>
                              {data.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                              ))}
                            </ul>
                          ) : (
                            data.ingredients
                          )}{" "}
                          {/* Render the value directly if not an array */}
                        </td>
                        <td>{data.prepTimeInMinutes}</td>
                      </tr>
                    </>
                  );
                })}
              {/* <tr>
                <th scope="row">2</th>
                <td>Thornton</td>
                <td>@fat</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default GetAllRecipes
