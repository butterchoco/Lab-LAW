var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertExchange("time", "fanout", { durable: false });

    let time;
    setInterval(() => {
      time = new Date().toLocaleTimeString();
      channel.publish("time", "", Buffer.from(time));
    }, 60000);

    var queue = "room-public";

    channel.assertQueue(queue, {
      durable: true,
    });
    channel.prefetch(1);
    console.log(" [x] Awaiting RPC requests");
    channel.consume(queue, function reply(msg) {
      const response = JSON.parse(msg.content.toString());
      response["createdAt"] = new Date()
        .toLocaleTimeString()
        .split(":")
        .slice(0, 2)
        .join(":");
      channel.publish(
        queue,
        msg.properties.headers["room-id"],
        Buffer.from(JSON.stringify(response))
      );
      channel.ack(msg);
    });
  });
});
