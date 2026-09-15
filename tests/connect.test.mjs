import test from "node:test";
import assert from "node:assert/strict";
import { checkBluetooth, requestBluetoothAccess, bluetoothErrorMessage } from "../src/app/components/connect/bluetooth.ts";
import { createSessionCsv, signalSample, SAMPLE_RATE } from "../src/app/components/connect/simulation.ts";

test("Bluetooth availability checks never request device access", async () => {
  let requests = 0;
  const adapter = { getAvailability: async () => true, requestDevice: () => { requests++; } };
  assert.equal(await checkBluetooth(adapter, true), "ready");
  assert.equal(await checkBluetooth(undefined, true), "unsupported");
  assert.equal(await checkBluetooth(adapter, false), "insecure");
  assert.equal(await checkBluetooth({ ...adapter, getAvailability: async () => false }, true), "unavailable");
  assert.equal(await checkBluetooth({ ...adapter, getAvailability: undefined }, true), "unknown");
  assert.equal(await checkBluetooth({ ...adapter, getAvailability: async () => { throw new Error(); } }, true), "unknown");
  assert.equal(requests, 0);
});

test("Bluetooth permission is scoped to the brand and returns a device selection, not a signal stream", async () => {
  const device = { id: "test-device", name: "qBand prototype" };
  let options;
  const result = await requestBluetoothAccess({ requestDevice: async supplied => { options = supplied; return device; } });
  assert.equal(result, device);
  assert.deepEqual(options.filters.map(item => item.namePrefix), ["qBand", "qPad", "Persimmon"]);
  assert.equal(options.acceptAllDevices, undefined);
  assert.equal(options.optionalServices, undefined);
});

test("Cancelled or denied Bluetooth permission keeps the simulation available", () => {
  for (const name of ["NotFoundError", "NotAllowedError", "SecurityError", "NotSupportedError"]) {
    const message = bluetoothErrorMessage({ name });
    assert.match(message, /simulation/);
    assert.doesNotMatch(message, /connected successfully|Bluetooth is off/i);
  }
});

test("Signal scenarios are finite, distinct, and vary by channel", () => {
  for (let ch = 0; ch < 4; ch++) {
    for (let i = 0; i < SAMPLE_RATE; i++) {
      assert.ok(Number.isFinite(signalSample(ch, i / SAMPLE_RATE, "calm")));
      assert.ok(Math.abs(signalSample(ch, i / SAMPLE_RATE, "engaged")) < 40);
    }
  }
  assert.notEqual(signalSample(0, .13, "calm"), signalSample(0, .13, "engaged"));
  assert.notEqual(signalSample(0, .13), signalSample(1, .13));
});

test("CSV exports only synthetic samples for the latest ten seconds", () => {
  const rows = createSessionCsv("cushion", 42, "engaged").trim().split("\n");
  assert.equal(rows.length, 10 * SAMPLE_RATE + 1);
  assert.equal(rows[0], "source,device,scenario,time_seconds,ch_1_uv,ch_2_uv,ch_3_uv,ch_4_uv");
  for (const row of rows.slice(1)) {
    const values = row.split(",");
    assert.equal(values.length, 8);
    assert.deepEqual(values.slice(0, 3), ["synthetic", "cushion", "engaged"]);
    assert.ok(Number(values[3]) >= 32 && Number(values[3]) < 42);
    assert.ok(values.slice(3).every(value => Number.isFinite(Number(value))));
  }
  assert.equal(createSessionCsv("air", 0, "calm").trim().split("\n").length, 1);
  assert.equal(createSessionCsv("air", 2, "calm").trim().split("\n").length, 257);
});
