import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const checkout = readFileSync(
  new URL("../src/components/FlotCheckout.tsx", import.meta.url),
  "utf8"
)

test("checkout carries the dashboard order ID into the hosted Flot URL", () => {
  assert.match(
    checkout,
    /await response\.json\(\)/,
    "a successful order capture must read the returned order ID"
  )
  assert.match(
    checkout,
    /searchParams\.set\("orderId",\s*paymentOrderId\)/,
    "the hosted Flot URL must receive that exact order ID"
  )
})
