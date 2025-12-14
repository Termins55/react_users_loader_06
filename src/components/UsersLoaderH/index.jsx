import React, { useEffect, useState } from "react";
import getUsers from "../api";
import styles from "./UsersLoaderH.module.sass";
import classNames from "classnames";

function UsersLoaderH() {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [gender, setGender] = useState("all");

  const loadUsers = () => {
    setIsFetching(true);
    getUsers({
      page: currentPage,
      results: resultsPerPage,
      gender: gender === "all" ? undefined : gender,
    })
      .then((data) => setUsers(data.results))
      .catch((e) => setError(e))
      .finally(() => setIsFetching(false));
  };

  useEffect(() => {
    loadUsers()
  }, [currentPage, resultsPerPage, gender]);

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const paginationPage = (e) => {
    const value = e.target.value;
    setResultsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    setCurrentPage(1);
  };

  return (
    <>
      {error && <div>!!!ERROR!!!{JSON.stringify(error)}</div>}
      {isFetching && <div>Loading. Please wait...</div>}
      {!error && !isFetching && (
        <>
          <div className={styles.container}>
            <div className={styles.controls}>
              <label className={styles.label}>
                Number of users:
                <select
                  className={styles.select}
                  value={resultsPerPage}
                  onChange={paginationPage}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </label>
              <label className={styles.label}>
                Select gender:
                <select
                  className={styles.select}
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
            </div>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={prevPage}>
                {"<"}
              </button>
              <button className={styles.button} onClick={nextPage}>
                {">"}
              </button>
            </div>
            <ul className={styles.list}>
              {users.map((u) => (
                <li key={u.login.uuid} className={styles.user}>
                  <img
                    className={classNames({
                      [styles.maleBorder]: u.gender === "male",
                      [styles.femaleBorder]: u.gender === "female",
                    })}
                    src={u.picture?.medium}
                    alt={`${u.name.first} ${u.name.last}`}
                  />
                  <div className={styles.userInfo}>
                    <div className={styles.name}>
                      {u.name.title} {u.name.first} {u.name.last}
                    </div>
                    <div>Gender: {u.gender}</div>
                    <div className={styles.email}>{u.email}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default UsersLoaderH;
