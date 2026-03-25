"""Обработчик формы обратной связи."""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Принимает заявку из формы обратной связи и сохраняет в БД."""
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
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not email or not message:
        return {"statusCode": 400, "headers": headers, "body": {"error": "Заполните обязательные поля"}}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO contacts (name, email, phone, message) VALUES (%s, %s, %s, %s)",
        (name, email, phone, message),
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": headers,
        "body": {"ok": True, "message": "Сообщение получено"},
    }
