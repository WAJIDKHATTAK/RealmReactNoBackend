import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [dataSet, setDataSet] = useState([]); 
  const getData = async () => {
    try {
      const response = await axios.get("https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-njzzp/endpoint/GetAllRecipes");
      setDataSet(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
 console.log(dataSet);
  return (
    <>
    <h2><center>With EndPoint Request</center></h2>
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
  );
};

export default App;
