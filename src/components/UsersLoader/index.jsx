import { Component } from "react";
import getUsers from "../api";

class UsersLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      error: null,
      currentPage: 1,
    };
  }

  loadUsers = () => {
    const { currentPage } = this.state;

    this.setState({ isFetching: true });
    getUsers({
      page: currentPage,
      results: 5,
    })
      .then((data) => this.setState({ users: data.results }))
      .catch((e) => this.setState({ error: e }))
      .finally(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;

    if (currentPage !== prevState.currentPage) {
      this.loadUsers();
    }
  }

  nextPage = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 });
  };

  prevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  render() {
    const { users, isFetching, error } = this.state;
    return (
      <>
        {error && <div>!!!ERROR!!!{JSON.stringify(error)}</div>}
        {isFetching && <div>Loading. Please waite...</div>}
        {!error && !isFetching && (
          <>
            <button onClick={this.prevPage}>{"<"}</button>
            <button onClick={this.nextPage}>{">"}</button>
            <ul>
              {users.map((u) => (
                <li key={u.id}>{JSON.stringify(u)}</li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}
export default UsersLoader;
