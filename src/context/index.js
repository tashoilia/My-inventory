import * as React from "react";
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor() {
    super();
    this.getName = this.getName.bind(this);
    this.getCategories = this.getCategories.bind(this);

    this.state = {
      name: "",
      categories: [],
    };
  }

  getName(name) {
    this.setState({
      name: name,
    });
  }

  getCategories(list) {
    let newList = [...list];
    this.setState({ categories: newList });
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          name: this.state.name,
          categories: this.state.categories,
          getName: this.getName,
          getCategories: this.getCategories,
        }}
      >
        {" "}
        {this.props.children}{" "}
      </AuthContext.Provider>
    );
  }
}
const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
