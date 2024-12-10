class productSwatches extends HTMLElement {
  constructor() {
    super();
    this.buttonLeft = this.querySelector(".prev-next-button--prev");
    this.buttonRight = this.querySelector(".prev-next-button--next");
    this.container = this.querySelector(".product-swatches--slider");
    this.totalwidthSlider = this.container.clientWidth;
    this.viewWidthSlider = this.container.scrollWidth - 5;
    this.swatch = this.querySelector('.product-swatches__container');
    this.swatchWidth = this.swatch.offsetWidth * 2;

    this.overflow = this.viewWidthSlider > this.totalwidthSlider;
    if (!this.overflow){
      this.buttonLeft.classList.add('invisible');
      this.buttonRight.classList.add('invisible');
    }

    this.setupEventListeners(this.container, this.buttonLeft, this.buttonRight, this.swatch, this.swatchWidth, this.overflow, this.totalwidthSlider, this.viewWidthSlider);
  }
  
  setupEventListeners(container, buttonLeft, buttonRight, swatch, swatchWidth, overflow, totalwidthSlider, viewWidthSlider) {    
    window.addEventListener("resize", (e) => {
      totalwidthSlider = container.clientWidth;
      viewWidthSlider = container.scrollWidth;
      overflow = viewWidthSlider > totalwidthSlider;
      swatchWidth = swatch.offsetWidth * 2;

      if (!overflow){
        buttonLeft.classList.add('invisible');
        buttonRight.classList.add('invisible');
      } else {
        buttonLeft.classList.remove('invisible');
        buttonRight.classList.remove('invisible');
      }
    });

    container.addEventListener('scroll', () => {
      var finalWidth = container.scrollWidth - container.clientWidth;

      if (Math.round(container.scrollLeft) > 0 && buttonLeft.hasAttribute('disabled')){
        buttonLeft.removeAttribute('disabled')
      }
      if (Math.round(container.scrollLeft) == 0){
        buttonLeft.setAttribute('disabled','disabled')
      }
      if (Math.round(container.scrollLeft) < finalWidth && buttonRight.hasAttribute('disabled')){
        buttonRight.removeAttribute('disabled')
      }
      if (Math.round(container.scrollLeft) >= finalWidth){
        buttonRight.setAttribute('disabled','disabled')
      }
    })


    this.buttonRight.addEventListener("click", function(e) {
      e.preventDefault()
      var oldScroll = container.scrollLeft;
      container.scrollLeft += swatchWidth;
      var newScroll = container.scrollLeft;
      if (buttonLeft.hasAttribute('disabled')){
        buttonLeft.removeAttribute('disabled')
      }
      if (oldScroll == newScroll) {
        buttonRight.setAttribute('disabled', 'disabled');
      }
    });

    this.buttonLeft.addEventListener("click", function(e) {
      e.preventDefault()
      container.scrollLeft -= swatchWidth;
      if (buttonRight.hasAttribute('disabled')){
        buttonRight.removeAttribute('disabled')
      }
      if (container.scrollLeft == 0) {
        buttonLeft.setAttribute('disabled', 'disabled');
      }
    });

    if (container.scrollLeft == 0) {
      this.buttonLeft.setAttribute('disabled', 'disabled');
    }
  }
}

customElements.define('product-swatches', productSwatches);