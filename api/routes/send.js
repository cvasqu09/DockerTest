const express = require('express');
const router = express.Router();

const amqp = require('amqplib/callback_api');

router.post('/', (req, res, next) => {
	try {
		amqp.connect('amqp://localhost', function(err, conn) {
		  conn.createChannel(function(err, ch) {
				var queue = 'messages';

		    ch.assertQueue(queue, {durable: true});
				ch.sendToQueue(queue, new Buffer(req.body.message));
			})
		});
	} catch (err) {
		return res.status(500).json({
			'message': 'Error occurred while posting message'
		});
	}

	return res.status(201).json({
		'message': 'Message posted'
	});

})

module.exports = router;