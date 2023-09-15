import { useState } from "react";

export default function App() {
  return (
    <div className="app">
      <Logo />
      <PaymentList />
      <Total />
      <Form />
    </div>
  );
}

function Button({ children }) {
  return <button>{children}</button>;
}

function Logo() {
  return <h1 className="logo">✏️ Record Payment App</h1>;
}

function PaymentList() {
  return (
    <div className="list">
      <div className="detail">
        <h2>Item</h2>
        <h2>Price</h2>
        <h2>Quantity</h2>
        <h2>Total</h2>
      </div>
      <ul>
        <Payment />
      </ul>
      <div className="sort-clear">
        <select>
          <option>Sort by input order</option>
          <option>Sort by description</option>
          <option>Sort by total</option>
        </select>
        <Button>Clear</Button>
      </div>
    </div>
  );
}

function Payment() {
  return (
    <li>
      <p>Food</p>
      <p>฿23</p>
      <p>2</p>
      <p>฿46</p>
      <p className="date">15/09/2023</p>
      <Button>Edit</Button>
      <Button>Del</Button>
    </li>
  );
}

function Total() {
  return (
    <div className="total">
      <h3>
        Total Payment: <span>dhhh</span>
      </h3>
      <h3>
        Total Item: <span>dhhh</span>
      </h3>
    </div>
  );
}

function Form() {
  return (
    <form className="form">
      <label>🛒 Detail Item</label>
      <input type="text" placeholder="ex. labtop" />

      <label>💰 Price</label>
      <input type="number" />

      <label>👀 Quantity</label>
      <input type="number" />

      <label>⏰ Date</label>
      <input type="date" />

      <Button>Add</Button>
    </form>
  );
}
