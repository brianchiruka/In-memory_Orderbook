//authentication and authorization

db.createUser({
  apiKey: b9fb68df5485639d03c3171cf6e49b89e52fd78d5c313819b9c592b59c689f33,
  roles: [{ role: read, db: "orderbook" }],
});
