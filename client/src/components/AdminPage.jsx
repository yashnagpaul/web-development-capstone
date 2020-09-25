import React from "react";
import axios from "axios";
// import ImageUploader from "react-images-upload";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.loginForm = React.createRef();
    this.deleteForm = React.createRef();
  }

  state = {
    pictures: [],
    isLoggedIn: this.props.loggedInStatus,
    error: false,
  };

  deleteHandler = (e) => {
    e.preventDefault();
    const queryKeyword = this.deleteForm.current.deleteItemName.value;
    axios
      .delete(`http://localhost:5000/api/items/${queryKeyword}`)
      .then((response) => console.log(response));
  };

  loginHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/login", {
        username: this.loginForm.current.username.value,
        pass: this.loginForm.current.password.value,
      })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({ isLoggedIn: true });
          localStorage.setItem("token", response.data.token);
          this.props.logInUpdate(this.state.isLoggedIn);
          this.setState({ error: false });
        } else {
          console.log(response.data);
          this.setState({ error: true });
        }
      })
      .catch((err) => console.log(err));
  };

  onDrop = (picture) => {
    // this.setState({ pictures: this.state.pictures.concat(picture) });
    console.log(picture);
  };

  uploadHandler = (e) => {
    e.preventDefault();
    const newProduct = {
      // image: this.state.pictures,
      title: this.form.current.title.value,
      company: this.form.current.company.value,
      description: this.form.current.description.value,
      price: this.form.current.price.value,
      reviews: [],
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
    return this.props.loggedInStatus ? (
      <div className="admin-page">
        <section className="admin-page__upload-section">
          <h2>Add new product</h2>
          <form ref={this.form} className="admin-page__upload-form">
            {/* <ImageUploader
              withIcon={true}
              buttonText="Choose an image"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".png"]}
              maxFileSize={5242880}
              withPreview={true}
              label="Max size: 5mb | Accepted: jpg & png"
            /> */}
            <input name="image" type="file" />
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

        <br />
        <h2 className="admin-page__section-divider">— or —</h2>

        <form ref={this.deleteForm} className="admin-page__delete-section">
          <h2>Delete Product</h2>
          <input
            type="text"
            placeholder="Product name"
            name="deleteItemName"
            required
          />

          <button
            onClick={this.deleteHandler}
            className="admin-page__delete-button"
          >
            DELETE
          </button>
        </form>
      </div>
    ) : (
      <form ref={this.loginForm} className="admin-sign-in">
        <input name="username" type="username" placeholder="Username"></input>
        <input name="password" type="password" placeholder="Password"></input>
        <button onClick={this.loginHandler} type="submit">
          LOG IN
        </button>
        <div className={this.state.error ? "errorVisible" : "errorHidden"}>
          {/* <span>🧐 </span> */}
          This username / password combination doesn't match our records.
        </div>
      </form>
    );
  }
}

export default AdminPage;
