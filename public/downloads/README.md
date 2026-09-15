# Persimmon Replay — local bridge starter

This is a runnable **placeholder**, not a hardware driver or firmware release.
It generates four synthetic channels at 128 Hz to illustrate the future bridge's
data format. It does not read Bluetooth, connect to devices, open network ports,
install dependencies, or transmit data. Downloading it does not connect hardware.

Requires Python 3.8 or later. Run from the extracted folder:

```sh
python3 persimmon-replay-bridge.py --seconds 10 --device air --output sample.csv
```

Available device styles: `air`, `checkered`, `cushion`, `tactile`, `grip`.
Use `--help` for options. An existing output file is never overwritten.
Omit `--output` to print CSV to the terminal.

Every row is labeled `synthetic`. The values are illustrative and are not health
measurements, medical advice, or a cognitive assessment.

The website's Connect simulation runs independently in the browser. There is no
live connection between this scaffold and the dashboard. Actual BLE services,
firmware, device validation, and bridge transport remain future integration work.
The Persimmon Replay GitHub repository link will be added when available.

Display names: air = Catalyst; checkered = Checkered; cushion = Cushion;
tactile = Magnificent; grip = Muscle. Stable IDs remain unchanged.
