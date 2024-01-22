# Motoko HIgh-End Art Platform


A simple auction platform that allows to:
* Open and view auctions for Hidh -End Art where Both Buyers and Sellers can bid for and sell Art.
* Bid within defined deadline period set by the originator.
* Authenticate by Internet Identity as secure form of authentication.



## Running the application:

```
dfx start --clean --background
npm run setup
npm start
```
# Video Demo

[![Watch the Video](https://img.shields.io/badge/Watch%20on%20YouTube-Click%20to%20Watch-red)](https://youtu.be/7jccDsxeaMQ)

> Someone forgot to paste the link in the submission form.

Local frontend: http://localhost:3000/

Functionality to add:
* Storing and retrieving the auction data in the actor. Prefer `stable` variable(s).
* Implementing the public functions of the actor.
* Associating an id (`Nat`) to each stored auction for later retrievel.
* Using a periodic timer (library `mo:base/Timer`, `Timer.recurringTimer`) to terminate the auctions. 
  For example, a second-interval-timer could decrement the remaining time of each open auction.

Particular checks needed for a bid:
* The auction must not be ended.
* The price needs to be higher than the last bid (or it needs to be the first bid).
* The user needs to be authenticated, i.e. it is not anonymous (using `Principal.isAnonymous()`).
# Like Jiji-but-Decentarilized for Art.
