class drawerMenu extends HTMLElement {
  constructor() {
    super();
    this.button = document.querySelector("[aria-controls='drawer-menu']");
    this.iconHamburguer = this.button.querySelector('.icon-hamburger');
    this.iconClose = this.button.querySelector('.icon-close');

    this.searchButton = document.querySelector('.header__search-icon');
    this.overlay = document.querySelector(".overlay");

    this.accordions = this.querySelectorAll('details');

    this.accordions.forEach(accordion => {
      const iconPlus = accordion.querySelector('.icon-plus');
      const iconMinus = accordion.querySelector('.icon-minus');

      if (accordion.hasAttribute('open')) {
        iconPlus.style.display = 'none';
        iconMinus.style.display = 'inline';
      } else {
        iconPlus.style.display = 'inline';
        iconMinus.style.display = 'none';
      }

      accordion.addEventListener("toggle", this.toggleAccordion.bind(this));
    });

    this.button.addEventListener("click", this.toggle.bind(this));
    this.searchButton.addEventListener("click", this.close.bind(this));
    this.overlay.addEventListener("click", this.close.bind(this));
  }

  toggle() {
    this.classList.toggle("drawer-hidden");
    this.iconHamburguer.classList.toggle("hidden");
    this.iconClose.classList.toggle("hidden");    
    document.body.classList.toggle("overflow-hidden");
    this.overlay.classList.toggle("hidden");
  }

  close() {
    this.classList.add("drawer-hidden");
    this.overlay.classList.add("hidden");
    this.iconHamburguer.classList.remove("hidden");
    this.iconClose.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  toggleAccordion(event) {
    const accordion = event.currentTarget;
    event.stopPropagation();

    const iconPlus = accordion.querySelector('.icon-plus');
    const iconMinus = accordion.querySelector('.icon-minus');

    if (accordion.open) {
      iconPlus.style.display = 'none';
      iconMinus.style.display = 'inline';
    } else {
      iconPlus.style.display = 'inline';
      iconMinus.style.display = 'none';
    }
  }
}

customElements.define("drawer-menu", drawerMenu);
