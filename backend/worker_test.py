import asyncio
import json
import os
import aio_pika


RABBITMQ_URL = os.getenv(
    "RABBITMQ_URL",
    "amqp://rabbit:rabbit@localhost:5672/"
)

async def handle_message(message: aio_pika.IncomingMessage):
    async with message.process():
        payload = json.loads(message.body)
        print("Received message:", payload)
        print("Message processed")


async def main():
    print("Worker connecting to RabbitMQ...")

    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    channel = await connection.channel()

    queue = await channel.declare_queue("session_events", durable=True)

    print("Worker listening on queue: session_events")

    await queue.consume(handle_message)

    await asyncio.Future()

if __name__=="__main__":
    asyncio.run(main())
