#!/usr/bin/env bash
# Verify /api/courses endpoints — runs against local node OR docker.
set -euo pipefail

BASE="${BASE:-http://127.0.0.1:3030}"
fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "PASS: $*"; }

list=$(curl -fsS "$BASE/api/courses")
echo "$list" | grep -q '"id":"ielts-70-80"' || fail "/api/courses missing ielts-70-80 — got: $list"
pass "GET /api/courses → contains ielts-70-80"

course=$(curl -fsS "$BASE/api/courses/ielts-70-80")
echo "$course" | grep -q '"phases"' || fail "course missing phases"
echo "$course" | grep -q '"bands"' || fail "course missing bands"
echo "$course" | grep -q '"pitfalls"' || fail "course missing pitfalls"
echo "$course" | grep -q '"Skill Building"' || fail "course missing phase 2 name"
pass "GET /api/courses/ielts-70-80 → phases/bands/pitfalls present"

week=$(curl -fsS "$BASE/api/courses/ielts-70-80/weeks/14")
echo "$week" | grep -q '"n":14' || fail "week n != 14"
echo "$week" | grep -q '"feedback loop"' || fail "week headline missing"
pass "GET /api/courses/ielts-70-80/weeks/14 → ok"

status=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/api/courses/does-not-exist")
[[ "$status" == "404" ]] || fail "expected 404 for missing course, got $status"
pass "GET /api/courses/does-not-exist → 404"

echo "ALL TESTS PASSED"
