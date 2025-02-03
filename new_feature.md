Feature Attempted

Add a Multiplayer Mode where two players can take turns answering questions, and the game keeps track of their individual scores.

Why It Is a Reasonable Frontend Feature

Can be implemented using local state (JavaScript variables) without a backend.
Similar logic exists in turn-based games that run fully on the frontend.
No need for server-side logic, as each player's turn is managed locally.
How It Was Supposed to Work

The game starts with Player 1.
If Player 1 answers correctly, they get a point and the turn switches to Player 2.
The game continues switching turns until the timer runs out (or a set number of questions are answered).
The player with the highest score wins.
Display the current player’s name and scores dynamically.
How ChatGPT Failed

Turn Management Issues
ChatGPT's implementation did not correctly alternate turns.
The game sometimes skipped Player 2’s turn or gave Player 1 two turns in a row.
Score Tracking Bugs
The score updates were inconsistent, sometimes adding points to the wrong player.
After several turns, both players started sharing the same score.
Game Flow Problems
When switching turns, the input field sometimes failed to reset.
In time-based mode, the turn switch conflicted with the countdown, causing the game to freeze.
Failure After Multiple Fix Attempts
After three iterations of different approaches (using flags, separate event listeners, and player objects), the same bugs persisted.
ChatGPT could not maintain turn-based logic without breaking other features.