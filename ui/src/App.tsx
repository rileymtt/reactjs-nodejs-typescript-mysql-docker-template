import React from "react";
import "./App.css";

type User = {
  id: number;
  username: string;
  email: string;
  age: number;
};

function App() {
  const [data, setData] = React.useState<User[]>([]);

  const getData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}`).then((res) =>
      res.json().then((json) => setData(json))
    );
  };

  const addUser = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", body: JSON.stringify({}) },
    }).then((res) => res.json().then(() => getData()));
  };

  const removeUser = (id: number) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", body: JSON.stringify({}) },
    }).then((res) => res.json().then(() => getData()));
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="App"
      style={{
        padding: 24,
      }}
    >
      <button onClick={addUser}>Generate user</button>
      <br />
      <br />
      <table>
        <tr>
          <th></th>
          <th>Username</th>
          <th>Email</th>
          <th>Age</th>
          <th></th>
        </tr>
        {data.map((user, index) => (
          <tr key={index}>
            <td>#{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>
              <button onClick={() => removeUser(user.id)}>Remove</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
