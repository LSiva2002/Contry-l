import { useEffect, useState } from "react";

import "../style/Home.css"

const Home = () => {

  /* ---------- STATES ---------- */
  const [open, setOpen] = useState(false);
  const [contry, setContry] = useState([]);
  const [editId, setEditId] = useState(null);

  const [contryName, setContryName] = useState("");
  const [code, setCode] = useState("");
  const [currency, setCurrency] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("");
  const [active, setActive] = useState(true);
  const [validation, setValidation] = useState(false);

  const [search, setSearch] = useState("");

  /* ---------- FETCH LIST ---------- */
  useEffect(() => {
    fetch("http://localhost:3000/contry_list")
      .then(res => res.json())
      .then(res => setContry(res))
      .catch(err => console.log(err.message));
  }, []);

  /* ---------- FILTER ---------- */
  const filteredCountries = contry.filter(item =>
    item.contryName?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------- RESET FORM ---------- */
  const resetForm = () => {
    setContryName("");
    setCode("");
    setCurrency("");
    setPhonePrefix("");
    setActive(true);
    setEditId(null);
    setValidation(false);
  };

  /* ---------- ADD / UPDATE ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (contryName.trim().length === 0) {
      setValidation(true);
      return;
    }

    const contryy = {
      contryName,
      code,
      currency,
      phonePrefix,
      active
    };

    /* ---------- EDIT ---------- */
    if (editId !== null) {
      fetch(`http://localhost:3000/contry_list/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contryy)
      })
        .then(res => res.json())
        .then(updated => {
          setContry(contry.map(item =>
            item.id === editId ? updated : item
          ));
          setOpen(false);
          resetForm();
        })
        .catch(err => console.log(err.message));
    }

    /* ---------- ADD ---------- */
    else {
      fetch("http://localhost:3000/contry_list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(data => {
          setContry([...contry, data]);
          setOpen(false);
          resetForm();
        })
        .catch(err => console.log(err.message));
    }
  };

  /* ---------- EDIT CLICK ---------- */
  const handleEdit = (item) => {
    setOpen(true);
    setEditId(item.id);
    setContryName(item.contryName);
    setCode(item.code);
    setCurrency(item.currency);
    setPhonePrefix(item.phonePrefix);
    setActive(item.active);
  };

  /* ---------- DELETE ---------- */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:3000/contry_list/${id}`, {
        method: "DELETE"
      }).then(() => {
        setContry(contry.filter(item => item.id !== id));
      });
    }
  };

  return (
    <>
      <div id="gg">
        <h2 className="dd">Country List</h2>

        <div className="top-actions">
          <button onClick={() => { setOpen(true); resetForm(); }}>
            + Add Country
          </button>

          <input
            type="text"
            placeholder="Search by country name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>


        {open && (
          <>
            <div className="overlay" onClick={() => setOpen(false)}></div>

            <form onSubmit={handleSubmit} className="popup-form">
              <h3>{editId ? "Edit Country" : "Add Country"}</h3>

              <label>Country Name</label>
              <input
                type="text"
                value={contryName}
                onMouseDown={() => setValidation(true)}
                onChange={e => setContryName(e.target.value)}
              />
              {contryName.length === 0 && validation && (
                <span className="error">Enter the Name</span>
              )}

              <label>Code</label>
              <input value={code} onChange={e => setCode(e.target.value)} />

              <label>Currency</label>
              <input value={currency} onChange={e => setCurrency(e.target.value)} />

              <label>Phone Prefix</label>
              <input
                value={phonePrefix}
                onChange={e => setPhonePrefix(e.target.value)}
              />


              <div className="toggle-container">
                <span>Status</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={e => setActive(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="form-actions">
                <button type="submit">
                  {editId ? "Update" : "Add"}
                </button>
                <button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}


        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Code</th>
              <th>Currency</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCountries.length > 0 ? (
              filteredCountries.map(item => (
                <tr key={item.id}>
                  <td>{item.contryName}</td>
                  <td>{item.code}</td>
                  <td>{item.currency}</td>
                  <td>{item.phonePrefix}</td>
                  <td>
                    <span className={item.active ? "badge active" : "badge inactive"}>
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No country found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default Home;
