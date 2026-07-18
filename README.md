# FinSaathi 💰

FinSaathi is a Streamlit-based financial literacy assistant for Indian users.
It helps first-time investors understand mutual funds, insurance, government
schemes, tax-saving concepts, and beginner financial planning in simple language.

## Problem Statement

Many first-time investors in India find financial products difficult to understand.
Users from Tier-2 and Tier-3 cities often lack access to simple, personalised
financial education in their context.

FinSaathi bridges this gap by explaining Indian financial concepts in plain
language, personalised to each user's profile, with references to relevant
regulators such as SEBI, AMFI, and IRDAI.

## Features

- Financial profile form with persistent session state
- India-specific financial literacy assistant powered by Gemini
- Multi-turn chat interface with full conversation memory
- Quick comparison tables (Term vs ULIP, SIP vs Lumpsum, ELSS vs PPF)
- One-tap quick topic starters from the sidebar
- Dynamic temperature presets (strict for comparisons, creative for explanations)
- Educational safety disclaimers throughout

## Tech Stack

| Layer | Technology |
|---|---|
| UI | Streamlit |
| AI | Google Gemini 2.5 Flash via `google-genai` SDK |
| Language | Python 3.10+ |
| Config | python-dotenv |

## How It Works

```
User fills profile → Profile stored in session state
        ↓
User asks a question → Temperature mode auto-selected by intent
        ↓
Full conversation history + system prompt sent to Gemini
        ↓
Response rendered in chat UI with markdown support
```

## Project Structure

```text
finsaathi/
├── app.py                  # Entry point
├── core/
│   ├── chat_engine.py      # Conversation memory and response logic
│   ├── gemini_client.py    # Gemini API client wrapper
│   └── prompts.py          # System prompt and profile context builder
├── components/
│   ├── comparator.py       # Side-by-side comparison tables
│   ├── profiler.py         # User profile form and summary
│   └── sidebar.py          # Navigation, quick topics, AI status
├── config/
│   └── settings.py         # Centralised settings via dataclass
├── .env.example
├── requirements.txt
└── README.md
```

## Setup

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

## Environment Variables

```env
APP_NAME=FinSaathi
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash
DEFAULT_TEMPERATURE_PRESET=balanced
```

Get your free Gemini API key at [aistudio.google.com](https://aistudio.google.com).

## Run Locally

```bash
streamlit run app.py
```

## Demo

> Loom Recording Link -- https://www.loom.com/share/930e239636624a08b97eabaed597bee1

Suggested demo flow for judges:
1. Fill the profile form as a 25-year-old salaried user wanting to save tax
2. Open the ELSS vs PPF comparison table
3. Ask "Which is better for me, ELSS or PPF?"
4. Tap a quick topic from the sidebar

## Disclaimer

FinSaathi provides educational information only. It is not financial,
investment, tax, legal, or insurance advice. Please consult a SEBI-registered
advisor before investing.

## Team

Built for the Flowzint Hackathon 2026.