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
      resultsPerPage: 5,
      gender: "all",
    };
  }

  loadUsers = () => {
    const { currentPage, resultsPerPage, gender } = this.state;

    this.setState({ isFetching: true });
    getUsers({
      page: currentPage,
      results: resultsPerPage,
      gender: gender === "all" ? undefined : gender,
    })
      .then((data) => this.setState({ users: data.results }))
      .catch((e) => this.setState({ error: e }))
      .finally(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, resultsPerPage, gender } = this.state;

    if (
      currentPage !== prevState.currentPage ||
      resultsPerPage !== prevState.resultsPerPage ||
      gender !== prevState.gender
    ) {
      console.log("Gender changed:", prevState.gender, "->", gender);
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

  paginationPage = (e) => {
    const value = e.target.value;
    this.setState({
      resultsPerPage: Number(value),
      currentPage: 1,
    });
  };

  handleGenderChange = (e) => {
    this.setState({
      gender: e.target.value,
      currentPage: 1,
    });
  };

  render() {
    const { users, isFetching, error, resultsPerPage, gender } = this.state;
    return (
      <>
        {error && <div>!!!ERROR!!!{JSON.stringify(error)}</div>}
        {isFetching && <div>Loading. Please wait...</div>}
        {!error && !isFetching && (
          <>
            <label>
              Кількість користувачів:
              <select value={resultsPerPage} onChange={this.paginationPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </label>
            <label>
              Оберіть стать:
              <select value={gender} onChange={this.handleGenderChange}>
                <option value="all">Всі</option>
                <option value="male">Чоловіки</option>
                <option value="female">Жінки</option>
              </select>
            </label>
            <button onClick={this.prevPage}>{"<"}</button>
            <button onClick={this.nextPage}>{">"}</button>
            {/* <ul>
              {users.map((u) => (
                <li key={u.login.uuid}>{JSON.stringify(u)}</li>
              ))}
            </ul> */}
            <ul>
              {users.map((u) => (
                <li key={u.login.uuid}>
                  <img
                    src={u.picture?.medium}
                    alt={`${u.name.first} ${u.name.last}`}
                  />{" "}
                  {u.name.title} {u.name.first} {u.name.last} ({u.gender}) -{" "}
                  {u.email}
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}
export default UsersLoader;
