#!/usr/bin/env sh
set -e

echo "Starting API and worker..."
node api/server.js &
node worker/worker.js &

echo "API: http://localhost:3000"
echo "Press Ctrl+C to stop."
wait
