#!/bin/bash

# Coverce.ai MVP Setup Script
# This script sets up the development environment

echo "🎬 Coverce.ai MVP Setup"
echo "======================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    echo "❌ DFX SDK is not installed. Please install from:"
    echo "   https://internetcomputer.org/docs/current/developer-docs/setup/install/"
    exit 1
fi

echo "✅ DFX SDK found: $(dfx --version)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd src/coverce_frontend
npm install
cd ../..

# Install AI orchestrator dependencies
echo "📦 Installing AI orchestrator dependencies..."
cd src/ai_orchestrator
npm install
cd ../..

# Create .env file if it doesn't exist
if [ ! -f "src/ai_orchestrator/.env" ]; then
    echo "📝 Creating .env file for AI orchestrator..."
    cp env.example src/ai_orchestrator/.env
    echo "⚠️  Please edit src/ai_orchestrator/.env with your API keys"
fi

# Create directories
echo "📁 Creating output directories..."
mkdir -p src/ai_orchestrator/output
mkdir -p src/ai_orchestrator/temp

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start local ICP network: dfx start"
echo "2. Deploy canisters: dfx deploy"
echo "3. Start frontend: cd src/coverce_frontend && npm run dev"
echo "4. Configure API keys in src/ai_orchestrator/.env"
echo ""
echo "For more information, see QUICKSTART.md"



