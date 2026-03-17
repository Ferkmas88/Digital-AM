const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const resetFlowState = (element) => {
  element.style.setProperty("--flow-opacity", "0");
  element.style.setProperty("--flow-rotate-x", "0deg");
  element.style.setProperty("--flow-rotate-y", "0deg");
};

export function getFlowInteractionProps(options = {}) {
  const { tilt = 0 } = options;

  return {
    onMouseEnter(event) {
      event.currentTarget.style.setProperty("--flow-opacity", "1");
    },
    onMouseMove(event) {
      const element = event.currentTarget;
      const bounds = element.getBoundingClientRect();
      const percentX = ((event.clientX - bounds.left) / bounds.width) * 100;
      const percentY = ((event.clientY - bounds.top) / bounds.height) * 100;

      element.style.setProperty("--flow-x", `${clamp(percentX, 0, 100)}%`);
      element.style.setProperty("--flow-y", `${clamp(percentY, 0, 100)}%`);
      element.style.setProperty("--flow-opacity", "1");

      if (tilt > 0) {
        const rotateY = ((percentX / 100) * 2 - 1) * tilt;
        const rotateX = (((percentY / 100) * 2 - 1) * -1) * tilt;

        element.style.setProperty("--flow-rotate-x", `${rotateX.toFixed(2)}deg`);
        element.style.setProperty("--flow-rotate-y", `${rotateY.toFixed(2)}deg`);
      }
    },
    onMouseLeave(event) {
      resetFlowState(event.currentTarget);
    },
  };
}
