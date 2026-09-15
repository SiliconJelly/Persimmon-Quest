// Device permission is separate from a live EEG connection. No proprietary
// services are requested until a hardware protocol has been defined.
export type BluetoothDeviceAccess = { name?: string; id: string; forget?: () => Promise<void> };
export type BluetoothAdapter = {
  getAvailability?: () => Promise<boolean>;
  requestDevice: (options: { filters: { namePrefix: string }[] }) => Promise<BluetoothDeviceAccess>;
  addEventListener?: (type: string, listener: EventListener) => void;
  removeEventListener?: (type: string, listener: EventListener) => void;
};
export type BluetoothAvailability = "checking" | "unsupported" | "insecure" | "unavailable" | "ready" | "unknown";

export async function checkBluetooth(adapter: BluetoothAdapter | undefined, secure: boolean): Promise<BluetoothAvailability> {
  if (!secure) return "insecure";
  if (!adapter) return "unsupported";
  if (!adapter.getAvailability) return "unknown";
  try { return await adapter.getAvailability() ? "ready" : "unavailable"; }
  catch { return "unknown"; }
}

export function requestBluetoothAccess(adapter: BluetoothAdapter) {
  // Call directly from the click handler to retain browser user activation.
  return adapter.requestDevice({ filters: [{ namePrefix: "qBand" }, { namePrefix: "qPad" }, { namePrefix: "Persimmon" }] });
}

export function bluetoothErrorMessage(error: unknown) {
  const name = error && typeof error === "object" && "name" in error ? error.name : "";
  if (name === "NotFoundError") return "No device selected. Turn on Bluetooth and put your device in pairing mode, or try the simulation.";
  if (name === "NotAllowedError" || name === "SecurityError") return "Bluetooth access wasn’t granted. You can try again or explore the simulation.";
  if (name === "NotSupportedError") return "Bluetooth isn’t available in this browser. The simulation is ready to explore.";
  return "Device access didn’t complete. Check Bluetooth and try again, or continue with the simulation.";
}
