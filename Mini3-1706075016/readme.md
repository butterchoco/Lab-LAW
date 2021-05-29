Start rabbitmq server with web stomp
docker run -d --name rabbit-stomp -p 5672:5672 -p 15674:15674 -p 15672:15672 beevelop/rabbitmq-stomp

// Client
cd client
npm install
npm run start

// Server
cd server
npm install
npm run start
