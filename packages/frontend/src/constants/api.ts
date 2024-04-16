let api =
  document.location.hostname == "localhost"
    ? "http://localhost:2020"
    : "https://filesnap-r1x8.onrender.com";

if (document.location.hostname.startsWith("172")) {
  api = "http://" + document.location.hostname + ":2020";
} else if (document.location.hostname.startsWith("192")) {
  api = "http://" + document.location.hostname + ":2020";
}

export const ENDPOINT = "http://localhost:2020";

export default api + "/v1/api";