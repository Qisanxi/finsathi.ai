import streamlit as st

AGE_OPTIONS = ["18-24", "25-34", "35-44", "45-54", "55+"]
EMPLOYMENT_OPTIONS = ["Salaried", "Self-employed / Business", "Student / Fresher", "Retired"]
INCOME_OPTIONS = ["Prefer not to say", "Below ₹25,000", "₹25,000 - ₹50,000", "₹50,000 - ₹1,00,000", "Above ₹1,00,000"]
SAVINGS_OPTIONS = ["Not saving yet", "Below ₹5,000", "₹5,000 - ₹15,000", "₹15,000 - ₹50,000", "Above ₹50,000"]
GOAL_OPTIONS = ["Build emergency fund", "Pay off debt", "Start investing", "Save tax", "Save for education", "Save for home", "Retirement planning"]
RISK_OPTIONS = ["Low", "Medium", "High"]
HORIZON_OPTIONS = ["Less than 1 year", "1-3 years", "3-7 years", "7+ years"]


def _index_of(options: list, saved_value: str, default: int = 0) -> int:
    try:
        return options.index(saved_value)
    except ValueError:
        return default


def render_profile_form() -> dict:
    st.header("👤 Financial Profile")
    st.write("Share a few details so FinSaathi can personalise educational guidance.")

    existing_profile = st.session_state.get("financial_profile", {})

    with st.form("financial_profile_form"):
        age_range = st.selectbox(
            "Age range", AGE_OPTIONS,
            index=_index_of(AGE_OPTIONS, existing_profile.get("age_range", ""))
        )
        employment_type = st.selectbox(
            "Employment type", EMPLOYMENT_OPTIONS,
            index=_index_of(EMPLOYMENT_OPTIONS, existing_profile.get("employment_type", ""))
        )
        monthly_income = st.selectbox(
            "Monthly income range", INCOME_OPTIONS,
            index=_index_of(INCOME_OPTIONS, existing_profile.get("monthly_income", ""))
        )
        monthly_savings = st.selectbox(
            "Monthly savings capacity", SAVINGS_OPTIONS,
            index=_index_of(SAVINGS_OPTIONS, existing_profile.get("monthly_savings", ""))
        )
        primary_goal = st.selectbox(
            "Primary financial goal", GOAL_OPTIONS,
            index=_index_of(GOAL_OPTIONS, existing_profile.get("primary_goal", ""))
        )
        risk_tolerance = st.radio(
            "Risk comfort", RISK_OPTIONS, horizontal=True,
            index=_index_of(RISK_OPTIONS, existing_profile.get("risk_tolerance", ""), default=1)
        )
        investment_horizon = st.selectbox(
            "Investment horizon", HORIZON_OPTIONS,
            index=_index_of(HORIZON_OPTIONS, existing_profile.get("investment_horizon", ""))
        )

        submitted = st.form_submit_button("Save Profile")

    profile = {
        "age_range": age_range,
        "employment_type": employment_type,
        "monthly_income": monthly_income,
        "monthly_savings": monthly_savings,
        "primary_goal": primary_goal,
        "risk_tolerance": risk_tolerance,
        "investment_horizon": investment_horizon,
    }

    if submitted:
        st.session_state["financial_profile"] = profile
        st.success("Profile saved.")

    return st.session_state.get("financial_profile", profile)


def render_profile_summary(profile: dict) -> None:
    st.subheader("Profile Summary")

    col1, col2, col3 = st.columns(3)

    with col1:
        st.markdown("**Goal**")
        st.write(profile["primary_goal"])
        st.markdown("**Employment**")
        st.write(profile["employment_type"])

    with col2:
        st.markdown("**Risk Comfort**")
        st.write(profile["risk_tolerance"])
        st.markdown("**Monthly Savings**")
        st.write(profile["monthly_savings"])

    with col3:
        st.markdown("**Time Horizon**")
        st.write(profile["investment_horizon"])
        st.markdown("**Age Range**")
        st.write(profile["age_range"])