const getAccess = () => {
  return localStorage.getItem("access");
};
const getRefresh = () => {
  return localStorage.getItem("refresh");
};
const rme = () => {
  return localStorage.getItem("rme");
};
const clearAccess = () => {
  localStorage.removeItem("access");
};
const clearRefresh = () => {
  localStorage.removeItem("refresh");
};

module.exports = { getAccess, getRefresh, clearAccess, clearRefresh, rme };
