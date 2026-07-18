from dataclasses import dataclass
import os
from dotenv import load_dotenv

load_dotenv()


TEMPERATURE_PRESETS = {
    "strict": 0.2,
    "balanced": 0.4,
    "creative": 0.6,
}

@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "FinSaathi AI")                        # ← added fallback
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")                        # ← "" not None
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")            # ← added fallback
    default_temperature_preset: str = os.getenv("DEFAULT_TEMPERATURE_PRESET", "balanced")  # ← added fallback

    @property
    def default_temperature(self) -> float:
        return TEMPERATURE_PRESETS.get(
            self.default_temperature_preset, 0.4)                                 # ← added fallback


settings = Settings()