import streamlit as st

from core.chat_engine import get_chat_status, reset_chat

QUICK_TOPICS = [
    "What is SIP and how do I start?",
    "Difference between term and ULIP?",
    "How does Section 80C help save tax?",
    "What is PMAY and who can apply?",
    "How much emergency fund should I have?",
]


def render_sidebar() -> str:
    st.sidebar.title("FinSaathi")
    st.sidebar.caption("Financial literacy for Indian users")

    page = st.sidebar.radio(
        "Navigate",
        ["Profile", "AI Chat"],
    )

    st.sidebar.divider()

    st.sidebar.subheader("Scope")
    st.sidebar.caption(
        "Mutual funds, insurance, tax-saving concepts, housing schemes, "
        "and government savings schemes."
    )

    st.sidebar.divider()

    st.sidebar.subheader("Quick Topics")
    st.sidebar.caption("Tap to ask instantly")
    for topic in QUICK_TOPICS:
        if st.sidebar.button(topic, use_container_width=True):
            st.session_state["quick_topic"] = topic

    st.sidebar.divider()

    st.sidebar.subheader("AI Status")
    st.sidebar.info(get_chat_status())

    if st.sidebar.button("Reset Chat"):
        reset_chat()
        st.toast("Chat reset.", icon="✅")

    st.sidebar.divider()
    st.sidebar.caption(
        "Educational use only. Not financial, tax, legal, insurance, "
        "or investment advice."
    )

    return page