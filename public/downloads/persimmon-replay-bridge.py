#!/usr/bin/env python3
"""Persimmon Replay local bridge starter — synthetic data only, no hardware access."""

import argparse
import csv
import math
import sys

SAMPLE_RATE = 128


def sample(channel, seconds):
    phase = channel * 0.71
    return (
        15 * math.sin(seconds * math.pi * 20 + phase)
        + 3 * math.sin(seconds * math.pi * 38 + phase * 2)
        + 4 * math.sin(seconds * math.pi * 7 + phase)
        + 2 * math.sin(seconds * math.pi * 1.2 + phase)
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--seconds", type=int, default=10, help="Sample duration, 1–60 seconds")
    parser.add_argument("--device", choices=["air", "checkered", "cushion", "tactile", "grip"], default="air")
    parser.add_argument("--output", help="Optional new CSV file; existing files will not be overwritten")
    args = parser.parse_args()
    if not 1 <= args.seconds <= 60:
        parser.error("--seconds must be between 1 and 60")
    print("Persimmon Replay starter: synthetic data only. No Bluetooth, firmware, or live bridge connection.", file=sys.stderr)
    try:
        stream = open(args.output, "x", newline="", encoding="utf-8") if args.output else sys.stdout
    except FileExistsError:
        parser.error("Output file already exists; choose a new filename")
    try:
        writer = csv.writer(stream)
        writer.writerow(["source", "device", "scenario", "time_seconds", "ch_1_uv", "ch_2_uv", "ch_3_uv", "ch_4_uv"])
        for i in range(args.seconds * SAMPLE_RATE):
            t = i / SAMPLE_RATE
            writer.writerow(["synthetic", args.device, "calm", f"{t:.4f}", *[f"{sample(ch, t):.4f}" for ch in range(4)]])
    finally:
        if args.output:
            stream.close()


if __name__ == "__main__":
    main()
