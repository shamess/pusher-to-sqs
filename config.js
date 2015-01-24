module.exports = {
    aws_region: 'eu-west-1',
    streams: [
        {
            pusher_key: 'de504dc5763aeef9ff52',
            stream_name: 'bitstamp',
            subscriptions: [
                {
                    channel: 'diff_order_book',
                    event: 'data'
                },
                {
                    channel: 'live_trades',
                    event: 'trade'
                }
            ]
        }
    ]
};
