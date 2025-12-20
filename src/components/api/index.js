function getUsers(options) {
  const defaultOptions = {
    page: 1,
    results: 10,
    // seed: "pe2022",
    inc: ["name", "gender", "picture", "email", "login"],
  };

  const realOptions = {
    ...defaultOptions,
    ...options,
  };

  const { page, results, seed, inc, gender } = realOptions;
  const genderParam = gender && gender !== "all" ? `&gender=${gender}` : "";
  return fetch(
    `https://randomuser.me/api/?page=${page}&results=${results}&inc=${inc}${genderParam}`
  ).then((response) => response.json());
}

export default getUsers;
