import React from "react";

const AdminPage = () => {
  return (
    <section className="admin-page">
      <h2>Add new product</h2>
      <form action="" className="admin-page__upload-form">
        <input type="text" placeholder="Image URL" />
        <input type="text" placeholder="Product name" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="admin-page__textarea"
          placeholder="Description"
        ></textarea>
        <input type="text" placeholder="Price (CAD)" />

        <button type="submit" className="admin-page__submit-button">
          UPLOAD
        </button>
      </form>
    </section>
  );
};

export default AdminPage;
