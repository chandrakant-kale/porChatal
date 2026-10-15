# PorChatal

**Private communication. Less history. More control.**

PorChatal is a privacy-focused chat web application featuring temporary connection codes, real-time messaging, and minimal message storage.

## Features

- User registration and login
- Temporary connection codes
- Real-time messaging with Socket.IO
- PostgreSQL-based account and connection management
- Password hashing and authenticated chat access
- Clean, responsive dark UI
- Messages are not persisted to the database

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, Socket.IO
- **Database:** PostgreSQL
- **Authentication:** JWT, bcrypt


## Roadmap

- [x] Authentication
- [x] Temporary connection codes
- [x] Real-time messaging
- [x] Connection management
- [ ] End-to-end encryption
- [ ] Security testing
- [ ] Production deployment

## Security Notice

PorChatal is under development. End-to-end encryption is not yet implemented, and messages may be accessible to the server. Avoid sending sensitive information until the security model has been completed and reviewed.

---

**PorChatal** — A quieter place to connect.
