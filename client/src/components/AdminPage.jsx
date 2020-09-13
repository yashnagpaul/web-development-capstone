import React from "react";
import axios from "axios";
import ImageUploader from "react-images-upload";

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
      .post("http://localhost:5000/api/login", {
        username: this.loginForm.current.username.value,
        pass: this.loginForm.current.password.value,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          this.setState({ isLoggedIn: true });
          localStorage.setItem("token", response.data.token);
        } else console.log(response.data);
      })
      .catch((err) => console.log(err));
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

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    return this.state.isLoggedIn ? (
      <div className="admin-page">
        <section className="admin-page__upload-section">
          <h2>Add new product</h2>
          <form ref={this.form} className="admin-page__upload-form">
            <ImageUploader
              withIcon={true}
              buttonText="Choose an image"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".png"]}
              maxFileSize={5242880}
              withPreview={true}
              label="Max size: 5mb | Accepted: jpg & png"
            />
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

        <section>
          <h2 className="admin-page__section-divider">— or —</h2>
          <button
            className="admin-page__logout-btn"
            onClick={localStorage.removeItem("token")}
          >
            LOG OUT
          </button>
        </section>

        <form className="admin-page__delete-section">
          <h2>Delete Product</h2>
          <input
            type="text"
            placeholder="Product name"
            name="productName"
            required
          />
          <input
            type="text"
            placeholder="Product ID"
            name="productID"
            required
          />
          <button className="admin-page__delete-button">DELETE</button>
        </form>
      </div>
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
