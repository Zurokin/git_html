/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
/* eslint-disable max-len */
// popover.js

function initPopover() {
  const button = document.getElementById("popoverButton");
  const popover = document.getElementById("popover");
  const popoverHeader = popover.querySelector(".popover-header");
  const popoverBody = popover.querySelector(".popover-body");

  if (!button || !popover || !popoverHeader || !popoverBody) {
    console.error("Button or popover elements not found!");
    return;
  }

  popover.style.position = "absolute";
  popover.style.display = "none";

  // Получаем контент из атрибутов data-* кнопки
  const popoverContent = button.getAttribute("data-content");
  const popoverTitle = button.getAttribute("data-title") || "Popover Header";

  // Устанавливаем заголовок и тело поповера
  popoverHeader.textContent = popoverTitle;
  popoverBody.textContent = popoverContent;

  // Функция для позиционирования поповера
  function positionPopover() {
    const buttonRect = button.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    // Центрируем поповер по кнопке по горизонтали
    let popoverLeft =
      buttonRect.left + (buttonRect.width - popoverRect.width) / 2;

    // Отображаем поповер сверху от кнопки (с учетом отступа)
    let popoverTop = buttonRect.top - popoverRect.height - 10; // 10px — отступ сверху

    console.log("Popover position calculated:", popoverLeft, popoverTop);

    // Проверяем, если поповер выходит за верхнюю границу окна
    const windowHeight = window.innerHeight;

    if (popoverTop < 0) {
      console.warn("Not enough space above, showing below.");
      popoverTop = buttonRect.bottom + 10; // Ставим поповер ниже кнопки
    }

    // Проверка на выход за пределы экрана по горизонтали
    const windowWidth = window.innerWidth;
    if (popoverLeft < 0) {
      console.warn("Popover is off-screen to the left.");
      popoverLeft = 0; // Корректируем, чтобы поповер не выходил за левый край
    } else if (popoverLeft + popoverRect.width > windowWidth) {
      console.warn("Popover is off-screen to the right.");
      popoverLeft = windowWidth - popoverRect.width; // Корректируем, чтобы поповер не выходил за правый край
    }

    // Устанавливаем окончательную позицию поповера
    popover.style.left = `${popoverLeft}px`;
    popover.style.top = `${popoverTop}px`;
  }

  // Показ поповера
  button.addEventListener("click", () => {
    console.log("Popover button clicked.");
    popover.style.display = "block";
    positionPopover();
  });

  // Скрытие поповера при клике вне его
  document.addEventListener("click", (event) => {
    if (!popover.contains(event.target) && event.target !== button) {
      console.log("Click outside detected. Hiding popover.");
      popover.style.display = "none";
    }
  });
}

// Экспортируем функцию как default
export default initPopover;
