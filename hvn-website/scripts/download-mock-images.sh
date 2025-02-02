#!/bin/bash

# Create mock images directory if it doesn't exist
mkdir -p public/images/mock

# Download sample images from Unsplash
curl "https://source.unsplash.com/1200x900/?dutch,culture" -o public/images/mock/event-main.jpg
curl "https://source.unsplash.com/1200x900/?netherlands,windmill" -o public/images/mock/gallery-1.jpg
curl "https://source.unsplash.com/1200x900/?amsterdam,canal" -o public/images/mock/gallery-2.jpg
curl "https://source.unsplash.com/1200x900/?dutch,food" -o public/images/mock/gallery-3.jpg
curl "https://source.unsplash.com/1200x900/?netherlands,traditional" -o public/images/mock/gallery-4.jpg

echo "Mock images downloaded successfully!"
