const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "http://localhost:8080",
    secure: false
  }, {
    context: ["/wayback"],
    target: "http://archive.org",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
