const getAccess = () => {
  return localStorage.getItem("access");
};
const getRefresh = () => {
  return localStorage.getItem("refresh");
};
const clearAccess = () => {
  localStorage.clear("access");
};
const clearRefresh = () => {
  localStorage.clear("refresh");
};

module.exports = { getAccess, getRefresh, clearAccess, clearRefresh };
