export const connectDevices = [
  { id: "air", family: "qBand Air", style: "Catalyst", feature: "Waterproof", kind: "band", image: "/media/mockups/headband/brainwear-extra-1.png" },
  { id: "checkered", family: "qBand Air", style: "Checkered", feature: "Versatile", kind: "band", image: "/media/mockups/headband/brainwear-extra-2.png" },
  { id: "cushion", family: "qBand Air", style: "Cushion", feature: "Breathable", kind: "band", image: "/media/mockups/headband/brainwear-extra-0.png" },
  { id: "tactile", family: "qPad One", style: "Magnificent", feature: "Intuitive", kind: "pad", image: "/media/mockups/tablet/tablet-holder-2.png" },
  { id: "grip", family: "qPad One", style: "Muscle", feature: "Supportive", kind: "pad", image: "/media/mockups/tablet/tablet-holder-1.png" }
] as const;

export type ConnectDevice = (typeof connectDevices)[number];
