import google.generativeai as genai
from django.conf import settings
import json


genai.configure(
    api_key=settings.GEMINI_API_KEY
)


model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def classify_ticket(
    title,
    description
):
    """
    Returns:
    {
        "category": "...",
        "priority": "LOW|MEDIUM|HIGH"
    }
    """

    prompt = f"""
You are a CRM support ticket classifier.

Classify the following ticket.

Ticket Title:
{title}

Ticket Description:
{description}

Choose Category from:
- Billing
- Technical
- Account
- Product
- Delivery
- General

Choose Priority from:
- LOW
- MEDIUM
- HIGH

Return ONLY valid JSON.

Example:
{{
    "category": "Billing",
    "priority": "HIGH"
}}
"""

    try:

        response = model.generate_content(
            prompt
        )

        result = response.text.strip()

        result = (
            result
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        data = json.loads(result)

        return {
            "category": data.get(
                "category",
                "General"
            ),
            "priority": data.get(
                "priority",
                "MEDIUM"
            )
        }

    except Exception as e:

        print(
            "Gemini Error:",
            str(e)
        )

        return {
            "category": "General",
            "priority": "MEDIUM"
        }