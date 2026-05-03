#!/usr/bin/env python3
"""
Entry point for `python -m src.web`
"""

import sys
import argparse

# Parse arguments to decide what to run
parser = argparse.ArgumentParser(description="GAMA Audio Transcriber")
parser.add_argument("--port", type=int, default=8000, help="Port for Web UI (default: 8000)")
parser.add_argument("--host", type=str, default="127.0.0.1", help="Host for Web UI (default: 127.0.0.1)")

args = parser.parse_args()

# Run Web UI
if __name__ == "__main__":
    import uvicorn
    from .web import app

    print(f"\n🚀 Starting GAMA Audio Transcriber Web UI...")
    print(f"📍 Open: http://{args.host}:{args.port}")
    print(f"📍 Docs: http://{args.host}:{args.port}/docs")
    print(f"\nPress Ctrl+C to stop.\n")

    uvicorn.run(
        app,
        host=args.host,
        port=args.port,
        log_level="info"
    )
