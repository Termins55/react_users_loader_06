function getUsers(options) {
  const defaultOptions = {
    page: 1,
    results: 10,
    seed: "pe2022",
    inc: ["name", "gender", "email", "login"],
  };

  const realOptions = {
    ...defaultOptions,
    ...options,
  };

  const { page, results, seed, inc } = realOptions;

  return fetch(
    `https://randomuser.me/api/?page=${page}&results=${results}&seed=${seed}&inc=${inc}`
  ).then((response) => response.json());
}

export default getUsers;
