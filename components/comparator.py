import streamlit as st


COMPARISONS = {
    "term_vs_ulip": {
        "title": "Term Insurance vs ULIP",
        "headers": ["Feature", "Term Insurance", "ULIP"],
        "rows": [
            ["Purpose", "Pure protection", "Protection + investment"],
            ["Premium", "Usually lower", "Usually higher"],
            ["Returns", "No maturity value in pure term plans", "Market-linked or plan-linked"],
            ["Best for", "Income replacement for family", "People wanting cover plus investment component"],
            ["Regulator", "IRDAI", "IRDAI"],
        ],
    },
    "sip_vs_lumpsum": {
        "title": "SIP vs Lumpsum Investment",
        "headers": ["Feature", "SIP", "Lumpsum"],
        "rows": [
            ["Investment style", "Fixed amount at regular intervals", "One-time investment"],
            ["Market timing risk", "Lower due to rupee cost averaging", "Higher because entry timing matters"],
            ["Best for", "Regular income earners", "Bonus, inheritance, or idle surplus"],
            ["Discipline required", "High, because investing is periodic", "Lower, because investment is upfront"],
            ["Regulator / source context", "SEBI / AMFI", "SEBI / AMFI"],
        ],
    },
    "elss_vs_ppf": {
        "title": "ELSS vs PPF",
        "headers": ["Feature", "ELSS", "PPF"],
        "rows": [
            ["Product type", "Equity mutual fund (80C category)", "Government-backed savings scheme"],
            ["Lock-in period", "3 years (shortest among 80C options)", "15 years"],
            ["Returns", "Market-linked", "Government-notified interest rate"],
            ["Risk", "Medium-High (equity market linked)", "Very Low (sovereign guarantee)"],
            ["Tax context", "Used for Section 80C planning", "Used for Section 80C planning"],
            ["Regulator / authority", "SEBI / AMFI", "Government of India"],
        ],
    },
}


def render_comparator() -> None:
    st.subheader("📊 Quick Comparisons")
    st.caption("Common financial product comparisons for Indian users.")

    col1, col2, col3, col4 = st.columns(4)
    selected = None

    with col1:
        if st.button("Term vs ULIP", use_container_width=True):
            selected = "term_vs_ulip"

    with col2:
        if st.button("SIP vs Lumpsum", use_container_width=True):
            selected = "sip_vs_lumpsum"

    with col3:
        if st.button("ELSS vs PPF", use_container_width=True):
            selected = "elss_vs_ppf"

    with col4:
        if st.button("✕ Clear", use_container_width=True):
            st.session_state.pop("selected_comparison", None)

    if selected:
        st.session_state["selected_comparison"] = selected

    comparison_key = st.session_state.get("selected_comparison")

    if comparison_key and comparison_key in COMPARISONS:
        data = COMPARISONS[comparison_key]

        st.markdown(f"#### {data['title']}")
        st.table(
            {
                data["headers"][i]: [row[i] for row in data["rows"]]
                for i in range(len(data["headers"]))
            }
        )

        st.caption(
            "Educational comparison only. Please verify current rules, rates, "
            "and product details from official sources before acting."
        )