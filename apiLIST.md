# DevTinder APIs

- POST /signup
- POST /login
- POST /logout

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

- POST /request/send/:status/:userId => here status can be interested or ignored
- POST /request/review/:status/:requestId => here status can be accepted or rejected
- GET /user/requests/recived => to get intrested requests from others
- GET /user/connections => to get all connections which accepted from either loggedInUser or either others users to loggedInUser
- GET /feed - gets you the profiles of other users on platforms
  Status : ignored , intrested , accepted , rejected
