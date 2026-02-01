#!/usr/bin/env python3
"""
GitHub AI Leaders Follow Script (Python version)

This script uses the GitHub API to follow top AI researchers, contributors, and companies.

Prerequisites:
    - Python 3.6+
    - requests library: pip install requests
    - GitHub Personal Access Token with 'user:follow' scope
      Create at: https://github.com/settings/tokens

Usage:
    export GITHUB_TOKEN="your_token_here"
    python3 follow-ai-leaders.py

    Or provide token when prompted.
"""

import os
import sys
import time
import requests
from getpass import getpass


# GitHub API base URL
API_BASE = "https://api.github.com"

# List of GitHub users/organizations to follow
AI_LEADERS = {
    "researchers": [
        ("karpathy", "Andrej Karpathy - AI Researcher, Former Tesla AI Director"),
        ("fchollet", "François Chollet - Creator of Keras"),
        ("jph00", "Jeremy Howard - Co-founder of fast.ai"),
        ("rasbt", "Sebastian Raschka - Author & ML Researcher"),
    ],
    "organizations": [
        ("openai", "OpenAI - Leading AI research company"),
        ("huggingface", "Hugging Face - AI community and model platform"),
        ("deepmind", "DeepMind - Google's AI research lab"),
    ]
}

# Note: Some prominent AI researchers may not have active GitHub accounts:
# - Andrew Ng (andrewng or other handles - verify before adding)
# - Yann LeCun (ylecun or other handles - verify before adding)
# - Fei-Fei Li (may not have public GitHub)
# Add them if you find their correct handles.


def get_github_token():
    """Get GitHub token from environment or user input."""
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("GitHub Personal Access Token not found in environment.")
        print("Create one at: https://github.com/settings/tokens")
        print("Required scope: 'user:follow'\n")
        token = getpass("Enter your GitHub token: ").strip()
    return token


def follow_user(username, token):
    """Follow a GitHub user/organization."""
    url = f"{API_BASE}/user/following/{username}"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    response = requests.put(url, headers=headers)
    return response.status_code


def check_auth(token):
    """Verify the token is valid."""
    url = f"{API_BASE}/user"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get("login")
    return None


def main():
    print("=" * 50)
    print("GitHub AI Leaders Follow Script")
    print("=" * 50)
    print()
    
    # Get and verify token
    token = get_github_token()
    username = check_auth(token)
    
    if not username:
        print("❌ Error: Invalid GitHub token or authentication failed.")
        sys.exit(1)
    
    print(f"✅ Authenticated as: @{username}")
    print()
    
    # Follow researchers
    print("📋 Following AI Researchers...")
    print("-" * 50)
    for github_username, description in AI_LEADERS["researchers"]:
        print(f"Following @{github_username}...", end=" ")
        status = follow_user(github_username, token)
        
        if status == 204:
            print("✅ Success")
        elif status == 404:
            print("⚠️  User not found")
        else:
            print(f"⚠️  Already following or error (status: {status})")
        
        time.sleep(0.5)  # Be nice to the API
    
    print()
    
    # Follow organizations
    print("📋 Following AI Organizations...")
    print("-" * 50)
    for github_username, description in AI_LEADERS["organizations"]:
        print(f"Following @{github_username}...", end=" ")
        status = follow_user(github_username, token)
        
        if status == 204:
            print("✅ Success")
        elif status == 404:
            print("⚠️  Organization not found")
        else:
            print(f"⚠️  Already following or error (status: {status})")
        
        time.sleep(0.5)  # Be nice to the API
    
    print()
    print("=" * 50)
    print(f"✅ Done! Check your following list at:")
    print(f"   https://github.com/{username}?tab=following")
    print("=" * 50)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Interrupted by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)
