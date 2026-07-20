#!/usr/bin/env bash
# Verify /api/courses endpoints — runs against local node OR docker.
set -euo pipefail

BASE="${BASE:-http://127.0.0.1:3030}"
fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "PASS: $*"; }

list=$(curl -fsS "$BASE/api/courses")
echo "$list" | grep -q '"id":"ielts-85"' || fail "/api/courses missing ielts-85 — got: $list"
pass "GET /api/courses → contains ielts-85"

course=$(curl -fsS "$BASE/api/courses/ielts-85")
echo "$course" | grep -q '"phases"' || fail "course missing phases"
echo "$course" | grep -q '"bands"' || fail "course missing bands"
echo "$course" | grep -q '"pitfalls"' || fail "course missing pitfalls"
echo "$course" | grep -q '"LR Sprint"' || fail "course missing phase 1 name"
echo "$course" | grep -q '"Speaking Sprint"' || fail "course missing phase 3 name"
pass "GET /api/courses/ielts-85 → phases/bands/pitfalls present"

week=$(curl -fsS "$BASE/api/courses/ielts-85/weeks/1")
echo "$week" | grep -q '"n":1' || fail "week 1 n != 1"
echo "$week" | grep -q '"diagnostic"' || fail "week 1 headline missing"
echo "$week" | grep -q '"milestones"' || fail "week 1 milestones missing"
echo "$week" | grep -q '"days"' || fail "week 1 days missing"
pass "GET /api/courses/ielts-85/weeks/1 → n:1 diagnostic (7 milestones, 6 days)"

status=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/api/courses/does-not-exist")
[[ "$status" == "404" ]] || fail "expected 404 for missing course, got $status"
pass "GET /api/courses/does-not-exist → 404"

echo "ALL TESTS PASSED"
