import { useEffect } from "react";

const StarField = () => {
  useEffect(() => {
    const starsCount = 35;
    const starsContainer = document.querySelector('.stars');

    if (starsContainer) {
      for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        starsContainer.appendChild(star);
      }
    }
  }, []);

  return null;
}

export default StarField;
