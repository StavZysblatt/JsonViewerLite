import json
import os
import aio_pika

RABBITMQ_URL = os.getenv(
    "RABBITMQ_URL",
    "amqp://rabbit:rabbit@localhost:5672/"
)

QUEUE_NAME = "session_events"

async def publish_session_uploaded(session_id: str) -> None:

    connection = await aio_pika.connect_robust(RABBITMQ_URL)

    async with connection:
        channel = await connection.channel()

        queue = await channel.declare_queue(QUEUE_NAME, durable=True)

        payload = {
            "eventType": "SESSION_UPLOADED",
            "sessionId": session_id
        }

        body = json.dumps(payload).encode() #dict -> string -> bytes (for rabbitMQ to read)

        message = aio_pika.Message(body=body)

        await channel.default_exchange.publish(
            message,
            routing_key=QUEUE_NAME
        )

        print(f"[RabbitMQ] Published message for session {session_id}")