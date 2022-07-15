type Item = {
  weight: number;
  value: number;
};
export function maximumValue({
  maximumWeight,
  items,
}: {
  maximumWeight: number;
  items: Item[];
}): number {
  if (items.length == 0) return 0;
  let maximumItem: Item = { weight: 0, value: 0 };
  let subsets: [Item[]] = [[]];
  for (const el of items) {
    const last = subsets.length - 1;
    for (let i = 0; i <= last; i++) {
      let obj: Item = { weight: 0, value: 0 };

      [...subsets[i], el].forEach((f) => {
        obj.value += f.value;
        obj.weight += f.weight;
      });
      subsets.push([...subsets[i], el]);
      if (obj.weight <= maximumWeight && obj.value > maximumItem.value) {
        maximumItem.weight = obj.weight;
        maximumItem.value = obj.value;
      }
    }
  }
  return maximumItem.value;
}
