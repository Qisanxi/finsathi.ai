import streamlit as st
from google import genai
from config.settings import settings


@st.cache_resource
def get_client():
    if not settings.gemini_api_key:
        return None
    return genai.Client(api_key=settings.gemini_api_key)


def is_gemini_configured() -> bool:
    return bool(settings.gemini_api_key)


def send_message(
    history: list[dict],
    system_prompt: str,
    temperature: float | None = None,
) -> str:
    client = get_client()

    if not client:
        return (
            "Gemini is not configured yet. Add GEMINI_API_KEY to your .env file "
            "to enable live AI responses."
        )

    contents = []
    for msg in history:
        contents.append({
            "role": msg["role"],
            "parts": [{"text": msg["content"]}],
        })

    response = client.models.generate_content(
        model=settings.gemini_model,
        contents=contents,
        config={
            "system_instruction": system_prompt,
            "temperature": temperature if temperature is not None else settings.default_temperature,
        },
    )

    try:
        return response.text or "I could not generate a response. Please try again."
    except Exception:
        return "FinSaathi could not generate a response right now. Please try rephrasing your question."