Stage 1: react-youtube player used to setup basic player with functionality to control volume and time using code 

Stage 2: setup server with web socket to create a active duplex connection to broadcast running time.
        Websocket is a TCP connection(point to point) so bradcast wont work.

Stage 3: Maintaing list of WebSockets and broadcasting on change in time
