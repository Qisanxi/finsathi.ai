import streamlit as st

from config.settings import TEMPERATURE_PRESETS
from core.gemini_client import is_gemini_configured, send_message
from core.prompts import build_contextual_prompt


def initialise_chat() -> None:
    if "messages" not in st.session_state:
        st.session_state.messages = []


def reset_chat() -> None:
    st.session_state.messages = []


def get_chat_status() -> str:
    if is_gemini_configured():
        return "Gemini is configured. Live AI responses are enabled."
    return "Gemini is not configured. Add GEMINI_API_KEY to enable live AI responses."


def choose_temperature_mode(user_message: str) -> str:
    message = user_message.lower()

    comparison_keywords = [
        "compare", "vs", "versus", "difference",
        "better", "which is good", "which is better",
        "should i choose", "which one",
    ]

    explainer_keywords = [
        "explain", "simple", "like i am new", "beginner",
        "what is", "meaning", "how does", "kya hai",
    ]

    if any(keyword in message for keyword in comparison_keywords):
        return "strict"

    if any(keyword in message for keyword in explainer_keywords):
        return "creative"

    return "balanced"


def get_response(user_message: str, profile: dict | None = None) -> str:
    initialise_chat()

    if not user_message.strip():
        return "Please enter a question to continue."

    system_prompt = build_contextual_prompt(profile)
    temperature_mode = choose_temperature_mode(user_message)

    st.session_state.messages.append({
        "role": "user",
        "content": user_message,
    })

    response = send_message(
        history=st.session_state.messages,
        system_prompt=system_prompt,
        temperature=TEMPERATURE_PRESETS[temperature_mode],
    )

    if not response.startswith("Gemini is not configured"):
        st.session_state.messages.append({
            "role": "model",
            "content": response,
        })

    return response