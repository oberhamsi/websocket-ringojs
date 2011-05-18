This is a basic Stick application to demonstrate websocket use with RingoJs.

You need RingoJs:

    $ cd ~
    $ git clone git://github.com/ringo/ringojs.git
    $ ant jar

and the Ringo package 'stick':

    $ cd ~
    $ git clone https://github.com/hns/stick.git
    $ ln -s stick ~/ringojs/packages/stick

(this step will get easier once Ringo 0.8 is released)

Then launch this application:

    $ cd ~/websocket-ringojs/
    $ ringo main.js

and point your browser to this URL:

    http://localhost:8080/
