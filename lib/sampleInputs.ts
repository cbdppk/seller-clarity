export type SampleInput = {
  id: string;
  label: string;
  text: string;
};

export const sampleInputs: SampleInput[] = [
  {
    id: "provision-shop",
    label: "Provision shop",
    text: `Mon sold 2 crates Malta 95
3 sachet water packs 18 each
1 customer took bread on credit no amount yet`,
  },
  {
    id: "market-stall",
    label: "Market stall",
    text: `Tuesday shop sales
Indomie box 85
Eggs 2 crates 70 each
delivery to Adenta 15
one soap sold but price not clear`,
  },
  {
    id: "food-seller",
    label: "Food seller",
    text: `Wed market
Tilapia 3 for GH¢120
Pepper 40
Momo order GHS 25
rice sold to Ama amount forgotten`,
  },
];
