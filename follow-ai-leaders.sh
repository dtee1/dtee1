#!/bin/bash

# GitHub AI Leaders Follow Script
# This script uses GitHub CLI (gh) to follow top AI researchers, contributors, and companies
# 
# Prerequisites:
#   - Install GitHub CLI: https://cli.github.com/
#   - Authenticate with: gh auth login
#
# Usage:
#   chmod +x follow-ai-leaders.sh
#   ./follow-ai-leaders.sh

set -e

echo "=========================================="
echo "GitHub AI Leaders Follow Script"
echo "=========================================="
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed."
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Error: Not authenticated with GitHub CLI."
    echo "Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"
echo ""

# Array of GitHub usernames to follow
declare -a RESEARCHERS=(
    "karpathy"          # Andrej Karpathy - AI Researcher, Former Tesla AI Director
    "fchollet"          # François Chollet - Creator of Keras
    "jph00"             # Jeremy Howard - Co-founder of fast.ai
    "rasbt"             # Sebastian Raschka - Author & ML Researcher
)

declare -a ORGANIZATIONS=(
    "openai"            # OpenAI - Leading AI research company
    "huggingface"       # Hugging Face - AI community and model platform
    "anthropics"        # Anthropic - AI safety research company (note: may be 'anthropics' or check correct handle)
    "deepmind"          # DeepMind - Google's AI research lab
)

# Note: Some researchers like Andrew Ng, Yann LeCun, and Fei-Fei Li may not have active GitHub accounts
# or use different usernames. Add them if you find their correct handles.

echo "📋 Following AI Researchers..."
echo "----------------------------------------"
for user in "${RESEARCHERS[@]}"; do
    echo -n "Following @$user... "
    if gh api -X PUT "/user/following/$user" 2>/dev/null; then
        echo "✅"
    else
        echo "⚠️  (already following or user not found)"
    fi
    sleep 0.5  # Be nice to the API
done

echo ""
echo "📋 Following AI Organizations..."
echo "----------------------------------------"
for org in "${ORGANIZATIONS[@]}"; do
    echo -n "Following @$org... "
    if gh api -X PUT "/user/following/$org" 2>/dev/null; then
        echo "✅"
    else
        echo "⚠️  (already following or organization not found)"
    fi
    sleep 0.5  # Be nice to the API
done

echo ""
echo "=========================================="
echo "✅ Done! Check your following list at:"
echo "   https://github.com/$(gh api user --jq .login)?tab=following"
echo "=========================================="
