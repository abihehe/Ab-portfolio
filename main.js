/*show sidebar*/
const navMenu = document.getElementById('sidebar'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*show show sidebar*/
if(navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-sidebar')
    })
}

/*hidden sidebar*/
if(navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar')
    })
}

/*attain modal*/
const modalViews = document.querySelectorAll('.attain__modal'),
      modelBtns = document.querySelectorAll('.attain__button'),
      modalCloses = document.querySelectorAll('.attain__modal-close') 

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modelBtns.forEach((modelBtn,i) => {
    modelBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*skills tabs*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContent = document.querySelectorAll('[data-content]')

      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
           const target = document.querySelector(tab.dataset.target)

            tabContent.forEach(tabContents => {
                tabContents.classList.remove('skills__active')
            })

            target.classList.add('skills__active')

            tabs.forEach(tab => {
                tab.classList.remove('skills__active')
            })

            tab.classList.add('skills__active')
        })
    })


/*mixitup filters arts*/
 let mixerArts = mixitup('.arts__container', {
    selectors: {
         target: '.arts__card'
    },
    animation: {
        duration: 300
     }
 });

/*mixitup filters arts*/
const linkArts = document.querySelectorAll('.arts__item')

function activeArts() {
    linkArts.forEach(l=> l.classList.remove('active-arts'))
    this.classList.add('active-arts')
}
 
linkArts.forEach(l=> l.addEventListener("click", activeArts))

/* arts popup*/
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("arts__button")) {
        toggleArtsPopup();
        artsItemDetails(e.target.parentElement);
    } 
})

function toggleArtsPopup() {
    document.querySelector(".arts__popup").classList.toggle("open");
}

document.querySelector(".arts__popup-close").addEventListener("click", toggleArtsPopup)

function artsItemDetails(artsItem) {
    document.querySelector(".pp__thumbnail img").src = artsItem.querySelector(".arts__img").src;
    document.querySelector(".arts__popup-subtitle span").innerHTML = artsItem.querySelector(".arts__title").innerHTML;
    document.querySelector(".arts__popup-body").innerHTML = artsItem.querySelector(".arts__item-details").innerHTML;
}

/* input animation*/
const inputs = document.querySelectorAll('.input');

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if(this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
})


/*scroll section active link*/

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter()
 {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 500;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav__menu a[href*='${sectionId}']`).classList.add("active-link");
        } else {
            document.querySelector(`.nav__menu a[href*='${sectionId}']`).classList.remove("active-link");
        }
    });
}

/*contact form*/ 

const scriptURL = 'https://script.google.com/macros/s/AKfycbwj3DniJGJ25LnsrJiS4zOsZd-Gw5Q_UfukPFOF-WO6xWn-oUtjaTu2Jo2sNpYNgOjp/exec';
const form = document.forms['submit-to-google-shee'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form)
    })
    .then(response => {
        if (response.ok) {
            msg.innerHTML = "Message sent successfully";
            setTimeout(function(){
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .catch(error => {
        console.error('Error!', error);
        msg.innerHTML = "Error occurred while sending the message";
    });
});
