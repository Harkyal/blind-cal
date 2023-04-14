import React, { useState } from "react";
import "./App.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ1Wy1d11ZILGdcrDP7bMlWIBKJ4n0FaU",
  authDomain: "blind-cal.firebaseapp.com",
  projectId: "blind-cal",
  storageBucket: "blind-cal.appspot.com",
  messagingSenderId: "571930059386",
  appId: "1:571930059386:web:091c5d7d50435f900c91c3",
  measurementId: "G-72ECM8NYQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
  const [data, setData] = useState([
    { length: "", width: "", output: "" },
    { length: "", width: "", output: "" },
    { length: "", width: "", output: "" },
    { length: "", width: "", output: "" },
    { length: "", width: "", output: "" },
    { length: "", width: "", output: "" },
    { length: "", width: "", output: "" },
    { length: "", width: "", output: "" },
    { length: "", width: "", output: "" },
    { length: "", width: "", output: "" },
  ]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newData = [...data];
    newData[index][name] = value;
    newData[index].output = Math.max(
      parseFloat(newData[index].length) *
      parseFloat(newData[index].width) /
      144,
      11
    ).toFixed(2);
    setData(newData);
  };

  const handleAdd = () => {
    setData([
      ...data,
      { length: "", width: "", output: "" },
    ]);
  };

  const totalOutput = () => {
    let sum = 0;
    data.forEach((item) => {
      sum += parseFloat(item.output) || 0;
    });
    return sum.toFixed(2);
  };

  return (
    <div className="App">
      <h1>Coiffer Divine Estimate Tool</h1>
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Width (in inches)</th>
            <th>Height (in inches)</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                {index}
              </td>
              <td>
                <input
                  type="number"
                  name="length"
                  value={item.length}
                  onChange={(event) => handleChange(event, index)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="width"
                  value={item.width}
                  onChange={(event) => handleChange(event, index)}
                />
              </td>
              <td>{item.output}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total Output:</td>
            <td>{totalOutput()} SQfeet</td>
          </tr>
        </tfoot>
      </table>
      <button onClick={handleAdd}>Add Row</button>
    </div>
  );
}

export default App;
