"""Обработчик оформления заказов на семена и оборудование."""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Принимает заказ и сохраняет в БД."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": headers, "body": {"error": "Method not allowed"}}

    body = json.loads(event.get("body") or "{}")
    package = body.get("package", "").strip()
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    email = body.get("email", "").strip()
    address = body.get("address", "").strip()
    delivery = body.get("delivery", "cdek").strip()
    comment = body.get("comment", "").strip()

    if not all([package, name, phone, email, address]):
        return {"statusCode": 400, "headers": headers, "body": {"error": "Заполните обязательные поля"}}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        """INSERT INTO orders (package, name, phone, email, address, delivery, comment)
           VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id""",
        (package, name, phone, email, address, delivery, comment),
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": headers,
        "body": {"ok": True, "order_id": order_id},
    }
