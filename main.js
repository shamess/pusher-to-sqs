var send_to_sqs,
    config = require('./config'),
    Pusher = require('pusher-client'),
    AWS = require('aws-sdk'),
    SQS;

AWS.config.update({region: config.aws_region});
SQS = new AWS.SQS();

send_to_sqs = function (queue_name) {
    process.stdout.write(queue_name + "\n");
    return function (data) {
        SQS.createQueue({QueueName: queue_name}, function (error, response) {
            if (error) {
                console.log(error);

                return;
            }

            SQS.sendMessage({
                QueueUrl: response.QueueUrl,
                MessageBody: JSON.stringify(data)
            }, function (error, response) {
                process.stdout.write(".");
                if (error) {
                    console.log(error);

                    return;
                }
            });
        });
    };
};

for(var stream_i = 0; stream_i < config.streams.length; stream_i++) {
    var stream = config.streams[stream_i],
        pusher_client = new Pusher(stream.pusher_key);

    for(var sub_i = 0; sub_i < stream.subscriptions.length; sub_i++) {
        var subscription = stream.subscriptions[sub_i];

        pusher_subscription = pusher_client.subscribe(subscription.channel);
        pusher_subscription.bind(
            subscription.event,
            send_to_sqs([stream.stream_name, subscription.channel, subscription.event].join('_'))
        );
    }
}
