class productFigure extends HTMLElement {
  constructor() {
    super();
    this.buttons = this.querySelectorAll("carousel-navigation .tap-area");
    this.carousel = this.querySelector("scroll-carousel");
    this.images = this.querySelectorAll("img");
    this.startX = 0;
    this.endX = 0;
    this.drag = false;
    this.emptyDragImg = this.querySelector('.empty-image')
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.addEventListener("dragover", function(e) {
      e.preventDefault();
    });

    this.addEventListener("drag", function(e) {
      e.preventDefault();
    });

    this.addEventListener("dragstart", (e) => {
      this.drag = true;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setDragImage(this.emptyDragImg, 0, 0);
      this.startX = e.clientX;
    });

    this.addEventListener("dragend", (e) => {
      this.drag = true;
      e.dataTransfer.effectAllowed = 'move'
      this.endX = e.clientX;
      if (this.startX > this.endX) {
        this.slideRight()
      } else if (this.startX < this.endX) {
        this.slideLeft()
      } 
    });

    this.carousel.addEventListener('click', function(){
      if (!this.drag){
        window.location.href = this.closest('[data-url]').getAttribute('data-url')
      }
    })
  }

  slideLeft(){
    this.carousel.previous()
    this.drag = false;
  }

  slideRight(){
    this.carousel.next()
    this.drag = false;
  }

}

customElements.define('product-figure', productFigure);