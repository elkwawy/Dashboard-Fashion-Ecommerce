import Cookies from "js-cookie";

export const getAuthHeader = () => {
  const token = Cookies.get("token");
  return { headers: { Authorization: JSON.parse(token) } };
};
