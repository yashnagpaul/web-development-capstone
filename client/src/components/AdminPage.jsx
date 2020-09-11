import React from "react";
import axios from "axios";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.loginForm = React.createRef();
  }

  state = {
    isLoggedIn: false,
  };

  loginHandler = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:5000/api/login", {
        username: this.loginForm.current.username.value,
        pass: this.loginForm.current.password.value,
      })
      .then((response) =>
        response.data.status === 200
          ? this.setState({ isLoggedIn: true })
          : console.log(response.data)
      )
      .catch((err) => console.log(err));

    // console.log(
    //   this.loginForm.current.username.value,
    //   this.loginForm.current.password.value
    // );
  };

  uploadHandler = (e) => {
    e.preventDefault();
    const newProduct = {
      image: this.form.current.image.value,
      title: this.form.current.title.value,
      company: this.form.current.company.value,
      description: this.form.current.description.value,
      price: this.form.current.price.value,
    };

    axios
      .post("http://localhost:5000/api/items", newProduct)
      .then(window.alert("New product has been added!"))
      .then(e.target.reset);
  };

  render() {
    return this.state.isLoggedIn ? (
      <section className="admin-page">
        <h2>Add new product</h2>
        <form ref={this.form} className="admin-page__upload-form">
          <input name="image" type="text" placeholder="Image URL" />
          <input name="title" type="text" placeholder="Product name" />
          <input name="company" type="text" placeholder="Company name" />
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            className="admin-page__textarea"
            placeholder="Description"
          ></textarea>
          <input type="number" placeholder="Price (CAD)" name="price" />

          <button
            onClick={this.uploadHandler}
            type="submit"
            className="admin-page__submit-button"
          >
            UPLOAD
          </button>
        </form>
      </section>
    ) : (
      <form ref={this.loginForm} className="admin-sign-in">
        <input name="username" type="username" placeholder="Username"></input>
        <input name="password" type="password" placeholder="Password"></input>
        <button onClick={this.loginHandler} type="submit">
          LOG IN
        </button>
      </form>
    );
  }
}

export default AdminPage;
