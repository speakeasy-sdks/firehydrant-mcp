#!/bin/bash

# FireHydrant MCP Server Docker Runner
# This script builds and runs the Docker container for the FireHydrant MCP server

set -e

# Get the directory where this script is located and calculate project root
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT=$(dirname "$SCRIPT_DIR")

IMAGE_NAME="firehydrant-mcp"
CONTAINER_NAME="firehydrant-mcp-container"
PORT=3000

function usage() {
    echo "Usage: $0 [build|run|stop|cleanup|test|help]"
    echo ""
    echo "Commands:"
    echo "  build    - Build the Docker image"
    echo "  run      - Run the Docker container (builds if needed)"
    echo "  stop     - Stop the running container"
    echo "  cleanup  - Stop and remove container and image"
    echo "  test     - Run sample HTTP requests against the server"
    echo "  help     - Show this help message"
    echo ""
    echo "Example HTTP requests:"
    echo "  curl -H 'Authorization: your-api-key' http://localhost:3000/"
    echo "  curl -H 'Authorization: your-api-key' http://localhost:3000/sse"
}

function build_image() {
    echo "Building Docker image: $IMAGE_NAME"
    docker build -t $IMAGE_NAME -f "$PROJECT_ROOT/Dockerfile" "$PROJECT_ROOT"
    echo "✅ Image built successfully"
}

function run_container() {
    # Check if container is already running
    if docker ps -q -f name=$CONTAINER_NAME | grep -q .; then
        echo "Container $CONTAINER_NAME is already running"
        return 0
    fi
    
    # Remove existing stopped container if it exists
    if docker ps -a -q -f name=$CONTAINER_NAME | grep -q .; then
        echo "Removing existing container: $CONTAINER_NAME"
        docker rm $CONTAINER_NAME
    fi
    
    # Build image if it doesn't exist
    if ! docker images -q $IMAGE_NAME | grep -q .; then
        echo "Image not found, building first..."
        build_image
    fi
    
    echo "Starting container: $CONTAINER_NAME on port $PORT"
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:3000 \
        $IMAGE_NAME
    
    echo "✅ Container started successfully"
    echo "🌐 Server available at: http://localhost:$PORT"
    echo "📝 Use 'Authorization' header with your FireHydrant API key for requests"
}

function stop_container() {
    if docker ps -q -f name=$CONTAINER_NAME | grep -q .; then
        echo "Stopping container: $CONTAINER_NAME"
        docker stop $CONTAINER_NAME
        echo "✅ Container stopped"
    else
        echo "Container $CONTAINER_NAME is not running"
    fi
}

function cleanup() {
    echo "Cleaning up Docker resources..."
    
    # Stop container if running
    if docker ps -q -f name=$CONTAINER_NAME | grep -q .; then
        docker stop $CONTAINER_NAME
    fi
    
    # Remove container if exists
    if docker ps -a -q -f name=$CONTAINER_NAME | grep -q .; then
        docker rm $CONTAINER_NAME
        echo "✅ Container removed"
    fi
    
    # Remove image if exists
    if docker images -q $IMAGE_NAME | grep -q .; then
        docker rmi $IMAGE_NAME
        echo "✅ Image removed"
    fi
    
    echo "🧹 Cleanup complete"
}

function test_endpoints() {
    echo "Testing FireHydrant MCP Server endpoints..."
    echo "Note: Replace 'your-api-key' with your actual FireHydrant API key"
    echo ""
    
    API_KEY="${FIREHYDRANT_API_KEY:-your-api-key}"
    BASE_URL="http://localhost:$PORT"
    
    echo "1. Testing root endpoint:"
    echo "   curl -H 'Authorization: $API_KEY' $BASE_URL/"
    echo ""
    curl -s -H "Authorization: $API_KEY" $BASE_URL/ || echo "❌ Request failed - is the container running and API key valid?"
    echo ""
    echo ""
    
    echo "2. Testing SSE endpoint (will return immediately):"
    echo "   curl -H 'Authorization: $API_KEY' $BASE_URL/sse"
    echo ""
    timeout 2s curl -H "Authorization: $API_KEY" $BASE_URL/sse || echo "❌ Request failed or timed out"
    echo ""
    echo ""
    
    echo "📋 Other useful commands:"
    echo "  docker logs $CONTAINER_NAME  # View container logs"
    echo "  docker exec -it $CONTAINER_NAME /bin/sh  # Access container shell"
}

# Main command handling
case "${1:-help}" in
    build)
        build_image
        ;;
    run)
        run_container
        ;;
    stop)
        stop_container
        ;;
    cleanup)
        cleanup
        ;;
    test)
        test_endpoints
        ;;
    help|*)
        usage
        ;;
esac