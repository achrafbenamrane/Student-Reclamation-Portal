#!/bin/bash

# Security Testing Script for Student Reclamation Portal

echo "🔒 Security Features Testing"
echo "============================"
echo ""

API_URL="http://localhost:3000/api/submit-reclamation"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "⚠️  Make sure your dev server is running (npm run dev)"
echo ""
read -p "Press Enter to continue..."
echo ""

# Test 1: Valid Submission
echo "📝 Test 1: Valid Submission"
echo "----------------------------"
response=$(curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Academic Issues",
    "reclamation": "This is a valid test reclamation message.",
    "email": "test@example.com"
  }')
echo "Response: $response"
if echo "$response" | grep -q "success.*true"; then
    echo -e "${GREEN}✅ PASS: Valid submission accepted${NC}"
else
    echo -e "${RED}❌ FAIL: Valid submission rejected${NC}"
fi
echo ""

# Test 2: Rate Limiting
echo "⏱️  Test 2: Rate Limiting (4 requests in quick succession)"
echo "-----------------------------------------------------------"
for i in {1..4}; do
    echo "Request $i..."
    response=$(curl -s -X POST $API_URL \
      -H "Content-Type: application/json" \
      -d '{
        "studentName": "ALIM LINA YASMINE",
        "category": "Other",
        "reclamation": "Rate limit test message number '"$i"'."
      }')
    
    if [ $i -eq 4 ]; then
        if echo "$response" | grep -q "Too many requests"; then
            echo -e "${GREEN}✅ PASS: Rate limit working (4th request blocked)${NC}"
        else
            echo -e "${YELLOW}⚠️  WARNING: Rate limit might not be working${NC}"
            echo "Response: $response"
        fi
    fi
    sleep 0.5
done
echo ""

# Test 3: Invalid Student Name
echo "👤 Test 3: Invalid Student Name"
echo "--------------------------------"
response=$(curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "FAKE STUDENT NAME",
    "category": "Academic Issues",
    "reclamation": "This should be rejected due to invalid student name."
  }')
if echo "$response" | grep -q "Invalid student name"; then
    echo -e "${GREEN}✅ PASS: Invalid student name rejected${NC}"
else
    echo -e "${RED}❌ FAIL: Invalid student name accepted${NC}"
fi
echo "Response: $response"
echo ""

# Test 4: Spam Detection
echo "🚫 Test 4: Spam Detection"
echo "-------------------------"
response=$(curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Other",
    "reclamation": "BUY VIAGRA NOW!!! CLICK HERE!!! LIMITED TIME OFFER!!!"
  }')
if echo "$response" | grep -q "Suspicious content"; then
    echo -e "${GREEN}✅ PASS: Spam content detected and blocked${NC}"
else
    echo -e "${RED}❌ FAIL: Spam content not detected${NC}"
fi
echo "Response: $response"
echo ""

# Test 5: XSS Attempt
echo "🛡️  Test 5: XSS Attack Prevention"
echo "----------------------------------"
response=$(curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Technical Support",
    "reclamation": "<script>alert(\"XSS Attack\")</script>"
  }')
if echo "$response" | grep -q "Suspicious content"; then
    echo -e "${GREEN}✅ PASS: XSS attempt blocked${NC}"
else
    echo -e "${RED}❌ FAIL: XSS attempt not blocked${NC}"
fi
echo "Response: $response"
echo ""

# Test 6: Short Reclamation
echo "📏 Test 6: Too Short Reclamation"
echo "--------------------------------"
response=$(curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Other",
    "reclamation": "Short"
  }')
if echo "$response" | grep -q "at least 10 characters"; then
    echo -e "${GREEN}✅ PASS: Short message rejected${NC}"
else
    echo -e "${RED}❌ FAIL: Short message accepted${NC}"
fi
echo "Response: $response"
echo ""

# Test 7: Invalid Email
echo "📧 Test 7: Invalid Email Format"
echo "--------------------------------"
response=$(curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF",
    "category": "Academic Issues",
    "reclamation": "This is a test message with invalid email.",
    "email": "not-an-email"
  }')
if echo "$response" | grep -q "Invalid email"; then
    echo -e "${GREEN}✅ PASS: Invalid email rejected${NC}"
else
    echo -e "${RED}❌ FAIL: Invalid email accepted${NC}"
fi
echo "Response: $response"
echo ""

# Test 8: Missing Required Fields
echo "❓ Test 8: Missing Required Fields"
echo "-----------------------------------"
response=$(curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "ABED ACHRAF"
  }')
if echo "$response" | grep -q "required"; then
    echo -e "${GREEN}✅ PASS: Missing fields rejected${NC}"
else
    echo -e "${RED}❌ FAIL: Missing fields accepted${NC}"
fi
echo "Response: $response"
echo ""

echo "================================"
echo "🎯 Security Testing Complete!"
echo "================================"
echo ""
echo "Summary:"
echo "--------"
echo "✅ Valid submissions work"
echo "⏱️  Rate limiting (3 per minute)"
echo "👤 Student name validation"
echo "🚫 Spam detection"
echo "🛡️  XSS protection"
echo "📏 Length validation"
echo "📧 Email format validation"
echo "❓ Required field checking"
echo ""
echo "💡 Tip: Wait 1 minute before running this script again"
echo "    to avoid rate limiting on your IP address."
echo ""
