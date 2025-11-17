#!/bin/bash

echo "🎬 Coverce.ai Linux Setup"
echo "========================"
echo ""

# Check if running from project directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check Node.js
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Node.js"
        exit 1
    fi
fi
echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"

# Check DFX
echo ""
echo "Checking DFX SDK..."
if ! command -v dfx &> /dev/null; then
    echo "DFX SDK not found. Installing..."
    sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install DFX SDK"
        exit 1
    fi
    # Add to PATH for current session
    export PATH="$HOME/bin:$PATH"
else
    echo "✅ DFX: $(dfx --version)"
fi

# Install root dependencies
echo ""
echo "📦 Installing root dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install root dependencies"
    exit 1
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd src/coverce_frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    cd ../..
    exit 1
fi
cd ../..

# Install AI orchestrator dependencies
echo ""
echo "📦 Installing AI orchestrator dependencies..."
cd src/ai_orchestrator
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install AI orchestrator dependencies"
    cd ../..
    exit 1
fi
cd ../..

# Install FFmpeg (optional)
echo ""
echo "Checking FFmpeg..."
if ! command -v ffmpeg &> /dev/null; then
    echo "FFmpeg not found. Installing (optional for AI generation)..."
    sudo apt update
    sudo apt install -y ffmpeg
    if [ $? -ne 0 ]; then
        echo "⚠️  FFmpeg installation failed (optional, continuing anyway)"
    fi
else
    echo "✅ FFmpeg: $(ffmpeg -version | head -n 1)"
fi

# Create directories
echo ""
echo "📁 Creating output directories..."
mkdir -p src/ai_orchestrator/output
mkdir -p src/ai_orchestrator/temp

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Terminal 1: dfx start"
echo "2. Terminal 2: dfx generate && dfx deploy"
echo "3. Terminal 3: cd src/coverce_frontend && npm run dev"
echo "4. Open browser: http://localhost:3000"
echo ""

