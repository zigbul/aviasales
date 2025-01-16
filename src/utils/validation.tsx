function isValidIATACode(code: string): boolean {
  return /^[A-Z]{3}$/.test(code.toUpperCase());
}

function isValidData(date: string): boolean {
  const today = new Date();
  const selectedDate = new Date(date);
  return !isNaN(selectedDate.getTime()) && selectedDate >= today;
}

export { isValidData, isValidIATACode };
