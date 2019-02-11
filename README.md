# Sky Is Falling
Very simple VR game developed with [A-frame](https://aframe.io/). The purpose of game is to shoot falling pieces of sky until they touch the ground. Game is available in browsers, also for cardboards. 
Live demo is available here: [https://dominika-zajac-skyisfalling.glitch.me/](https://dominika-zajac-skyisfalling.glitch.me/)


## Setup
To run game locally just clone the repo and start server inside folder. You don't need any additional dependencies. Sample command to run python server: 
```
python -m http.server
```
Just open your browser on localhost with correct port and start playing (also on cardboard).

## Tuneling
The easiest way to test game from localhost on phone is using tuneling tool like [ngrok](https://ngrok.com/). Install tool from the page and type:
```
ngrok http [number_of_port]
```
to get URL with access to your localhost:[number_of_port].
