export function convertStatus(status) {
  // 0 : on-going, 1 : assigned, 2: recieved, 3: delivered, 4 : complete, 5: canceled
  switch (status) {
    case 0:
      return "on-going";
    case 1:
      return "assigned";
    case 2:
      return "recieved";
    case 3:
      return "delivered";
    case 4:
      return "complete";
    case 5:
      return "canceled";
    default:
      return "unknown";
  }
}

export function convertFuel(fuel_type) {
  switch (fuel_type) {
    case 0:
      return "91";
    case 1:
      return "95";
    case 2:
      return "D";
    default:
      return "unknown";
  }
}
