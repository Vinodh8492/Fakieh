// utils/generateGradient.js
export const generateGradient = (baseColor, count = 6) => {
  const shades = [];
  for (let i = 0; i < count; i++) {
    const alpha = 1 - (i / count) * 0.7; // fade
    shades.push(`${baseColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
  }
  return shades;
};
