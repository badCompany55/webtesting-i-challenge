module.exports = {
  succeed,
  fail,
  repair,
  get
};

function succeed(item) {
  return { ...item, enhancement: item.enhancement + 1 };
}

function fail(item) {
  const { enhancement, durability } = item;
  // if (enhancement < 15) {
  //   return {
  //     ...item,
  //     durability: item.durability - 5
  //   };
  // } else if (enhancement === 15) {
  //   return {
  //     ...item,
  //     durability: item.durability - 10
  //   };
  // } else {
  //   return {
  //     ...item,
  //     durability: item.durability - 10,
  //     enhancement: item.enhancement - 1
  //   };
  // }
  switch (true) {
    case enhancement < 15:
      if (durability > 4) {
        return {
          ...item,
          durability: item.durability - 5
        };
      } else {
        return {
          ...item,
          durability: item.durability - item.durability
        };
      }

    case enhancement === 15:
      if (durability > 9) {
        return {
          ...item,
          durability: item.durability - 10
        };
      } else {
        return {
          ...item,
          durability: item.durability - item.durability
        };
      }
    case enhancement > 15:
      if (durability > 9) {
        return {
          ...item,
          durability: item.durability - 10,
          enhancement: item.enhancement - 1
        };
      } else {
        return {
          ...item,
          durability: item.durability - item.durability,
          enhancement: item.enhancement - 1
        };
      }
  }
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
