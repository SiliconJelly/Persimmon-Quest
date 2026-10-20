# Which source photo becomes which product image. Keys are product slugs, then colour names.
# still: studio mockup (transparent PNG). look/women/men: worn studio portrait. motion: action shot.
# detail: worn close-up (legs) used as the card photo. context: a real-world use photo.
P = {
  "breather-top": {
    "Pearl":      dict(still="Pearl White Feather Jacquard Sports Bra", back="Pearl white feather-jacquard sports top, rear view", look="Pearl Feather Activewear Portrait", motion="Mature Woman Curls in Pearl-White Activewear"),
    "Black":      dict(still="Black Feather Jacquard Sensor Sports Bra", back="Rear three-quarter black feather-jacquard sports top", look="Silver-haired model in black sensor activewear", motion="Joyful studio stride in black activewear"),
    "Cornflower": dict(still="Cornflower blue feather-jacquard sports bra", look="Silver-haired model in cornflower blue activewear", motion="Silver-Haired Woman Exercising in Blue Activewear"),
    "Rose":       dict(still="Muted Rose Feather-Jacquard Sports Bra", back="Rose feather-jacquard sports top, rear view", look="Smiling silver-haired athlete in pink", motion="Rose jacquard activewear side stretch"),
    "Sage":       dict(still="Sage green feather-jacquard sports top", back="Sage feather-jacquard sports bra, rear view", look="Smiling Model in Sage Feather Activewear", motion="Sage-clad woman in seated yoga pose"),
  },
  "movement-tank": {
    "Pearl":      dict(still="Pearl white jacquard wrap-front athletic tank", back="Pearl white botanical jacquard tank", look="Pearl white active elegance", motion="Joyful Activewear Warm-Up Portrait"),
    "Black":      dict(still="Black Botanical Jacquard Wrap Tank", back="Black botanical jacquard tank, rear three-quarter", look="Corrected tank sensor placement", motion="Joyful mature woman lifting in black activewear"),
    "Cornflower": dict(still="Cornflower blue jacquard wrap tank", back="Cornflower Botanical Tank, Rear Three-Quarter", look="Cornflower blue activewear portrait", motion="Happy mature woman with resistance band"),
    "Rose":       dict(still="Rose Pink Botanical Wrap Tank", back="Rose pink botanical jacquard tank, rear three-quarter view", look="Elegant rose-pink activewear portrait", motion="Joyful Silver-Haired Stride in Rose Pink"),
    "Sage":       dict(still="Sage botanical wrap athletic tank", back="Sage botanical tank, rear three-quarter", look="Sage Botanical Tank, Rear Three-Quarter View", motion="Joyful seated yoga in sage activewear"),
  },
  "movement-leggings": {
    "Black":    dict(legs="Silver-haired model in black sensor activewear", look="Active-aging elegance in black jacquard"),
    "Navy":     dict(legs="Silver-haired model in cornflower blue activewear", look="Cornflower blue activewear portrait"),
    "Heather":  dict(legs="Pearl Feather Activewear Portrait", look="Pearl white active elegance"),
    "Charcoal": dict(legs="Smiling silver-haired athlete in pink", look="Elegant rose-pink activewear portrait"),
    "Olive":    dict(legs="Smiling Model in Sage Feather Activewear", look="Sage Botanical Tank, Rear Three-Quarter View"),
  },
  "everyday-polo": {
    "Heather": dict(still="Heather Grey Everyday Sensing Polo", look="Silver-haired man in grey polo, ivory shorts"),
    "Black":   dict(still="Soft Black Smart Sensing Polo", look="Silver-haired man in black polo"),
    "Sage":    dict(still="Sage Green Everyday Sensing Polo", look="Silver-haired man in sage polo"),
    "Mist":    dict(still="Dusty blue sensing polo mockup", look="Silver-haired model in dusty blue polo"),
    "Rose":    dict(still="Dusty Rose Everyday Sensing Polo", look="Silver-haired man in dusty rose polo"),
  },
  "walking-shorts": {
    "Stone": dict(still="Luxury Silver-Grey Smart Walking Shorts", look="Full-figure model in silver gray shorts"),
    "Black": dict(still="Luxury Smart Walking Shorts", look="Silver-haired model in smart black shorts"),
    "Sage":  dict(still="Sage green smart walking shorts", look="Silver-haired model in sage smart shorts"),
    "Mist":  dict(still="Luxury dusty blue smart walking shorts", look="Dusty Blue Smart Walking Shorts"),
    "Rose":  dict(still="Dusty rose smart walking shorts", look="Silver-haired man in smart dusty rose shorts"),
  },
  "breather-vest": {
    "White": dict(still="Luxury White Smart Breather Vest", look="Silver-haired model showcases a white smart vest"),
    "Black": dict(still="Luxury Black Smart Breather Vest", look="Silver-haired model walking in a black vest"),
    "Mist":  dict(still="Luxury dusty blue smart vest", look="Silver-haired model in dusty blue vest"),
  },
  "quest-hood": {
    "Pine":     dict(still="Pine Green Peacock Jacquard Hoodie", back="Pine green peacock jacquard hoodie(1)", women="Silver-haired woman in pine-green peacock-feather hoodie", men="Silver-haired model in pine green hoodie"),
    "Burgundy": dict(still="Burgundy Peacock Jacquard Activewear Hoodie", back="Burgundy Peacock-Feather Jacquard Hoodie", women="Silver-haired model in a burgundy peacock hoodie", men="Silver-haired man in burgundy peacock hoodie"),
    "Midnight": dict(still="Midnight Navy Peacock Jacquard Zip Hoodie", back="Midnight navy peacock-feather hoodie back", women="Silver-haired model in a midnight peacock hoodie", men="Silver-haired man in a navy peacock hoodie"),
    "Charcoal": dict(still="Charcoal Peacock Feather Hoodie Back View", women="Silver-haired model in peacock jacquard hoodie", men="Silver-haired model in peacock-feather hoodie"),
  },
  "movement-hood": {
    "Mist":  dict(still="Mist Blue Asymmetric Jacquard Hoodie", back="Mist blue feather jacquard hoodie", women="Silver-haired woman in blue asymmetric hoodie", men="Silver-haired model in an asymmetric blue jacquard hoodie"),
    "Sage":  dict(still="Sage feather jacquard crossover hoodie", back="Sage jacquard hoodie, rear three-quarter view", women="Silver-haired woman in sage asymmetric hoodie", men="Silver-haired man in sage hoodie"),
    "Pearl": dict(still="Luxury pearl ivory feather-jacquard hoodie", women="Silver-haired woman in ivory feather hoodie", men="Silver-haired model in a pearl ivory hoodie"),
  },
  "quest-stride": {
    "Ivory": dict(still="Ivory Smart Walking Shoe With Sensor", back="Rear Three-Quarter Smart Walking Shoe", detail="Ivory technical walking shoes on mature legs"),
    "Black": dict(still="Black smart walking shoe with sensor", back="Black smart walking shoe, rear view", detail="Technical black footwear in motion"),
    "Mist":  dict(still="Dusty Blue Smart Walking Shoe", back="Dusty Blue Smart Shoe, Rear Three-Quarter View", detail="Dusty blue performance shoes in motion"),
  },
  "everyday-socks": {
    "Silver": dict(still="Silvery Smart Sock with Embroidered Dock", detail="Silver-Grey Knit Socks, Blue-Grey Backdrop"),
    "White":  dict(still="White chevron smart sock with emblem dock", detail="Luxury white chevron socks with emblem dock"),
  },
  "everyday-gloves": {
    "Pearl": dict(still="Pearl-grey smart glove pair", context="Pearl-gray sensor glove on bicycle grip"),
  },
  "grip-gloves": {
    "Pearl": dict(still="Pearl-gray smart fingerless glove pair", context="Sensor-Trimmed Fingerless Glove Grip"),
    "Slate": dict(still="Slate-blue fingerless smart glove pair", context="Slate-blue glove grips a hex dumbbell"),
    "Black": dict(still="Luxury black fingerless smart glove pair", context="Refined black glove gripping a motorcycle throttle"),
  },
}
# Outdoor edits for the homepage (one morning, one park, one light)
EDITS = {
  "run-longer": "Silver-haired stroll in ivory activewear",
  "stand-stronger": "Tai Chi in a Pine Green Hoodie",
  "breathe-better": "Sage hoodie garden stretch",
  "signature-style": "Silver-haired cyclist in a burgundy jacquard hoodie",
}
