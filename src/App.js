import { useState } from "react";
import moneyImage from "./money.png";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  const [items, setItems] = useState([
    {
      detail: "Food",
      price: 40,
      quantity: 1,
      total: 40,
      date: "2023-09-17",
      id: 1,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  function handleAddItem(item) {
    setItems((items) => [item, ...items]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearItems() {
    if (!items.length) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  function handleIsOpen() {
    setIsOpen((is) => !is);
  }

  return (
    <div className="app">
      <Logo />
      <PaymentList
        items={items}
        onDeleteItem={handleDeleteItem}
        onClearItems={handleClearItems}
      />
      <Total items={items} />
      {isOpen && <Form onAddItem={handleAddItem} onIsOpen={handleIsOpen} />}
      <Button onClick={handleIsOpen}>{isOpen ? "Close" : "Add item"}</Button>
    </div>
  );
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function Logo() {
  return (
    <h1 className="logo">
      <img src={moneyImage} alt="money" /> Record Payment App
    </h1>
  );
}

function PaymentList({ items, onSelectItem, onDeleteItem, onClearItems }) {
  const [sort, setSort] = useState("input");
  let sortedItems;

  if (sort === "input") sortedItems = items;

  if (sort === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.detail.localeCompare(b.detail));

  if (sort === "total")
    sortedItems = items.slice().sort((a, b) => a.total - b.total);

  if (sort === "date")
    sortedItems = items
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="list">
      <div className="detail">
        <h2>Item</h2>
        <h2>Price</h2>
        <h2>Quantity</h2>
        <h2>Total</h2>
      </div>

      <ul>
        {sortedItems.map((item) => (
          <Payment
            detail={item.detail}
            price={item.price}
            quantity={item.quantity}
            total={item.total}
            date={item.date}
            id={item.id}
            key={item.id}
            onSelectItem={onSelectItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>

      <div className="sort-clear">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="total">Sort by total</option>
          <option value="date">Sort by date</option>
        </select>
        <Button onClick={() => onClearItems()}>Clear</Button>
      </div>
    </div>
  );
}

function Payment({ detail, price, quantity, total, date, id, onDeleteItem }) {
  if (price >= 1000) price = price / 1000 + "K";
  if (total >= 1000) total = total / 1000 + "K";

  return (
    <li>
      <p>{detail}</p>
      <p>฿{price}</p>
      <p>{quantity}</p>
      <p>฿{total}</p>
      <p>{date.split("-").reverse().join("-")}</p>
      <Button onClick={() => onDeleteItem(id)}>Del</Button>
    </li>
  );
}

function Total({ items }) {
  const totalPayment = items
    .reduce((acc, cur) => acc + cur.price, 0)
    .toLocaleString("en-US");

  return (
    <div className="total">
      <h3>
        Total Payment: <span>฿{totalPayment}</span>
      </h3>
      <h3>
        Total Item List: <span>{items.length}</span>
      </h3>
    </div>
  );
}

function Form({ onAddItem, onIsOpen }) {
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!detail || !date) return;

    const newItem = {
      detail,
      price,
      quantity,
      total: price * quantity,
      date: date,
      id: crypto.randomUUID(),
    };

    onAddItem(newItem);

    onIsOpen();

    setDetail("");
    setPrice(1);
    setQuantity(1);
    setDate("");
  }

  return (
    <form className="form-list" onSubmit={handleSubmit}>
      <label>
        <i className="bi bi-cart4"></i> <span>Detail Item</span>
      </label>
      <input
        type="text"
        placeholder="Ex. Laptop"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />

      <label>
        <i className="bi bi-cash-coin"></i> <span>Price</span>
      </label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <label>
        <i className="bi bi-bar-chart-fill"></i> <span>Quantity</span>
      </label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <label>
        <i className="bi bi-calendar-week"></i> <span>Date</span>
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}
