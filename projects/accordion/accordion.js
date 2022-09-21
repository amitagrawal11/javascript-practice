window.addEventListener("DOMContentLoaded", function (e) {
    const accordionItems = document.getElementsByClassName('accordion__item');

    Array.from(accordionItems).forEach(accordionItem => {
        const accordionBtn = accordionItem.querySelector("button");

        accordionBtn.addEventListener('click', function (e) {
            const hasActiveClass = this.parentElement.classList.contains('accordion__item--active');
            if (hasActiveClass) {
                this.parentElement.classList.remove('accordion__item--active');
            } else {
                this.parentElement.classList.add('accordion__item--active');
            }
        });
    });
});
