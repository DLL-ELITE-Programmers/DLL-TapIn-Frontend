<h3 align="center">DLL TapIn</h3>
<h4 align="center">ITP x BSIT Dept x E.L.I.T.E</h4>

---

### Introduction

> This is a project where it tries to organize the attendance of each student and monitor some of their actions and behavior within
> a certain event. It also helps the event organizer to check if their event work well by the attendees giving their feedback right after the event.

---

### API Endpoints

Each of the `API` are settled in the `utils/access.ts` file, so the rest here are the list of endpoint may use. Most of it are under development,
so expect the unwanted bugs

| Endpoint                | Method | Parameters                                                                                      |
| ----------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `users`                 | GET    | user: [optional]                                                                                |
| `users/self`            | GET    | token: [required]                                                                               |
| `users/login`           | POST   | username, password                                                                              |
| `users/register`        | GET    | studentID (as username), first_name, middle_name: [optional], last_name, email, department, sex |
| `users/forgot-password` | GET    | email: [required]                                                                               |
| `department`            | GET    |                                                                                                 |
| `events`                | GET    |                                                                                                 |
| `feedback`              | GET    |                                                                                                 |
| `organization`          | GET    |                                                                                                 |
| `participants`          | GET    |                                                                                                 |

---

### Project initation

> After you clone the project, or `git fetch` and `git pull`, always execute `npm install` to update dependencies.
> It is to make the project always synchronize to each of the devices.

---

### Contribution

> Please create branches for you to collaborate, create any name, but must **NOT HAVE** the word `stable`. It is simple because
> I use the term stable for deployment, and to prevent confusions, we must prevent to use the word stable even it is fixed and/or stable to your device

---

### To our successor

> Good luck
