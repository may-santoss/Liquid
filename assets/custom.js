class FavSwatch extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('click', this.onClick.bind(this))
    }
  
    onClick() {
        let self = this

        let cardType = self.closest('product-card').querySelector('product-figure') ? 'product-card-slider' : 'product-card'
        let url = this.dataset.href
        url += url.indexOf('?') !== -1 ? '&': '?'

        fetch(`${url}section_id=${cardType}`)
        .then((response) => response.text())
        .then((responseText) => {
            self.classList.add('is-selected')
            const html = new DOMParser().parseFromString(responseText, 'text/html')
            const cardNew = html.querySelector('product-card')
            let cardOld = self.closest('product-card')
            cardOld.querySelectorAll('fav-swatch').forEach((favSwatch)=>{
                if(favSwatch != self) {
                    favSwatch.classList.remove('is-selected')
                }
            })

            cardOld.querySelector('.product-title').innerHTML = cardNew.querySelector('.product-title').innerHTML;
            cardOld.querySelector('.price-list').innerHTML = cardNew.querySelector('.price-list').innerHTML;
            if (cardOld.querySelector('.badge-list') != null && cardNew.querySelector('.badge-list') != null) {
                cardOld.querySelector('.badge-list').innerHTML = cardNew.querySelector('.badge-list').innerHTML;
            } else if (cardOld.querySelector('.badge-list') != null && cardNew.querySelector('.badge-list') == null) {
                cardOld.querySelector('.badge-list').innerHTML = '';
            }
            cardOld.querySelector('.product-title').setAttribute('href', cardNew.querySelector('.product-title').getAttribute('href'))
            if(cardOld.querySelector('.product-card__media')) {
                cardOld.querySelector('.product-card__media').setAttribute('href', cardNew.querySelector('.product-card__media').getAttribute('href'))
            }
            if(cardOld.querySelector('product-figure')) {
                cardOld.querySelector('product-figure').setAttribute('data-url', cardNew.querySelector('product-figure').getAttribute('data-url'))
            }
            if(cardOld.querySelector('product-figure .product-card__images:nth-child(1)') && cardNew.querySelector('product-figure .product-card__images:nth-child(1)')) {
                cardOld.querySelector('.product-card__images:nth-child(1) img').setAttribute('src', cardNew.querySelector('.product-card__images:nth-child(1) img').getAttribute('src'))
                cardOld.querySelector('.product-card__images:nth-child(1) img').setAttribute('srcset', cardNew.querySelector('.product-card__images:nth-child(1) img').getAttribute('srcset'))
            }
            if(cardOld.querySelector('product-figure .product-card__images:nth-child(2)') && cardNew.querySelector('product-figure .product-card__images:nth-child(2)')) {
                cardOld.querySelector('.product-card__images:nth-child(2) img').setAttribute('src', cardNew.querySelector('.product-card__images:nth-child(2) img').getAttribute('src'))
                cardOld.querySelector('.product-card__images:nth-child(2) img').setAttribute('srcset', cardNew.querySelector('.product-card__images:nth-child(2) img').getAttribute('srcset'))
            }
            if(cardOld.querySelector('product-figure .product-card__images:nth-child(3)') && cardNew.querySelector('product-figure .product-card__images:nth-child(3)')) {
                cardOld.querySelector('.product-card__images:nth-child(3) img').setAttribute('src', cardNew.querySelector('.product-card__images:nth-child(3) img').getAttribute('src'))
                cardOld.querySelector('.product-card__images:nth-child(3) img').setAttribute('srcset', cardNew.querySelector('.product-card__images:nth-child(3) img').getAttribute('srcset'))
            }
            if(cardOld.querySelector('.product-card__figure .product-card__image--primary') && cardNew.querySelector('.product-card__figure .product-card__image--primary')) {
                cardOld.querySelector('.product-card__figure .product-card__image--primary').setAttribute('src', cardNew.querySelector('.product-card__figure .product-card__image--primary').getAttribute('src'))
                cardOld.querySelector('.product-card__figure .product-card__image--primary').setAttribute('srcset', cardNew.querySelector('.product-card__figure .product-card__image--primary').getAttribute('srcset'))
            }
            if(cardOld.querySelector('.product-card__figure .product-card__image--secondary') && cardNew.querySelector('.product-card__figure .product-card__image--secondary')) {
                cardOld.querySelector('.product-card__figure .product-card__image--secondary').setAttribute('src', cardNew.querySelector('.product-card__figure .product-card__image--secondary').getAttribute('src'))
                cardOld.querySelector('.product-card__figure .product-card__image--secondary').setAttribute('srcset', cardNew.querySelector('.product-card__figure .product-card__image--secondary').getAttribute('srcset'))
            }
        })
    }
  
  }
  
  customElements.define('fav-swatch', FavSwatch);