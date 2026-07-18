import streamlit as st

from components.comparator import render_comparator
from components.profiler import render_profile_form, render_profile_summary
from components.sidebar import render_sidebar
from config.settings import settings
from core.chat_engine import get_response, initialise_chat


def render_profile_page() -> None:
    profile = render_profile_form()
    render_profile_summary(profile)


def render_chat_page() -> None:
    st.header("💬 Ask FinSaathi")
    st.write(
        "Ask about mutual funds, insurance, tax-saving concepts, government schemes, "
        "or beginner financial planning."
    )

    profile = st.session_state.get("financial_profile")

    if not profile:
        st.warning("Complete your financial profile first for more personalised answers.")

    initialise_chat()

    # Handle quick topic selected from sidebar
    if "quick_topic" in st.session_state:
        topic = st.session_state.pop("quick_topic")
        with st.chat_message("user"):
            st.markdown(topic)
        with st.chat_message("assistant"):
            with st.spinner("FinSaathi is thinking..."):
                response = get_response(topic, profile)
            st.markdown(response)

    render_comparator()

    st.divider()
    st.subheader("Chat")

    for msg in st.session_state.messages:
        role = "assistant" if msg["role"] == "model" else "user"
        with st.chat_message(role):
            st.markdown(msg["content"])

    if user_input := st.chat_input(
        "Ask about SIP, ELSS, PPF, term insurance, ULIP, tax saving..."
    ):
        with st.chat_message("user"):
            st.markdown(user_input)

        with st.chat_message("assistant"):
            with st.spinner("FinSaathi is thinking..."):
                response = get_response(user_input, profile)
            st.markdown(response)


def main() -> None:
    st.set_page_config(
        page_title=settings.app_name,
        page_icon="💰",
        layout="wide",
    )
    st.title("💰 FinSaathi")
    st.caption("Financial literacy for Indian users")

    page = render_sidebar()

    if page == "Profile":
        render_profile_page()
    elif page == "AI Chat":
        render_chat_page()

    st.divider()
    st.caption(
        "⚠️ Disclaimer: FinSaathi provides educational information only. "
        "It is not financial, investment, tax, legal, or insurance advice. "
        "Please consult a SEBI-registered advisor before investing."
    )


if __name__ == "__main__":
    main()
