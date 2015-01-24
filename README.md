Pusher to SQS
=============

Sometimes working with websockets is just too hard, or you don't want to have
to hold open a socket. Maybe you're using PHP and libraries aren't too good.

You can run this tiny node app to send a bunch of web socket data to an Amazon
SQS queue for you to read from anyway like you.

Setting up
----------

First up, you'll have to run `npm install`.

Take a look at the config.js.example file - you can likely work out how to
change this if you know much about Pusher - you just need to pop in the Pusher
stream ID/key you care about (you can have multiple streams), and the channels
you wish to listen for (subscribe to).

The example is listening to the streams described here:
https://ru.bitstamp.net/websocket/

You will also need to set up your AWS credentials somehow; I'd recommend using
the [.aws/credientials](http://docs.aws.amazon.com/aws-sdk-php/guide/latest/credentials.html#credential-profiles)
method.

