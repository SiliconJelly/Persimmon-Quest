export const connectDevices = [
  { id: "air", family: "qBand Air", style: "Catalyst", feature: "Waterproof", kind: "band", image: "/media/5afad371-aea0-4d9a-9b78-9d9ed1e256b4.png" },
  { id: "checkered", family: "qBand Air", style: "Checkered", feature: "Versatile", kind: "band", image: "/media/eba98a24-0e1b-4ef2-9fd6-6c469a75357f.png" },
  { id: "cushion", family: "qBand Air", style: "Cushion", feature: "Breathable", kind: "band", image: "/media/exec-44424b2a-9e10-4d5c-b951-cf42ab484f44.png" },
  { id: "tactile", family: "qPad One", style: "Magnificent", feature: "Intuitive", kind: "pad", image: "/media/8fa8621f-3f14-4152-a110-af6e79388582.png" },
  { id: "grip", family: "qPad One", style: "Muscle", feature: "Supportive", kind: "pad", image: "/media/5e3dc914-6ba6-4247-8c10-f89525dff27c.png" }
] as const;

export type ConnectDevice = (typeof connectDevices)[number];
