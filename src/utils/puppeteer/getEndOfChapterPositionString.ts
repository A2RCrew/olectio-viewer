/**
 * Get the position of the end of chapter div marker
 * @returns {string} containing the x and the y position separated by a '-'
 */
const getEndOfChapterPositionString = (): string => {
  const rect = document?.querySelector('.olectio-end-of-chapter-calculator')?.getBoundingClientRect();
  if (rect) {
    return `${rect?.x}-${rect?.y}`;
  }
  return '';
};

export default getEndOfChapterPositionString;
