// All game content lives here. Edit this file to change items, bins, levels or facts.
// Every "why" and "fact" is a DRAFT teaching statement: have a teacher or food-safety reviewer check it before classroom use.
window.FEEDBACK_URL = ""; // paste a Google Form or email link here to show a "Send feedback" link

window.GAME = {
  ladder: [
    { e: "🥗", t: "Use it up", d: "Prevent waste. Take only what you will eat." },
    { e: "🤝", t: "Share it", d: "Safe, untouched food can feed other people." },
    { e: "🐔", t: "Feed animals", d: "Safe scraps can become animal feed." },
    { e: "🔥", t: "Make something", d: "Oil, fuel and other products." },
    { e: "🌱", t: "Compost", d: "Turn scraps into soil." },
    { e: "🗑️", t: "Trash", d: "The very last choice." }
  ],
  bins: {
    eat:     { emoji: "🍽️", name: "Eat it later", sub: "Save it" },
    share:   { emoji: "🤝", name: "Share it", sub: "Share table" },
    feed:    { emoji: "🐔", name: "Animal feed", sub: "Safe for animals" },
    make:    { emoji: "🔥", name: "Make something", sub: "Oil, fuel, products" },
    compost: { emoji: "🌱", name: "Compost", sub: "Turn into soil" },
    trash:   { emoji: "🗑️", name: "Trash", sub: "Last resort" }
  },
  levels: [
  {
    id: "kitchen", emoji: "🏠", title: "Level 1: My Kitchen", type: "sort",
    blurb: "Sort leftovers at home using the Food Rescue Ladder.",
    intro: "Dinner is over and the kitchen is full of leftovers. Where should each one go? Remember the ladder: use it up first, trash last!",
    bins: ["eat", "feed", "compost", "trash"],
    items: [
      { id: "apple", emoji: "🍎", name: "Apple core", desc: "From an afternoon snack.",
        scores: { compost: 3, feed: 1 },
        why: { compost: "Fruit scraps are plant material. In a compost bin, worms and microbes turn them into soil.", feed: "Some animals can eat fruit scraps, but only a grown-up who knows what is safe should decide that.", trash: "In a landfill, food rots without air and makes methane, a gas that warms the planet." } },
      { id: "pasta", emoji: "🍝", name: "Leftover pasta", desc: "Cooked yesterday and kept cold in the fridge.",
        scores: { eat: 3, compost: 1 },
        why: { eat: "Food that is still safe to eat should be eaten first. This is the top of the ladder.", compost: "Composting is good, but eating it is better. It is still safe food." } },
      { id: "banana", emoji: "🍌", name: "Banana peel", desc: "Nobody eats the peel.",
        scores: { compost: 3 },
        why: { compost: "Peels break down quickly in compost and add nutrients to soil.", eat: "Banana peels are not usually eaten, so this is not the best choice." } },
      { id: "bread", emoji: "🍞", name: "Stale bread", desc: "Hard and dry, but no mold.",
        scores: { eat: 3, compost: 2 },
        why: { eat: "Stale bread can become toast, croutons or breadcrumbs. Use it up!", compost: "Compost works, but you can still use this bread first." } },
      { id: "bones", emoji: "🍗", name: "Chicken bones", desc: "Left over from dinner.",
        scores: { trash: 3, compost: 1 },
        why: { trash: "Meat and bones can attract pests and need special composting. Many home piles do not accept them, so check local rules.", feed: "Cooked bones can splinter, so they are not safe for animals.", compost: "Home compost piles usually should not take bones. Check your local rules." } },
      { id: "eggshell", emoji: "🥚", name: "Eggshells", desc: "From breakfast.",
        scores: { compost: 3 },
        why: { compost: "Eggshells break down in compost and add calcium to the soil.", trash: "Eggshells are plant-friendly and can be composted." } },
      { id: "moldbread", emoji: "🍞", name: "Moldy bread", desc: "Fuzzy green spots are growing on it.",
        scores: { trash: 3, compost: 1 }, unsafe: ["eat", "feed"],
        why: { trash: "Moldy food can make people and animals sick, so it must not be eaten or fed to animals.", eat: "Never eat moldy bread.", feed: "Moldy food is not safe for animals either." } }
    ],
    fact: "The USDA estimates that 30 to 40 percent of the food supply in the United States goes uneaten. Wasted food is also a waste of the water, land and energy used to grow it. (Reviewer: please confirm source and wording.)"
  },
  {
    id: "lunch", emoji: "🏫", title: "Level 2: School Lunch", type: "sort",
    blurb: "Prevent waste first, then place what is left.",
    intro: "Your school has a share table and a compost bin. Waste is easiest to fix before it happens, so think about your tray first.",
    bins: ["eat", "share", "compost", "trash"],
    prestep: {
      q: "How much food do you put on your tray?",
      options: [
        { label: "Pile it high", desc: "It all looks yummy!", extras: ["salad", "rice", "roll"], note: "A big tray left you with 3 extra scraps. The best way to fight waste is to not make it." },
        { label: "Take what I will eat", desc: "I can always go back for more.", extras: [], prevent: true, note: "Smart! You took only what you would eat and made less waste. Prevention is the top of the ladder." }
      ]
    },
    items: [
      { id: "wholeapple", emoji: "🍏", name: "Whole apple", desc: "Not touched. Still has its skin.",
        scores: { share: 3, eat: 2 },
        why: { share: "Untouched whole fruit can go on a share table so someone else can enjoy it, following school rules.", eat: "You could save it for a snack, but a share table helps someone else too.", compost: "This apple is still good food. Use or share it first." } },
      { id: "yogurt", emoji: "🥛", name: "Unopened yogurt cup", desc: "Sealed, and it has been kept cold.",
        scores: { share: 3, eat: 2 },
        why: { share: "Sealed packaged food that has been kept safe can be shared, following school rules.", eat: "You could save it for later, but sharing is a great choice too.", compost: "Sealed food is still good. Use it first." } },
      { id: "crackers", emoji: "🍘", name: "Unopened crackers", desc: "The bag is still sealed.",
        scores: { share: 3, eat: 2 },
        why: { share: "Sealed packages are perfect for the share table.", eat: "Saving them is OK, but sharing helps someone who is still hungry." } },
      { id: "orangepeel", emoji: "🍊", name: "Orange peel", desc: "You ate the orange.",
        scores: { compost: 3 },
        why: { compost: "Peels go into the compost bin, where they turn into soil.", trash: "Peels can become soil instead of landfill." } },
      { id: "sandwich", emoji: "🥪", name: "Half-eaten sandwich", desc: "You took bites out of it.",
        scores: { compost: 3, trash: 1 }, unsafe: ["share"],
        why: { compost: "Food that has been bitten should not be shared. The school compost bin can take it.", share: "Food that has been bitten or touched should never be shared.", trash: "Compost is better in this school because it has a compost bin." } },
      { id: "applecore", emoji: "🍎", name: "Apple core", desc: "From your snack.",
        scores: { compost: 3 },
        why: { compost: "Apple cores are plant material that turns into soil in compost." } },
      { id: "salad", emoji: "🥗", name: "Uneaten salad", desc: "It sat on your tray.", extra: true,
        scores: { compost: 3, trash: 1 }, unsafe: ["share"],
        why: { compost: "Food that sat on a tray should not be shared, but it can be composted.", share: "Food that was on your tray should not be shared." } },
      { id: "rice", emoji: "🍚", name: "Leftover rice", desc: "Scooped onto your tray but not eaten.", extra: true,
        scores: { compost: 3, trash: 1 }, unsafe: ["share"],
        why: { compost: "It was on your tray, so it cannot be shared. Composting turns it into soil.", share: "Food that sat on your tray should not be shared." } },
      { id: "roll", emoji: "🥖", name: "Bitten bread roll", desc: "One bite taken.", extra: true,
        scores: { compost: 3, trash: 1 }, unsafe: ["share"],
        why: { compost: "Bitten food cannot be shared, but it can be composted.", share: "Food that has been bitten should never be shared." } }
    ],
    fact: "A share table lets students leave unopened or untouched food for others instead of throwing it out. Each school has its own rules. (Reviewer: please confirm wording.)"
  },
  {
    id: "garden", emoji: "🌳", title: "Level 3: The Garden Loop", type: "loop",
    blurb: "Answer questions to close the food loop.",
    intro: "Compost is where the food loop closes. Answer each question to light up the next step in the loop.",
    nodes: [
      { e: "🍎", t: "Food scraps" }, { e: "🪱", t: "Compost bin" }, { e: "🟤", t: "Rich soil" },
      { e: "🌱", t: "Garden" }, { e: "🥕", t: "Fresh food" }
    ],
    steps: [
      { q: "Food scraps go into a compost bin. Tiny living things like microbes and worms start to eat them. What do they turn the scraps into?", c: ["Rich soil", "Plastic", "Clean water"], a: 0, light: [1, 2], fact: "Composting is a natural process. Microbes and worms break food and plant scraps down into a dark, crumbly material that is good for soil." },
      { q: "The new soil is full of nutrients. Where would you use it?", c: ["On the roof", "In garden beds", "In the trash"], a: 1, light: [3], fact: "Finished compost is spread on garden beds and fields to help plants grow." },
      { q: "Plants grow in healthy soil. What else do they need?", c: ["Sunlight and water", "Only sugar", "Nothing at all"], a: 0, light: [], fact: "Plants need sunlight, water and nutrients from the soil." },
      { q: "The garden grows vegetables. Who can eat them?", c: ["Nobody", "People and animals", "Only machines"], a: 1, light: [4], fact: "Food from the garden goes back to kitchens and tables." },
      { q: "Cooking and eating makes new scraps, like peels. What should you do with them?", c: ["Compost them", "Throw them in a river", "Bury plastic with them"], a: 0, light: ["close"], fact: "Compost the scraps and the loop starts again." },
      { q: "Why do we call this a loop?", c: ["It has no corners", "It never changes", "The end of one step is the start of the next"], a: 2, light: [], fact: "In a circular food system, the leftovers from one step become the ingredients for the next." }
    ],
    fact: "Food that goes to a landfill rots without air and makes methane, a gas that warms the planet. Composting keeps nutrients in the loop. (Reviewer: please confirm wording.)"
  },
  {
    id: "peanut", emoji: "🥜", title: "Bonus: Peanut Farm", type: "sort", bonus: true,
    blurb: "Dry, test and sort a peanut harvest so nothing is wasted.",
    intro: "Harvest is in! Peanuts must be dried quickly. Some molds that grow on damp peanuts make a poison called aflatoxin, and you cannot see or smell it. How will you dry and test them?",
    bins: ["eat", "feed", "make", "compost", "trash"],
    binLabels: {
      eat: { name: "Sell and eat", sub: "Safe, dry kernels" },
      make: { name: "Oil, fuel, products", sub: "Make something" },
      trash: { name: "Safe disposal", sub: "Keep out of food" }
    },
    prestep: {
      q: "How will you dry and check your peanuts?",
      options: [
        { label: "Dry on the ground in the open air", desc: "Free, but rain can leave peanuts damp. No test.", extras: ["unk1", "unk2", "unk3"], note: "Without drying control or a test, you had to treat damp-pile peanuts as unknown. Some may have been fine, but you could not tell." },
        { label: "Open-air drying plus a mold test", desc: "Free drying, and a test strip checks the damp peanuts.", extras: ["safe1", "safe2", "mold1"], note: "The test let you save two lots of peanuts and safely remove the dangerous one." },
        { label: "Solar dryer with sensors, plus a mold test", desc: "A cleaner, faster dryer that follows temperature and humidity.", extras: ["safe3"], prevent: true, note: "Fast, controlled drying left almost no damaged peanuts. Preventing waste beats fixing it." }
      ]
    },
    items: [
      { id: "kernels", emoji: "🥜", name: "Dry, healthy peanuts", desc: "Tested and ready.",
        scores: { eat: 3, make: 1 },
        why: { eat: "Safe, dry peanuts are the main product. Food for people comes first.", make: "You could press them for oil, but selling them as food is better." } },
      { id: "shells", emoji: "🐚", name: "Peanut shells", desc: "A big pile after shelling.",
        scores: { make: 3, compost: 2 },
        why: { make: "Shells can be pressed into fuel blocks called briquettes, or used in other products.", compost: "Shells can be composted, but fuel is a higher use.", trash: "Shells have many uses. Do not waste them!" } },
      { id: "vines", emoji: "🌿", name: "Peanut vines (haulms)", desc: "The green plants left in the field.",
        scores: { feed: 3, compost: 2 },
        why: { feed: "Dry, mold-free peanut vines can be fodder for livestock.", compost: "Compost is good, but animal fodder uses the vines first.", trash: "Vines are valuable. Do not waste them!" } },
      { id: "skins", emoji: "🍂", name: "Peanut skins", desc: "The thin brown covering of the kernel.",
        scores: { feed: 2, compost: 2 },
        why: { feed: "Clean skins can go into animal feed.", compost: "Skins are plant material and can be composted.", trash: "Skins can be used or composted." } },
      { id: "unk1", emoji: "❓", name: "Peanuts from the damp pile", desc: "No test. You cannot tell if they are safe.", extra: true,
        scores: { trash: 3, compost: 1 }, unsafe: ["eat", "feed", "make"],
        why: { trash: "When you cannot test, play it safe. A test would have saved some of these peanuts.", eat: "Never use untested damp peanuts for food.", feed: "Untested damp peanuts are not safe for animals.", make: "Do not use them for oil or products." } },
      { id: "unk2", emoji: "❓", name: "More peanuts from the damp pile", desc: "Still no test.", extra: true,
        scores: { trash: 3, compost: 1 }, unsafe: ["eat", "feed", "make"],
        why: { trash: "No test, no way to know. Safe disposal protects people.", eat: "Never use untested damp peanuts for food.", feed: "Untested damp peanuts are not safe for animals.", make: "Do not use them for oil or products." } },
      { id: "unk3", emoji: "❓", name: "Peanuts from the wet corner", desc: "Rained on. No test.", extra: true,
        scores: { trash: 3, compost: 1 }, unsafe: ["eat", "feed", "make"],
        why: { trash: "A test would have shown which are safe. Without one, disposal is safest.", eat: "Never use untested damp peanuts for food.", feed: "Untested damp peanuts are not safe for animals.", make: "Do not use them for oil or products." } },
      { id: "safe1", emoji: "🥜", name: "Damaged peanuts: test says safe", desc: "Broken kernels, but they passed the test.", extra: true,
        scores: { make: 3, feed: 2, eat: 1 },
        why: { make: "Broken but safe kernels can be pressed for oil.", feed: "Safe damaged kernels can be fed to animals. Oil is a slightly better use.", eat: "They are safe, but broken kernels sell for less. Oil is better.", trash: "They passed the test, so they should not be wasted." } },
      { id: "safe2", emoji: "🥜", name: "Damaged peanuts: test says safe", desc: "Also passed the test.", extra: true,
        scores: { make: 3, feed: 2, eat: 1 },
        why: { make: "Broken but safe kernels can be pressed for oil.", feed: "Safe damaged kernels can be fed to animals. Oil is a slightly better use.", eat: "They are safe, but broken kernels sell for less. Oil is better.", trash: "They passed the test, so they should not be wasted." } },
      { id: "safe3", emoji: "🥜", name: "Damaged peanuts: test says safe", desc: "Only a few, thanks to fast drying.", extra: true,
        scores: { make: 3, feed: 2, eat: 1 },
        why: { make: "Broken but safe kernels can be pressed for oil.", feed: "Safe damaged kernels can be fed to animals. Oil is a slightly better use.", eat: "They are safe, but broken kernels sell for less. Oil is better.", trash: "They passed the test, so they should not be wasted." } },
      { id: "mold1", emoji: "⚠️", name: "Peanuts: test shows mold toxin", desc: "Aflatoxin detected.", extra: true,
        scores: { trash: 3 }, unsafe: ["eat", "feed", "make"],
        why: { trash: "These must stay out of food and feed. Follow local rules for safe disposal.", eat: "Never eat peanuts with aflatoxin.", feed: "These are dangerous for animals too.", make: "Do not press them for oil or use them in products.", compost: "Do not compost them. Keep them out of the food chain." } }
    ],
    fact: "Some molds that grow on damp peanuts make aflatoxin, a poison you cannot see or smell. Drying quickly and testing helps keep food safe and reduces waste. Shells can be used as fuel and vines as livestock fodder. (Reviewer: please confirm wording.)"
  }
  ]
};
